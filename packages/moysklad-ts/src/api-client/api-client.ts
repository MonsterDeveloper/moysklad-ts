import { version } from "../../package.json";
import { btoa } from "js-base64";
import { handleError } from "./handle-error";
import type {
  ListResponse,
  Entity,
  BatchGetResult,
  BatchGetOptions,
} from "@/types";
import { batchPromises } from "@/utils";

export type BasicAuth = {
  login: string;
  password: string;
};

export type TokenAuth = {
  // Auth token
  token: string;
};

export type Auth = BasicAuth | TokenAuth;

/**
 * ApiClient initialization options
 *
 * @see https://moysklad-ts.vercel.app/reference/initialization/
 */
export type ApiClientOptions = {
  /** Moysklad API base url */
  baseUrl?: string;
  /** User-Agent header */
  userAgent?: string;
  /** Auth options */
  auth: Auth;
  /** Batch get options */
  batchGetOptions?: BatchGetOptions;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: object;
  searchParameters?: URLSearchParams;
};
type RequestOptionsWithoutMethod = Omit<RequestOptions, "method">;

export class ApiClient {
  private baseUrl: string;
  private userAgent: string;
  private auth: Auth;
  private batchGetOptions: Required<BatchGetOptions>;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl ?? "https://api.moysklad.ru/api/remap/1.2";
    this.userAgent =
      options.userAgent ??
      `moysklad-ts/${version} (+https://github.com/MonsterDeveloper/moysklad-ts)`;

    this.auth = options.auth;
    this.batchGetOptions = {
      limit: 1000,
      expandLimit: 100,
      concurrencyLimit: 3,
      ...options.batchGetOptions,
    };
  }

  async request(
    endpoint: string,
    { searchParameters, ...options }: RequestOptions = {},
  ) {
    const url = this.buildUrl(endpoint);

    const response = await fetch(
      url +
        (searchParameters && searchParameters.size > 0
          ? `?${searchParameters}`
          : ""),
      {
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
        headers: {
          ...options.headers,
          Authorization:
            "token" in this.auth
              ? `Bearer ${this.auth.token}`
              : "Basic " + btoa(`${this.auth.login}:${this.auth.password}`),
          "User-Agent": this.userAgent,
          "Content-Type": "application/json",
          Accept: "application/json;charset=utf-8",
          "Accept-Encoding": "gzip",
        },
      },
    );

    if (!response.ok) await handleError(response);

    return response;
  }

  async get(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  async post(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "POST" });
  }

  async put(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "PUT" });
  }

  async delete(url: string, options: RequestOptionsWithoutMethod = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }

  private normalizeUrl(url: string): string {
    return url.replaceAll(/\/{2,}/g, "/");
  }

  private buildStringUrl(url: string): URL {
    const shouldIncludeBaseUrl = !url.startsWith("http");

    const returnUrl = shouldIncludeBaseUrl ? `${this.baseUrl}/${url}` : url;

    return new URL(this.normalizeUrl(returnUrl));
  }

  private buildArrayUrl(url: string[]): URL {
    const shouldIncludeBaseUrl = !url[0]?.startsWith("http");

    const returnUrl = shouldIncludeBaseUrl
      ? `${this.baseUrl}/${url.join("/")}`
      : url.join("/");

    return new URL(this.normalizeUrl(returnUrl));
  }

  buildUrl(url: string | string[]): URL {
    if (typeof url === "string") return this.buildStringUrl(url);

    return this.buildArrayUrl(url);
  }

  async batchGet<T, E extends Entity>(
    fetcher: (limit: number, offset: number) => Promise<ListResponse<T, E>>,
    hasExpand?: boolean,
  ): Promise<BatchGetResult<T, E>> {
    const rows: T[] = [];
    const limit = hasExpand
      ? this.batchGetOptions.expandLimit
      : this.batchGetOptions.limit;

    const data = await fetcher(limit, 0);
    const size = data.meta.size;
    const context = data.context;

    rows.push(...data.rows);

    const tasks: (() => Promise<unknown>)[] = [];
    for (let offset = limit; offset < size; offset += limit) {
      tasks.push(() => fetcher(limit, offset).then(({ rows }) => rows));
    }

    const generator = batchPromises(
      tasks,
      this.batchGetOptions.concurrencyLimit,
    );

    for await (const promisesValues of generator) {
      rows.push(...(promisesValues.flat() as T[]));
    }

    return {
      context,
      rows,
    };
  }
}

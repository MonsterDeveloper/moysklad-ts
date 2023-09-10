import { version } from "../../package.json";
import { btoa } from "js-base64";

export type MoyskladBasicAuth = {
  login: string;
  password: string;
};

export type MoyskladTokenAuth = {
  token: string;
};

export type MoyskladAuth = MoyskladBasicAuth | MoyskladTokenAuth;

export type MoyskladApiClientOptions = {
  baseUrl?: string;
  userAgent?: string;
  auth: MoyskladAuth;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: object;
};

export class ApiClient {
  private baseUrl: string;
  private userAgent: string;
  private auth: MoyskladAuth;

  constructor(options: MoyskladApiClientOptions) {
    this.baseUrl =
      options.baseUrl ?? "https://online.moysklad.ru/api/remap/1.2";
    this.userAgent =
      options.userAgent ??
      `moysklad-ts/${version} (+https://github.com/MonsterDeveloper/moysklad-ts)`;

    this.auth = options.auth;
  }

  async request(url: string, options: RequestOptions = {}) {
    return fetch(url.startsWith("/") ? this.baseUrl + url : url, {
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
        Accept: "application/json",
      },
    });
  }
}

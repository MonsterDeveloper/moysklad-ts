import { version } from "../../package.json" with { type: "json" }
import type {
  BatchGetOptions,
  BatchGetResult,
  Entity,
  ListResponse,
} from "../types"
import { batchPromises } from "../utils"
import { handleError } from "./handle-error"

/**
 * Опции для Basic авторизации
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-autentifikaciq
 */
export type BasicAuth = {
  /** Логин */
  login: string
  /** Пароль */
  password: string
}

/**
 * Опции для авторизации по токену
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-autentifikaciq
 */
export type TokenAuth = {
  /** Токен */
  token: string
}

/**
 * Опции для авторизации
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-autentifikaciq
 */
export type Auth = BasicAuth | TokenAuth

/**
 * Опции для инициализации API клиента
 *
 * @see https://github.com/MonsterDeveloper/moysklad-ts?tab=readme-ov-file#%D0%BE%D0%BF%D1%86%D0%B8%D0%B8-%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8
 */
export type ApiClientOptions = {
  /**
   * Базовый URL
   *
   * @default https://api.moysklad.ru/api/remap/1.2
   */
  baseUrl?: string

  /**
   * User-Agent header
   *
   * @default `moysklad-ts/${version} (+https://github.com/MonsterDeveloper/moysklad-ts)`, где `{version}` - версия библиотеки
   */
  userAgent?: string
  /**
   * Опции авторизации
   *
   * {@linkcode Auth}
   */
  auth: Auth
  /**
   * Опции для получения всех сущностей из API (метод `.all()`).
   *
   * Устанавливает ограничения на размер запросов с expand и без него, а также ограничение на количество одновременных запросов.
   *
   * @default { limit: 1000, expandLimit: 100, concurrencyLimit: 3 }
   */
  batchGetOptions?: BatchGetOptions
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: object
  searchParameters?: URLSearchParams
}
type RequestOptionsWithoutMethod = Omit<RequestOptions, "method">

/** API клиент */
export class ApiClient {
  private baseUrl: string
  private userAgent: string
  private auth: Auth
  private batchGetOptions: Required<BatchGetOptions>

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl ?? "https://api.moysklad.ru/api/remap/1.2"
    this.userAgent =
      options.userAgent ??
      `moysklad-ts/${version} (+https://github.com/MonsterDeveloper/moysklad-ts)`

    this.auth = options.auth
    this.batchGetOptions = {
      limit: 1000,
      expandLimit: 100,
      concurrencyLimit: 3,
      ...options.batchGetOptions,
    }
  }

  /**
   * Сделать запрос к API МойСклад.
   *
   * @param endpoint - относительный путь до ресурса
   * @param options - опции запроса
   *
   * @example
   * ```ts
   * const response = await apiClient.request("/entity/counterparty", { method: "POST", body: { name: "ООО Ромашка" } });
   * ```
   */
  async request(
    endpoint: string,
    { searchParameters, ...options }: RequestOptions = {},
  ): Promise<Response> {
    const url = this.buildUrl(endpoint)

    const response = await fetch(
      url.toString() +
        (searchParameters && searchParameters.size > 0
          ? `?${searchParameters.toString()}`
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
    )

    if (!response.ok) {
      await handleError(response)
    }

    return response
  }

  /**
   * Shorthand для GET запроса.
   *
   * {@linkcode request}
   * */
  get(
    url: string,
    options: RequestOptionsWithoutMethod = {},
  ): Promise<Response> {
    return this.request(url, { ...options, method: "GET" })
  }

  /**
   * Shorthand для POST запроса.
   *
   * {@linkcode request}
   */
  post(
    url: string,
    options: RequestOptionsWithoutMethod = {},
  ): Promise<Response> {
    return this.request(url, { ...options, method: "POST" })
  }

  /**
   * Shorthand для PUT запроса.
   *
   * {@linkcode request}
   */
  put(
    url: string,
    options: RequestOptionsWithoutMethod = {},
  ): Promise<Response> {
    return this.request(url, { ...options, method: "PUT" })
  }

  /**
   * Shorthand для DELETE запроса.
   *
   * {@linkcode request}
   */
  delete(
    url: string,
    options: RequestOptionsWithoutMethod = {},
  ): Promise<Response> {
    return this.request(url, { ...options, method: "DELETE" })
  }

  /**
   * Нормализует URL, удаляя лишние слеши.
   *
   * @param url - URL
   *
   * @returns Нормализованный URL
   */
  private normalizeUrl(url: string): string {
    return url.replaceAll(/\/{2,}/g, "/")
  }

  /**
   * Строит объект типа `URL` из строки.
   *
   * @param url - URL
   *
   * @returns Объект типа `URL`
   */
  private buildStringUrl(url: string): URL {
    const shouldIncludeBaseUrl = !url.startsWith("http")

    const returnUrl = shouldIncludeBaseUrl ? `${this.baseUrl}/${url}` : url

    return new URL(this.normalizeUrl(returnUrl))
  }

  /**
   * Cтроит объект типа `URL` из массива строк.
   *
   * @param url - массив строк URL
   *
   * @returns Объект типа `URL`
   */
  private buildArrayUrl(url: string[]): URL {
    const shouldIncludeBaseUrl = !url[0]?.startsWith("http")

    const returnUrl = shouldIncludeBaseUrl
      ? `${this.baseUrl}/${url.join("/")}`
      : url.join("/")

    return new URL(this.normalizeUrl(returnUrl))
  }

  /**
   * Строит URL из строки или массива строк.
   *
   * @param url - строка или массив строк URL
   *
   * @returns Объект типа `URL` с нормализованным URL и базовым адресом, указанным в опциях инциализации
   *
   * @example С массивом строк
   * ```ts
   * buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"])
   * // "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/5427bc76-b95f-11eb-0a80-04bb000cd583"
   * ```
   *
   * @example Со строкой
   * ```ts
   * buildUrl("entity/counterparty/5427bc76-b95f-11eb-0a80-04bb000cd583")
   * // "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/5427bc76-b95f-11eb-0a80-04bb000cd583"
   * ```
   */
  buildUrl(url: string | string[]): URL {
    if (typeof url === "string") {
      return this.buildStringUrl(url)
    }

    return this.buildArrayUrl(url)
  }

  /**
   * Получить все сущности из API. Но лучше используйте метод `.all()` в эндпоинтах (например, `moysklad.counterparty.all()`).
   *
   * @param fetcher - функция, которая делает запрос к API и возвращает список сущностей
   * @param hasExpand - флаг, указывающий на наличие expand в запросе
   *
   * @returns Объект с массивом сущностей и контекстом
   */
  async batchGet<T, E extends Entity>(
    fetcher: (limit: number, offset: number) => Promise<ListResponse<T, E>>,
    hasExpand?: boolean,
  ): Promise<BatchGetResult<T, E>> {
    const rows: T[] = []
    const limit = hasExpand
      ? this.batchGetOptions.expandLimit
      : this.batchGetOptions.limit

    const data = await fetcher(limit, 0)
    const size = data.meta.size
    const context = data.context

    rows.push(...data.rows)

    const tasks: (() => Promise<unknown>)[] = []
    for (let offset = limit; offset < size; offset += limit) {
      tasks.push(() => fetcher(limit, offset).then(({ rows }) => rows))
    }

    const generator = batchPromises(
      tasks,
      this.batchGetOptions.concurrencyLimit,
    )

    for await (const promisesValues of generator) {
      rows.push(...(promisesValues.flat() as T[]))
    }

    return {
      context,
      rows,
    }
  }
}

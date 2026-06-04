import { afterEach, describe, expect, it, vi } from "vitest"
import { createFetchMock } from "../../test-utils"
import { MoyskladError } from "../errors"
import type { ListMetadata } from "../types"
import { ApiClient, type BasicAuth, type TokenAuth } from "./api-client"

const EXAMPLE_BASE_URL = "https://example.com/api"

describe("ApiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const userAgent = "test-user-agent"
  const basicAuth: BasicAuth = {
    login: "test-login",
    password: "test-password",
  }
  const tokenAuth: TokenAuth = {
    token: "test-token",
  }
  const body = { test: "test" }

  describe("request", () => {
    it("sends a request with default Moysklad base URL", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.request("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.url).toBe("https://api.moysklad.ru/api/remap/1.2/")
    })

    it("sends a request with a custom base URL", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({
        auth: tokenAuth,
        baseUrl: EXAMPLE_BASE_URL,
      })

      await client.request("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.url).toBe(`${EXAMPLE_BASE_URL}/`)
    })

    it("sends a request to a full URL", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.request(EXAMPLE_BASE_URL)

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.url).toBe(EXAMPLE_BASE_URL)
    })

    it("sends a request with basic auth", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: basicAuth })

      await client.request("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.headers.get("Authorization")).toBe(
        `Basic ${btoa(`${basicAuth.login}:${basicAuth.password}`)}`,
      )
    })

    it("sends a request with token auth", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.request("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.headers.get("Authorization")).toBe(
        `Bearer ${tokenAuth.token}`,
      )
    })

    it("sends a request with a custom user agent", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth, userAgent })

      await client.request("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.headers.get("User-Agent")).toBe(userAgent)
    })

    it("sends a request with a JSON body", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.request("/", { method: "POST", body })

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(await request.json()).toEqual(body)
    })

    it("throws an error if a response is not OK", async () => {
      const client = new ApiClient({
        auth: tokenAuth,
        baseUrl: "https://example.com",
      })

      await expect(client.request("/error")).rejects.toThrow(MoyskladError)
    })

    it("appends search parameters to the URL", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.request("/", {
        searchParameters: new URLSearchParams({ foo: "bar" }),
      })

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.url).toBe("https://api.moysklad.ru/api/remap/1.2/?foo=bar")
    })
  })

  describe("get", () => {
    it("sends a GET request", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.get("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.method).toBe("GET")
    })
  })

  describe("post", () => {
    it("sends a POST request", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.post("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.method).toBe("POST")
    })
  })

  describe("put", () => {
    it("sends a PUT request", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.put("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.method).toBe("PUT")
    })
  })

  describe("delete", () => {
    it("sends a DELETE request", async () => {
      const fetchMock = createFetchMock()
      const client = new ApiClient({ auth: tokenAuth })

      await client.delete("/")

      const request = fetchMock.mock.calls[0]?.[0] as Request
      expect(request.method).toBe("DELETE")
    })
  })

  describe("buildUrl", () => {
    it("builds a URL with a string relative path", () => {
      const client = new ApiClient({ auth: { token: "" } })

      const url = client.buildUrl("/foo")

      expect(url.toString()).toBe("https://api.moysklad.ru/api/remap/1.2/foo")
    })

    it("builds a URL with a string array relative path", () => {
      const client = new ApiClient({ auth: { token: "" } })

      const url = client.buildUrl(["/foo", "/bar"])

      expect(url.toString()).toBe(
        "https://api.moysklad.ru/api/remap/1.2/foo/bar",
      )
    })

    it("builds a URL with a string array absolute path", () => {
      const client = new ApiClient({ auth: { token: "" } })

      const url = client.buildUrl(["https://example.org", "foo", "bar"])

      expect(url.toString()).toBe("https://example.org/foo/bar")
    })

    it("builds a URL with a full URL", () => {
      const client = new ApiClient({ auth: { token: "" } })

      const url = client.buildUrl(`${EXAMPLE_BASE_URL}/foo`)

      expect(url.toString()).toBe(`${EXAMPLE_BASE_URL}/foo`)
    })

    it("normalizes a URL", () => {
      const client = new ApiClient({
        auth: { token: "" },
        baseUrl: EXAMPLE_BASE_URL,
      })

      const url = client.buildUrl(`/foo//bar/123`)

      expect(url.toString()).toBe(`${EXAMPLE_BASE_URL}/foo/bar/123`)
    })
  })

  describe("batchGet", () => {
    const bigData = [...Array.from({ length: 5555 }).keys()]
    const smallData = [...Array.from({ length: 5 }).keys()]
    const constructFetcher = (data: number[]) =>
      vi.fn(async (limit: number, offset: number) => ({
        rows: data.slice(offset, offset + limit),
        meta: { size: data.length } as unknown as ListMetadata<never>,
        context: {} as never,
      }))

    it("fetches all rows with default limit", async () => {
      const client = new ApiClient({ auth: { token: "" } })
      const fetcher = constructFetcher(bigData)

      const result = await client.batchGet(fetcher)
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 1000))
      expect(result.rows).toEqual(bigData)
    })

    it("fetches all rows with expand limit", async () => {
      const client = new ApiClient({ auth: { token: "" } })

      const fetcher = constructFetcher(bigData)

      const result = await client.batchGet(fetcher, true)
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 100))
      expect(result.rows).toEqual(bigData)
    })

    it("fetches all rows with custom limit", async () => {
      const client = new ApiClient({
        auth: { token: "" },
        batchGetOptions: { limit: 150 },
      })

      const fetcher = constructFetcher(bigData)

      const result = await client.batchGet(fetcher)
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 150))
      expect(result.rows).toEqual(bigData)
    })

    it("fetches all rows if row count is less than limit", async () => {
      const client = new ApiClient({ auth: { token: "" } })

      const fetcher = constructFetcher(smallData)

      const result = await client.batchGet(fetcher)
      expect(fetcher).toHaveBeenCalledTimes(1)
      expect(result.rows).toEqual(smallData)
    })

    it("returns empty rows if no data", async () => {
      const client = new ApiClient({ auth: { token: "" } })

      const fetcher = constructFetcher([])

      const result = await client.batchGet(fetcher)
      expect(fetcher).toHaveBeenCalledTimes(1)
      expect(result.rows).toEqual([])
    })
  })
})

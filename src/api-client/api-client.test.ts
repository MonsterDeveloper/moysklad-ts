import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient, type BasicAuth, type TokenAuth } from "./api-client";
import { btoa } from "js-base64";
import { MoyskladError } from "../errors";
import type { ListMetadata } from "../types";

const EXAMPLE_BASE_URL = "https://example.com/api";

describe("ApiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const userAgent = "test-user-agent";
  const basicAuth: BasicAuth = {
    login: "test-login",
    password: "test-password",
  };
  const tokenAuth: TokenAuth = {
    token: "test-token",
  };
  const body = { test: "test" };

  describe("request", () => {
    it("should send a request with default Moysklad base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/",
        expect.any(Object),
      );
    });

    it("should send a request with a custom base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({
        auth: tokenAuth,
        baseUrl: EXAMPLE_BASE_URL,
      });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        `${EXAMPLE_BASE_URL}/`,
        expect.any(Object),
      );
    });

    it("should send a request to a full URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request(EXAMPLE_BASE_URL);

      expect(fetchSpy).toHaveBeenCalledWith(
        EXAMPLE_BASE_URL,
        expect.any(Object),
      );
    });

    it("should send a request with basic auth", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: basicAuth });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Basic ${btoa(
              `${basicAuth.login}:${basicAuth.password}`,
            )}`,
          }),
        }),
      );
    });

    it("should send a request with token auth", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${tokenAuth.token}`,
          }),
        }),
      );
    });

    it("should send a request with a custom user agent", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth, userAgent });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            "User-Agent": userAgent,
          }),
        }),
      );
    });

    it("should send a request with a JSON body", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request("/", { method: "POST", body });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify(body),
        }),
      );
    });

    it("should throw an error if a response is not OK", async () => {
      const client = new ApiClient({
        auth: tokenAuth,
        baseUrl: "https://example.com",
      });

      await expect(client.request("/error")).rejects.toThrow(MoyskladError);
    });

    it("should append search parameters to the URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request("/", {
        searchParameters: new URLSearchParams({ foo: "bar" }),
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/?foo=bar",
        expect.any(Object),
      );
    });
  });

  describe("get", () => {
    it("should send a GET request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.get("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "GET",
        }),
      );
    });
  });

  describe("post", () => {
    it("should send a POST request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.post("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });
  });

  describe("put", () => {
    it("should send a PUT request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.put("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PUT",
        }),
      );
    });
  });

  describe("delete", () => {
    it("should send a DELETE request", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.delete("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
    });
  });

  describe("buildUrl", () => {
    it("should build a URL with a string relative path", () => {
      const client = new ApiClient({ auth: { token: "" } });

      const url = client.buildUrl("/foo");

      expect(url.toString()).toBe("https://api.moysklad.ru/api/remap/1.2/foo");
    });

    it("should build a URL with a string array relative path", () => {
      const client = new ApiClient({ auth: { token: "" } });

      const url = client.buildUrl(["/foo", "/bar"]);

      expect(url.toString()).toBe(
        "https://api.moysklad.ru/api/remap/1.2/foo/bar",
      );
    });

    it("should build a URL with a string array absolute path", () => {
      const client = new ApiClient({ auth: { token: "" } });

      const url = client.buildUrl(["https://example.org", "foo", "bar"]);

      expect(url.toString()).toBe("https://example.org/foo/bar");
    });

    it("should build a URL with a full URL", () => {
      const client = new ApiClient({ auth: { token: "" } });

      const url = client.buildUrl(`${EXAMPLE_BASE_URL}/foo`);

      expect(url.toString()).toBe(`${EXAMPLE_BASE_URL}/foo`);
    });

    it("should normalize a URL", () => {
      const client = new ApiClient({
        auth: { token: "" },
        baseUrl: EXAMPLE_BASE_URL,
      });

      const url = client.buildUrl(`/foo//bar/123`);

      expect(url.toString()).toBe(`${EXAMPLE_BASE_URL}/foo/bar/123`);
    });
  });

  describe("batchGet", () => {
    const bigData = [...Array.from({ length: 5555 }).keys()];
    const smallData = [...Array.from({ length: 5 }).keys()];
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const constructFetcher = (data: number[]) =>
      // eslint-disable-next-line @typescript-eslint/require-await
      vi.fn(async (limit: number, offset: number) => ({
        rows: data.slice(offset, offset + limit),
        meta: { size: data.length } as unknown as ListMetadata<never>,
        context: {} as never,
      }));

    it("should fetch all rows with default limit", async () => {
      const client = new ApiClient({ auth: { token: "" } });
      const fetcher = constructFetcher(bigData);

      const result = await client.batchGet(fetcher);
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 1000));
      expect(result.rows).toEqual(bigData);
    });

    it("should fetch all rows with expand limit", async () => {
      const client = new ApiClient({ auth: { token: "" } });

      const fetcher = constructFetcher(bigData);

      const result = await client.batchGet(fetcher, true);
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 100));
      expect(result.rows).toEqual(bigData);
    });

    it("should fetch all rows with custom limit", async () => {
      const client = new ApiClient({
        auth: { token: "" },
        batchGetOptions: { limit: 150 },
      });

      const fetcher = constructFetcher(bigData);

      const result = await client.batchGet(fetcher);
      expect(fetcher).toHaveBeenCalledTimes(Math.ceil(bigData.length / 150));
      expect(result.rows).toEqual(bigData);
    });

    it("should fetch all rows if row count is less than limit", async () => {
      const client = new ApiClient({ auth: { token: "" } });

      const fetcher = constructFetcher(smallData);

      const result = await client.batchGet(fetcher);
      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(result.rows).toEqual(smallData);
    });

    it("should return empty rows if no data", async () => {
      const client = new ApiClient({ auth: { token: "" } });

      const fetcher = constructFetcher([]);

      const result = await client.batchGet(fetcher);
      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(result.rows).toEqual([]);
    });
  });
});

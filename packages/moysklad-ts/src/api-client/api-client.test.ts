import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient, type BasicAuth, type TokenAuth } from "./api-client";
import { btoa } from "js-base64";

const EXAMPLE_BASE_URL = "https://example.com/api";

describe("ApiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("request", () => {
    const userAgent = "test-user-agent";
    const basicAuth: BasicAuth = {
      login: "test-login",
      password: "test-password",
    };
    const tokenAuth: TokenAuth = {
      token: "test-token",
    };
    const body = { test: "test" };

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
});

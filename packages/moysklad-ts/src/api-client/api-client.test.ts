import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient, MoyskladBasicAuth, MoyskladTokenAuth } from "./api-client";
import { btoa } from "js-base64";

describe("ApiClient", () => {
  describe("request", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    const baseUrl = "https://example.com/api";
    const userAgent = "test-user-agent";
    const basicAuth: MoyskladBasicAuth = {
      login: "test-login",
      password: "test-password",
    };
    const tokenAuth: MoyskladTokenAuth = {
      token: "test-token",
    };
    const body = { test: "test" };

    it("should send a request with default Moysklad base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://online.moysklad.ru/api/remap/1.2/",
        expect.any(Object),
      );
    });

    it("should send a request with a custom base URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth, baseUrl });

      await client.request("/");

      expect(fetchSpy).toHaveBeenCalledWith(`${baseUrl}/`, expect.any(Object));
    });

    it("should send a request to a full URL", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: tokenAuth });

      await client.request(baseUrl);

      expect(fetchSpy).toHaveBeenCalledWith(baseUrl, expect.any(Object));
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
  });
});

import { describe, it, expect, afterEach, vi } from "vitest";
import { StockEndpoint } from "./endpoint";
import { ApiClient } from "../../../api-client";

describe("StockEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("create", () => {
    it("should send a GET request without options", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.all();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/stock/all"),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with options", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.all({
        includeRelated: true,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/stock/all?includeRelated=true"),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });
});

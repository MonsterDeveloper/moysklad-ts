import { describe, it, expect, afterEach, vi } from "vitest";
import { StockEndpoint } from "./endpoint";
import { ApiClient } from "../../../api-client";
import { faker } from "../../../../test-utils";
import { composeDateTime } from "../../../utils";
import { StockAllCurrentStockType } from "./types";

describe("StockEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("all", () => {
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

  describe("allCurrent", () => {
    it("should send a GET request without options", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.allCurrent();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/stock/all/current"),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with filters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.allCurrent({
        filter: {
          assortmentId: "asd",
          storeId: ["1", "2"],
        },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `/stock/all/current?filter=${encodeURIComponent(
            "assortmentId=asd;storeId=1;storeId=2",
          )}`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with changedSince parameter", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      const changedSince = composeDateTime(faker.date.recent());

      await endpoint.allCurrent({
        changedSince,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `/stock/all/current?changedSince=${encodeURIComponent(changedSince).replace("%20", "+")}`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with include parameter", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.allCurrent({
        include: "zeroLines",
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/stock/all/current?include=zeroLines`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with stockType parameter", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new StockEndpoint(client);

      await endpoint.allCurrent({
        stockType: StockAllCurrentStockType.Reserve,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`/stock/all/current?stockType=reserve`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });
});

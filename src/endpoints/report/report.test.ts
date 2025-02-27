import { afterEach, describe, expect, it, vi } from "vitest";
import { createMoysklad } from "../../proxy";
import { StockAllCurrentStockType } from "./stock";

const moysklad = createMoysklad({
  auth: {
    token: "123",
  },
});

describe("report", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("handles profit by variant requests", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");

    await moysklad.report.profit.byVariant({
      momentFrom: "0",
      momentTo: "1",
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.moysklad.ru/api/remap/1.2/report/profit/byvariant?momentFrom=0&momentTo=1",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  describe("money", () => {
    it("handles money plot series requests", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      await moysklad.report.money.plotSeries({
        momentFrom: "0",
        momentTo: "1",
        interval: "day",
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/report/money/plotseries?momentFrom=0&momentTo=1&interval=day",
        expect.objectContaining({
          method: "GET",
        }),
      );
    });

    it("handles money by account requests", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      await moysklad.report.money.byAccount();

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/report/money/byaccount",
        expect.objectContaining({
          method: "GET",
        }),
      );
    });
  });

  describe("stock", () => {
    it("handles stock all requests", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      await moysklad.report.stock.all({
        groupBy: "variant",
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/report/stock/all?groupBy=variant",
        expect.objectContaining({
          method: "GET",
        }),
      );
    });

    it("handles stock all current requests", async () => {
      const fetchSpy = vi.spyOn(global, "fetch");

      await moysklad.report.stock.allCurrent({
        stockType: StockAllCurrentStockType.FreeStock,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/report/stock/all/current?stockType=freeStock",
        expect.objectContaining({
          method: "GET",
        }),
      );
    });
  });
});

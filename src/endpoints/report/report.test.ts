import { describe, it } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { StockAllCurrentStockType } from "./stock";

describe("report", () => {
  it("handles profit by variant requests", async () => {
    const fetchMock = createFetchMock();

    await moysklad.report.profit.byVariant({
      momentFrom: "0",
      momentTo: "1",
    });

    expectFetch({
      fetchMock,
      url: "/report/profit/byvariant",
      method: "GET",
      searchParameters: {
        momentFrom: "0",
        momentTo: "1",
      },
    });
  });

  describe("money", () => {
    it("handles money plot series requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.money.plotSeries({
        momentFrom: "0",
        momentTo: "1",
        interval: "day",
      });

      expectFetch({
        fetchMock,
        url: "/report/money/plotseries",
        method: "GET",
        searchParameters: {
          momentFrom: "0",
          momentTo: "1",
          interval: "day",
        },
      });
    });

    it("handles money by account requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.money.byAccount();

      expectFetch({
        fetchMock,
        url: "/report/money/byaccount",
        method: "GET",
      });
    });
  });

  describe("stock", () => {
    it("handles stock all requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.stock.all({
        groupBy: "variant",
      });

      expectFetch({
        fetchMock,
        url: "/report/stock/all",
        method: "GET",
        searchParameters: {
          groupBy: "variant",
        },
      });
    });

    it("handles stock all current requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.stock.allCurrent({
        stockType: StockAllCurrentStockType.FreeStock,
      });

      expectFetch({
        fetchMock,
        url: "/report/stock/all/current",
        method: "GET",
        searchParameters: {
          stockType: "freeStock",
        },
      });
    });
  });
});

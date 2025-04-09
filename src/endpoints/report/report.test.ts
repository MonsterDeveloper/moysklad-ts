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

  describe("turnover", () => {
    it("handles turnover all requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.turnover.all({
        momentFrom: "0",
        momentTo: "1",
        groupBy: "variant",
        filter: {
          product: "https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
          store: "https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
        },
      });

      expectFetch({
        fetchMock,
        url: "/report/turnover/all",
        method: "GET",
        searchParameters: {
          momentFrom: "0",
          momentTo: "1",
          groupBy: "variant",
          filter:
            "product=https://api.moysklad.ru/api/remap/1.2/entity/product/00001;store=https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
        },
      });
    });

    it("handles turnover by store requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.turnover.byStore({
        momentFrom: "0",
        momentTo: "1",
        filter: {
          product: "https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
          store: "https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
        },
      });

      expectFetch({
        fetchMock,
        url: "/report/turnover/bystore",
        method: "GET",
        searchParameters: {
          momentFrom: "0",
          momentTo: "1",
          filter:
            "product=https://api.moysklad.ru/api/remap/1.2/entity/product/00001;store=https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
        },
      });
    });

    it("handles turnover by operation requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.turnover.byOperation({
        momentFrom: "0",
        momentTo: "1",
        filter: {
          product: "https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
          withoutturnover: true,
          type: "supply" as const,
        },
      });

      expectFetch({
        fetchMock,
        url: "/report/turnover/byoperation",
        method: "GET",
        searchParameters: {
          momentFrom: "0",
          momentTo: "1",
          filter:
            "product=https://api.moysklad.ru/api/remap/1.2/entity/product/00001;withoutturnover=true;type=supply",
        },
      });
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

    describe("byStore", () => {
      it("handles basic stock by store requests", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          filter: {
            store: "https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
            product:
              "https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
          },
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            filter:
              "store=https://api.moysklad.ru/api/remap/1.2/entity/store/00002;product=https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
          },
        });
      });

      it("handles stock by store requests with all filter options", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          filter: {
            consignment:
              "https://api.moysklad.ru/api/remap/1.2/entity/consignment/00003",
            moment: "2024-01-01 00:00:00",
            product:
              "https://api.moysklad.ru/api/remap/1.2/entity/product/00001",
            productFolder:
              "https://api.moysklad.ru/api/remap/1.2/entity/productfolder/00004",
            search: "test",
            soldByWeight: true,
            stockMode: "nonEmpty",
            store: "https://api.moysklad.ru/api/remap/1.2/entity/store/00002",
            supplier:
              "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/00005",
            variant:
              "https://api.moysklad.ru/api/remap/1.2/entity/variant/00006",
          },
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            filter:
              "consignment=https://api.moysklad.ru/api/remap/1.2/entity/consignment/00003;" +
              "moment=2024-01-01 00:00:00;" +
              "product=https://api.moysklad.ru/api/remap/1.2/entity/product/00001;" +
              "productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/00004;" +
              "search=test;" +
              "soldByWeight=true;" +
              "stockMode=nonEmpty;" +
              "store=https://api.moysklad.ru/api/remap/1.2/entity/store/00002;" +
              "supplier=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/00005;" +
              "variant=https://api.moysklad.ru/api/remap/1.2/entity/variant/00006",
          },
        });
      });

      it("handles stock by store requests with sorting", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          order: { field: "stockOnAllStores", direction: "asc" },
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            order: "stockOnAllStores,asc",
          },
        });
      });

      it("handles stock by store requests with pagination", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          pagination: {
            limit: 50,
            offset: 100,
          },
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            limit: "50",
            offset: "100",
          },
        });
      });

      it("handles stock by store requests with product grouping", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          groupBy: "product",
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            groupBy: "product",
          },
        });
      });

      it("handles stock by store requests with consignment grouping", async () => {
        const fetchMock = createFetchMock();

        await moysklad.report.stock.byStore({
          groupBy: "consignment",
        });

        expectFetch({
          fetchMock,
          url: "/report/stock/bystore",
          method: "GET",
          searchParameters: {
            groupBy: "consignment",
          },
        });
      });

      it.each([
        "all",
        "positiveOnly",
        "negativeOnly",
        "empty",
        "nonEmpty",
        "underMinimum",
      ] as const)(
        "handles stock by store requests with stockMode=%s",
        async (mode) => {
          const fetchMock = createFetchMock();

          await moysklad.report.stock.byStore({
            filter: {
              stockMode: mode,
            },
          });

          expectFetch({
            fetchMock,
            url: "/report/stock/bystore",
            method: "GET",
            searchParameters: {
              filter: `stockMode=${mode}`,
            },
          });
        },
      );
    });
  });
});

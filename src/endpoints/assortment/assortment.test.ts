import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";

describe("assortment", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list();

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with groupBy option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list({
        groupBy: "consignment",
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          groupBy: "consignment",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list({
        filter: {
          barcode: "123456789",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          filter: "barcode=123456789",
        },
      });
    });

    it("makes a request with multiple filter values", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list({
        filter: {
          barcode: ["123456789", "987654321"],
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          filter: "barcode=123456789;barcode=987654321",
        },
      });
    });

    it("makes a request with equals filter", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.list({
        filter: {
          barcode: "123",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          filter: "barcode=123",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.assortment.all();

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "1000",
          offset: "0",
        },
      });
    });

    it("makes a request with groupBy option", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.assortment.all({
        groupBy: "consignment",
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          groupBy: "consignment",
          limit: "1000",
          offset: "0",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.assortment.all({
        filter: {
          barcode: "123456789",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "1000",
          offset: "0",
          filter: "barcode=123456789",
        },
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.first();

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with groupBy option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.first({
        groupBy: "consignment",
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "1",
          groupBy: "consignment",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.first({
        filter: {
          barcode: "123456789",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "barcode=123456789",
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.size();

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: {
          limit: "0",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.assortment.size({
        filter: {
          barcode: "barcode",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/assortment",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "barcode=barcode",
          limit: "0",
        }),
      });
    });
  });
});

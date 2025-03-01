import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("paymentOut", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list();

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list({
        filter: {
          applicable: true,
          name: "Test Payment",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Payment",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list({
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list({
        order: { field: "moment", direction: "desc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.list({
        search: "test payment",
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          search: "test payment",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.paymentOut.all();

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.paymentOut.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "applicable=true",
          expand: "agent",
        }),
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.first();

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.first({
        filter: {
          applicable: true,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "applicable=true",
          search: "test",
        },
      });
    });
  });

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.paymentOut.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.paymentOut.get(id, {
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.paymentOut.size();

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });
  });

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.paymentOut.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Payment",
        description: "New description",
      };

      await moysklad.paymentOut.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Payment",
        description: "New description",
      };

      await moysklad.paymentOut.update(id, data, {
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock();
      const data = {
        organization: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Organization,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Organization,
          },
        },
        agent: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Counterparty,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Counterparty,
          },
        },
        expenseItem: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ExpenseItem,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ExpenseItem,
          },
        },
      } as const;

      await moysklad.paymentOut.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        organization: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Organization,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Organization,
          },
        },
        agent: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Counterparty,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Counterparty,
          },
        },
        expenseItem: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ExpenseItem,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ExpenseItem,
          },
        },
        name: "New Payment",
        sum: 100_000,
      } as const;

      await moysklad.paymentOut.create(data, {
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/paymentout",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("batchDelete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const ids = [
        "5427bc76-b95f-11eb-0a80-04bb000cd583",
        "5427bc76-b95f-11eb-0a80-04bb000cd584",
      ];

      await moysklad.paymentOut.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/paymentout/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/paymentout/${id}`),
            type: Entity.PaymentOut,
            mediaType: MediaType.Json,
          },
        })),
      });
    });
  });

  describe("trash", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.paymentOut.trash(id);

      expectFetch({
        fetchMock,
        url: `/entity/paymentout/${id}/trash`,
        method: "POST",
      });
    });
  });
});

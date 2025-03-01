import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("demand", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list();

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list({
        filter: {
          applicable: true,
          name: "Test Demand",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Demand",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list({
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list({
        order: { field: "moment", direction: "desc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.list({
        search: "test demand",
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          search: "test demand",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.demand.all();

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.demand.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
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

      await moysklad.demand.first();

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.first({
        filter: {
          applicable: true,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
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
      const id = "a7404318-550f-11e8-56c0-000800000006";

      await moysklad.demand.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/demand/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404318-550f-11e8-56c0-000800000006";

      await moysklad.demand.get(id, {
        expand: {
          agent: true,
          organization: true,
          positions: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/demand/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,organization,positions",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.demand.size();

      expectFetch({
        fetchMock,
        url: "/entity/demand",
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
      const id = "a7404318-550f-11e8-56c0-000800000006";

      await moysklad.demand.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/demand/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("batchDelete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const ids = [
        "a7404318-550f-11e8-56c0-000800000006",
        "a7404318-550f-11e8-56c0-000800000007",
      ];

      await moysklad.demand.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/demand/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/demand/${id}`),
            type: Entity.Demand,
            mediaType: MediaType.Json,
          },
        })),
      });
    });
  });

  describe("trash", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404318-550f-11e8-56c0-000800000006";

      await moysklad.demand.trash(id);

      expectFetch({
        fetchMock,
        url: `/entity/demand/${id}/trash`,
        method: "POST",
      });
    });
  });

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        organization: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Organization,
                "a7404318-550f-11e8-56c0-000800000001",
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
                "a7404318-550f-11e8-56c0-000800000002",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Counterparty,
          },
        },
        store: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Store,
                "a7404318-550f-11e8-56c0-000800000003",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
      } as const;

      await moysklad.demand.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/demand",
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
                "a7404318-550f-11e8-56c0-000800000001",
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
                "a7404318-550f-11e8-56c0-000800000002",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Counterparty,
          },
        },
        store: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Store,
                "a7404318-550f-11e8-56c0-000800000003",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
        name: "New Demand",
      } as const;

      await moysklad.demand.upsert(data, {
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/demand",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("template", () => {
    it("makes a request with customerOrder", async () => {
      const fetchMock = createFetchMock();
      const data = {
        customerOrder: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.CustomerOrder,
                "a7404318-550f-11e8-56c0-000800000001",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.CustomerOrder,
          },
        },
      } as const;

      await moysklad.demand.template(data);

      expectFetch({
        fetchMock,
        url: "/entity/demand/new",
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with invoiceOut", async () => {
      const fetchMock = createFetchMock();
      const data = {
        invoiceOut: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.InvoiceOut,
                "a7404318-550f-11e8-56c0-000800000001",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.InvoiceOut,
          },
        },
      } as const;

      await moysklad.demand.template(data);

      expectFetch({
        fetchMock,
        url: "/entity/demand/new",
        method: "PUT",
        body: data,
      });
    });
  });
});

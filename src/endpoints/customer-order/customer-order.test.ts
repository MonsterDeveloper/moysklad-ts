import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("customerOrder", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list();

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list({
        filter: {
          applicable: true,
          name: "Test Order",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Order",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list({
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list({
        order: { field: "moment", direction: "desc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.list({
        search: "test order",
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          search: "test order",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.customerOrder.all();

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.customerOrder.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
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

      await moysklad.customerOrder.first();

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.first({
        filter: {
          applicable: true,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
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

      await moysklad.customerOrder.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.customerOrder.get(id, {
        expand: {
          agent: true,
          organization: true,
          positions: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}`,
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

      await moysklad.customerOrder.size();

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.customerOrder.size({
        filter: {
          name: "Test Customer Order",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Customer Order",
          limit: "0",
        }),
      });
    });
  });

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.customerOrder.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Order",
        description: "New description",
      };

      await moysklad.customerOrder.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Order",
        description: "New description",
      };

      await moysklad.customerOrder.update(id, data, {
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}`,
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
      } as const;

      await moysklad.customerOrder.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
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
        name: "New Order",
      } as const;

      await moysklad.customerOrder.create(data, {
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
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

      await moysklad.customerOrder.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/customerorder/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/customerorder/${id}`),
            type: Entity.CustomerOrder,
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

      await moysklad.customerOrder.trash(id);

      expectFetch({
        fetchMock,
        url: `/entity/customerorder/${id}/trash`,
        method: "POST",
      });
    });
  });

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new order
        {
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
          name: "New Order",
        },
        // Update existing order
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.CustomerOrder,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.CustomerOrder,
          },
          description: "Updated description",
        },
      ];

      await moysklad.customerOrder.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new order
        {
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
          name: "New Order",
        },
      ];

      await moysklad.customerOrder.upsert(data as never, {
        expand: {
          agent: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/customerorder",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      });
    });
  });
});

import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("inventory", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list();

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list({
        filter: {
          name: "Test Inventory",
          store: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          filter:
            "name=Test Inventory;store=5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list({
        expand: {
          organization: true,
          positions: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          expand: "organization,positions",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list({
        order: { field: "moment", direction: "desc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.list({
        search: "test inventory",
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          search: "test inventory",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.inventory.all();

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.inventory.all({
        filter: {
          store: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        expand: {
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "store=5427bc76-b95f-11eb-0a80-04bb000cd583",
          expand: "organization",
        }),
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.first();

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.first({
        filter: {
          store: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "store=5427bc76-b95f-11eb-0a80-04bb000cd583",
          search: "test",
        },
      });
    });
  });

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.inventory.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/inventory/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.inventory.get(id, {
        expand: {
          organization: true,
          positions: true,
          enters: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/inventory/${id}`,
        method: "GET",
        searchParameters: {
          expand: "organization,positions,enters",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Inventory",
        description: "New description",
      };

      await moysklad.inventory.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/inventory/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Inventory",
        description: "New description",
      };

      await moysklad.inventory.update(id, data, {
        expand: {
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/inventory/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "organization",
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
        store: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Store,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
      } as const;

      await moysklad.inventory.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
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
        store: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Store,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
        name: "New Inventory",
      } as const;

      await moysklad.inventory.create(data, {
        expand: {
          organization: true,
          positions: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "organization,positions",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new inventory
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
          store: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.Store,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.Store,
            },
          },
          name: "New Inventory",
        },
        // Update existing inventory
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Inventory,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Inventory,
          },
          description: "Updated description",
        },
      ];

      await moysklad.inventory.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new inventory
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
          store: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.Store,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.Store,
            },
          },
          name: "New Inventory",
        },
      ];

      await moysklad.inventory.upsert(data as never, {
        expand: {
          organization: true,
          positions: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "organization,positions",
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

      await moysklad.inventory.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/inventory/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/inventory/${id}`),
            type: Entity.Inventory,
            mediaType: MediaType.Json,
          },
        })),
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.size();

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.inventory.size({
        filter: {
          name: "Test Inventory",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/inventory",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Inventory",
          limit: "0",
        }),
      });
    });
  });
});

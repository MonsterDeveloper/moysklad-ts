import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("productionTask", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.list();

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.list({
        filter: {
          applicable: true,
          name: "Test Production Task",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Production Task",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.list({
        expand: {
          owner: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: {
          expand: "owner,organization",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.list({
        search: "test production task",
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: {
          search: "test production task",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.productionTask.all();

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.productionTask.all({
        filter: {
          applicable: true,
        },
        expand: {
          owner: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "applicable=true",
          expand: "owner",
        }),
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.first();

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.first({
        filter: {
          applicable: true,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
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

      await moysklad.productionTask.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/productiontask/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.productionTask.get(id, {
        expand: {
          owner: true,
          organization: true,
          productionRows: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/productiontask/${id}`,
        method: "GET",
        searchParameters: {
          expand: "owner,organization,productionRows",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.size();

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productionTask.size({
        filter: {
          name: "Test Production Task",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Production Task",
          limit: "0",
        }),
      });
    });
  });

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.productionTask.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/productiontask/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Production Task",
        description: "New description",
      };

      await moysklad.productionTask.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/productiontask/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Production Task",
        description: "New description",
      };

      await moysklad.productionTask.update(id, data, {
        expand: {
          owner: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/productiontask/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "owner",
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
        name: "New Production Task",
        moment: new Date().toISOString(),
      } as const;

      await moysklad.productionTask.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
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
        name: "New Production Task",
        moment: new Date().toISOString(),
      } as const;

      await moysklad.productionTask.create(data, {
        expand: {
          owner: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "owner,organization",
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

      await moysklad.productionTask.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/productiontask/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/productiontask/${id}`),
            type: Entity.ProductionTask,
            mediaType: MediaType.Json,
          },
        })),
      });
    });
  });

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new production task
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
          name: "New Production Task",
          moment: new Date().toISOString(),
        },
        // Update existing production task
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProductionTask,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProductionTask,
          },
          description: "Updated description",
        },
      ];

      await moysklad.productionTask.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new production task
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
          name: "New Production Task",
          moment: new Date().toISOString(),
        },
      ];

      await moysklad.productionTask.upsert(data as never, {
        expand: {
          owner: true,
          organization: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productiontask",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "owner,organization",
          limit: expect.any(String),
        },
      });
    });
  });
});

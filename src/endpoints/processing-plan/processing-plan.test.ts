import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";
import { ProcessingPlanCostDistributionType } from "./types";

describe("processingPlan", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.list();

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.list({
        filter: {
          archived: false,
          name: "Test Plan",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          filter: "archived=false;name=Test Plan",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.list({
        expand: {
          group: true,
          owner: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          expand: "group,owner",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.list({
        search: "test plan",
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          search: "test plan",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.processingPlan.all();

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.processingPlan.all({
        filter: {
          archived: false,
        },
        expand: {
          group: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "archived=false",
          expand: "group",
        }),
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.first();

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.first({
        filter: {
          archived: false,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "archived=false",
          search: "test",
        },
      });
    });
  });

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.processingPlan.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/processingplan/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.processingPlan.get(id, {
        expand: {
          group: true,
          owner: true,
          materials: true,
          products: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/processingplan/${id}`,
        method: "GET",
        searchParameters: {
          expand: "group,owner,materials,products",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.size();

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.processingPlan.size({
        filter: {
          name: "Test Processing Plan",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Processing Plan",
          limit: "0",
        }),
      });
    });
  });

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.processingPlan.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/processingplan/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Plan",
        code: "UP001",
      };

      await moysklad.processingPlan.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/processingplan/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Plan",
        code: "UP001",
      };

      await moysklad.processingPlan.update(id, data, {
        expand: {
          group: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/processingplan/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "group",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "New Processing Plan",
        processingProcess: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProcessingProcess,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProcessingProcess,
          },
        },
        costDistributionType: ProcessingPlanCostDistributionType.ByPrice,
      } as const;

      await moysklad.processingPlan.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "New Processing Plan",
        processingProcess: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProcessingProcess,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProcessingProcess,
          },
        },
        costDistributionType: ProcessingPlanCostDistributionType.ByPrice,
      } as const;

      await moysklad.processingPlan.create(data, {
        expand: {
          group: true,
          owner: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "group,owner",
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

      await moysklad.processingPlan.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/processingplan/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/processingplan/${id}`),
            type: Entity.ProcessingPlan,
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
        // Create new processing plan
        {
          name: "New Processing Plan",
          processingProcess: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.ProcessingProcess,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.ProcessingProcess,
            },
          },
          costDistributionType: ProcessingPlanCostDistributionType.ByPrice,
        },
        // Update existing processing plan
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProcessingPlan,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProcessingPlan,
          },
          name: "Updated Processing Plan",
        },
      ];

      await moysklad.processingPlan.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new processing plan
        {
          name: "New Processing Plan",
          processingProcess: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.ProcessingProcess,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.ProcessingProcess,
            },
          },
          costDistributionType: ProcessingPlanCostDistributionType.ByPrice,
        },
      ];

      await moysklad.processingPlan.upsert(data as never, {
        expand: {
          group: true,
          owner: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/processingplan",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "group,owner",
          limit: expect.any(String),
        },
      });
    });
  });
});

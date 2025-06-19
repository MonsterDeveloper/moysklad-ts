import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";
import { AttributeType } from "../../types/attribute";

describe("variant", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list();

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list({
        filter: {
          archived: false,
          name: "Test Variant",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          filter: "archived=false;name=Test Variant",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list({
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          expand: "product",
          limit: expect.any(String),
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list({
        order: { field: "name", direction: "desc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          order: "name,desc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.list({
        search: "test variant",
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          search: "test variant",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.variant.all();

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.variant.all({
        filter: {
          archived: false,
        },
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "archived=false",
          expand: "product",
        }),
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.first();

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.first({
        filter: {
          archived: false,
        },
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
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

      await moysklad.variant.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.variant.get(id, {
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}`,
        method: "GET",
        searchParameters: {
          expand: "product",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.size();

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.variant.size({
        filter: {
          name: "Test Variant",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Variant",
          limit: "0",
        }),
      });
    });
  });

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.variant.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Variant",
        description: "New description",
      };

      await moysklad.variant.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Updated Variant",
        description: "New description",
      };

      await moysklad.variant.update(id, data, {
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "product",
          limit: expect.any(String),
        },
      });
    });
  });

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock();
      const data = {
        product: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Product,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Product as const,
          },
        },
        characteristics: [
          {
            id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
            name: "Цвет",
            value: "Красный",
            type: AttributeType.String as const,
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.AttributeMetadata,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.AttributeMetadata as const,
              metadataHref: "",
            },
          },
        ],
      };

      await moysklad.variant.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        product: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Product,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Product,
          },
        },
        characteristics: [
          {
            id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
            name: "Цвет",
            value: "Красный",
            type: AttributeType.String,
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.AttributeMetadata,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.AttributeMetadata,
            },
          },
        ],
        name: "New Variant",
      };

      await moysklad.variant.create(data as never, {
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "product",
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

      await moysklad.variant.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/variant/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/variant/${id}`),
            type: Entity.Variant,
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

      await moysklad.variant.trash(id);

      expectFetch({
        fetchMock,
        url: `/entity/variant/${id}/trash`,
        method: "POST",
      });
    });
  });

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new variant
        {
          product: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.Product,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.Product,
            },
          },
          characteristics: [
            {
              id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
              name: "Цвет",
              value: "Красный",
              type: AttributeType.String,
              meta: {
                href: moysklad.client
                  .buildUrl([
                    "entity",
                    Entity.AttributeMetadata,
                    "5427bc76-b95f-11eb-0a80-04bb000cd583",
                  ])
                  .toString(),
                mediaType: MediaType.Json,
                type: Entity.AttributeMetadata,
              },
            },
          ],
          name: "New Variant",
        },
        // Update existing variant
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Variant,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Variant,
          },
          description: "Updated description",
        },
      ];

      await moysklad.variant.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = [
        // Create new variant
        {
          product: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.Product,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.Product,
            },
          },
          characteristics: [
            {
              id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
              name: "Цвет",
              value: "Красный",
              type: AttributeType.String,
              meta: {
                href: moysklad.client
                  .buildUrl([
                    "entity",
                    Entity.AttributeMetadata,
                    "5427bc76-b95f-11eb-0a80-04bb000cd583",
                  ])
                  .toString(),
                mediaType: MediaType.Json,
                type: Entity.AttributeMetadata,
              },
            },
          ],
          name: "New Variant",
        },
      ];

      await moysklad.variant.upsert(data as never, {
        expand: {
          product: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/variant",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "product",
          limit: expect.any(String),
        },
      });
    });
  });
});

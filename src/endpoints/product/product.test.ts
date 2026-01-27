import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { AuditEventSource, AuditEventType } from "../../types/audit"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"

describe("product", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list()

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list({
        filter: {
          archived: false,
          name: "Test Product",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          filter: "archived=false;name=Test Product",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list({
        expand: {
          agent: true,
          group: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          expand: "agent,group",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list({
        order: { field: "name", direction: "asc" },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          order: "name,asc",
        },
      })
    })

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.list({
        search: "test product",
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          search: "test product",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.product.all()

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.product.all({
        filter: {
          archived: false,
        },
        expand: {
          agent: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "archived=false",
          expand: "agent",
        }),
      })
    })
  })

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.first()

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.first({
        filter: {
          archived: false,
        },
        search: "test",
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "archived=false",
          search: "test",
        },
      })
    })
  })

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.get(id, {
        expand: {
          agent: true,
          group: true,
          owner: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,group,owner",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.size()

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.product.size({
        filter: {
          name: "Test Product",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Product",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Product",
        description: "New description",
      }

      await moysklad.product.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Product",
        description: "New description",
      }

      await moysklad.product.update(id, data, {
        expand: {
          agent: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new product
        {
          name: "New Product",
          code: "prod001",
          description: "Product description",
        },
        // Update existing product
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Product,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Product,
          },
          description: "Updated description",
        },
      ]

      await moysklad.product.upsert(data as never)

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        {
          name: "New Product",
          code: "prod001",
          description: "Product description",
        },
      ]

      await moysklad.product.upsert(data as never, {
        expand: {
          agent: true,
          group: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/product",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,group",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("batchDelete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const ids = [
        "5427bc76-b95f-11eb-0a80-04bb000cd583",
        "5427bc76-b95f-11eb-0a80-04bb000cd584",
      ]

      await moysklad.product.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/product/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/product/${id}`),
            type: Entity.Product,
            mediaType: MediaType.Json,
          },
        })),
      })
    })
  })

  describe("trash", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.trash(id)

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}/trash`,
        method: "POST",
      })
    })
  })

  describe("audit", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.audit(id)

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}/audit`,
        method: "GET",
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.audit(id, {
        filter: {
          eventType: AuditEventType.Create,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}/audit`,
        method: "GET",
        searchParameters: {
          filter: "eventType=create",
        },
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.audit(id, {
        pagination: {
          limit: 50,
          offset: 10,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}/audit`,
        method: "GET",
        searchParameters: {
          limit: "50",
          offset: "10",
        },
      })
    })

    it("makes a request with source filter", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.product.audit(id, {
        filter: {
          source: AuditEventSource.JsonApi,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/product/${id}/audit`,
        method: "GET",
        searchParameters: {
          filter: "source=jsonapi",
        },
      })
    })
  })
})

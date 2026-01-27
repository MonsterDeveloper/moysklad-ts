import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"

describe("invoiceOut", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list()

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list({
        filter: {
          applicable: true,
          name: "Test Invoice",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Invoice",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list({
        expand: {
          agent: true,
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list({
        order: { field: "moment", direction: "desc" },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      })
    })

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.list({
        search: "test invoice",
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          search: "test invoice",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.invoiceOut.all()

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.invoiceOut.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "applicable=true",
          expand: "agent",
        }),
      })
    })
  })

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.first()

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.first({
        filter: {
          applicable: true,
        },
        search: "test",
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "applicable=true",
          search: "test",
        },
      })
    })
  })

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.invoiceOut.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/invoiceout/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.invoiceOut.get(id, {
        expand: {
          agent: true,
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/invoiceout/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,organization,positions",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.size()

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.invoiceOut.size({
        filter: {
          name: "Test Invoice Out",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Invoice Out",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.invoiceOut.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/invoiceout/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Invoice",
        description: "New description",
      }

      await moysklad.invoiceOut.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/invoiceout/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Invoice",
        description: "New description",
      }

      await moysklad.invoiceOut.update(id, data, {
        expand: {
          agent: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/invoiceout/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock()
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
      } as const

      await moysklad.invoiceOut.create(data)

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
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
        name: "New Invoice",
      } as const

      await moysklad.invoiceOut.create(data, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
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

      await moysklad.invoiceOut.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/invoiceout/${id}`),
            type: Entity.InvoiceOut,
            mediaType: MediaType.Json,
          },
        })),
      })
    })
  })

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new invoice
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
          name: "New Invoice",
        },
        // Update existing invoice
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.InvoiceOut,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.InvoiceOut,
          },
          description: "Updated description",
        },
      ]

      await moysklad.invoiceOut.upsert(data as never)

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new invoice
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
          name: "New Invoice",
        },
      ]

      await moysklad.invoiceOut.upsert(data as never, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/invoiceout",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })
  })
})

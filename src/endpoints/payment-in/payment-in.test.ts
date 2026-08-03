import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { MoyskladApiError } from "../../errors"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"

describe("paymentIn", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list()

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list({
        filter: {
          applicable: true,
          name: "Test Payment",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Payment",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list({
        expand: {
          agent: true,
          organization: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list({
        order: { field: "moment", direction: "desc" },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      })
    })

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.list({
        search: "test payment",
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          search: "test payment",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.paymentIn.all()

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.paymentIn.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
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

      await moysklad.paymentIn.first()

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.first({
        filter: {
          applicable: true,
        },
        search: "test",
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
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

      await moysklad.paymentIn.get(id)

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.paymentIn.get(id, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.size()

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.paymentIn.size({
        filter: {
          name: "Test Payment In",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Payment In",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.paymentIn.delete(id)

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "DELETE",
      })
    })

    it("resolves undefined for an empty 200 response", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      fetchMock.mockResolvedValue(new Response(null, { status: 200 }))

      await expect(moysklad.paymentIn.delete(id)).resolves.toBeUndefined()

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "DELETE",
      })
    })

    it("resolves undefined for a 204 response", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      fetchMock.mockResolvedValue(new Response(null, { status: 204 }))

      await expect(moysklad.paymentIn.delete(id)).resolves.toBeUndefined()

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "DELETE",
      })
    })

    it("discards a successful response body", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      fetchMock.mockResolvedValue(
        new Response(JSON.stringify({ deleted: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      )

      await expect(moysklad.paymentIn.delete(id)).resolves.toBeUndefined()

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "DELETE",
      })
    })

    it("preserves a JSON API error", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      fetchMock.mockResolvedValue(
        new Response(
          JSON.stringify({
            errors: [
              {
                code: 404,
                error: "Payment in not found",
              },
            ],
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        ),
      )

      const deletion = moysklad.paymentIn.delete(id)

      await expect(deletion).rejects.toBeInstanceOf(MoyskladApiError)
      await expect(deletion).rejects.toMatchObject({ code: 404 })

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Payment",
        description: "New description",
        paymentPurpose: "Updated payment purpose",
      }

      await moysklad.paymentIn.update(id, data)

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Payment",
        description: "New description",
        paymentPurpose: "Updated payment purpose",
      }

      await moysklad.paymentIn.update(id, data, {
        expand: {
          agent: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}`,
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

      await moysklad.paymentIn.create(data)

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
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
        name: "New Payment",
        paymentPurpose: "Payment for services",
      } as const

      await moysklad.paymentIn.create(data, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
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

      await moysklad.paymentIn.batchDelete(ids)

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/paymentin/${id}`),
            type: Entity.PaymentIn,
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

      await moysklad.paymentIn.trash(id)

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}/trash`,
        method: "POST",
      })
    })

    it("resolves undefined for an empty response", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      fetchMock.mockResolvedValue(new Response(null, { status: 200 }))

      await expect(moysklad.paymentIn.trash(id)).resolves.toBeUndefined()

      await expectFetch({
        fetchMock,
        url: `/entity/paymentin/${id}/trash`,
        method: "POST",
      })
    })
  })

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new payment
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
          name: "New Payment",
          paymentPurpose: "Payment for services",
        },
        // Update existing payment
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.PaymentIn,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.PaymentIn,
          },
          description: "Updated description",
          paymentPurpose: "Updated payment purpose",
        },
      ]

      await moysklad.paymentIn.upsert(data as never)

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new payment
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
          name: "New Payment",
          paymentPurpose: "Payment for services",
        },
      ]

      await moysklad.paymentIn.upsert(data as never, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/paymentin",
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

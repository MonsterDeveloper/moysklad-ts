import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"

describe("salesReturn", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list()

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list({
        filter: {
          applicable: true,
          name: "Test SalesReturn",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test SalesReturn",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list({
        expand: {
          agent: true,
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list({
        order: { field: "moment", direction: "desc" },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      })
    })

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.list({
        search: "test salesReturn",
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          search: "test salesReturn",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.salesReturn.all()

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.salesReturn.all({
        filter: {
          applicable: true,
        },
        expand: {
          agent: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
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

      await moysklad.salesReturn.first()

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.first({
        filter: {
          applicable: true,
        },
        search: "test",
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
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
      const id = "a7404318-550f-11e8-56c0-000800000006"

      await moysklad.salesReturn.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/salesreturn/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "a7404318-550f-11e8-56c0-000800000006"

      await moysklad.salesReturn.get(id, {
        expand: {
          agent: true,
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/salesreturn/${id}`,
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

      await moysklad.salesReturn.size()

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.salesReturn.size({
        filter: {
          name: "Test Sales Return",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Sales Return",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "a7404318-550f-11e8-56c0-000800000006"

      await moysklad.salesReturn.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/salesreturn/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("batchDelete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const ids = [
        "a7404318-550f-11e8-56c0-000800000006",
        "a7404318-550f-11e8-56c0-000800000007",
      ]

      await moysklad.salesReturn.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/salesreturn/${id}`),
            type: Entity.SalesReturn,
            mediaType: MediaType.Json,
          },
        })),
      })
    })
  })

  describe("trash", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "a7404318-550f-11e8-56c0-000800000006"

      await moysklad.salesReturn.trash(id)

      expectFetch({
        fetchMock,
        url: `/entity/salesreturn/${id}/trash`,
        method: "POST",
      })
    })
  })

  describe("upsert", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const data = {
        organization: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Organization,
                "fae3561a-2e58-11e6-8a84-bae50000004e",
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
                "147c1f1b-32ca-11e6-8a84-bae500000004",
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
                "faf3ff5b-2e58-11e6-8a84-bae500000050",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
        name: "0003",
        description: "Гневный возврат бракованного товара",
        code: "k123e21451k",
        externalCode: "w214t2141f",
        moment: "2017-11-21 14:37:00",
        applicable: false,
      } as const

      await moysklad.salesReturn.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
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
                "fae3561a-2e58-11e6-8a84-bae50000004e",
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
                "147c1f1b-32ca-11e6-8a84-bae500000004",
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
                "faf3ff5b-2e58-11e6-8a84-bae500000050",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Store,
          },
        },
      } as const

      await moysklad.salesReturn.upsert(data, {
        expand: {
          agent: true,
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent,organization",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("template", () => {
    it("makes a request with demand", async () => {
      const fetchMock = createFetchMock()
      const data = {
        demand: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Demand,
                "a7404318-550f-11e8-56c0-000800000001",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Demand,
          },
        },
      } as const

      await moysklad.salesReturn.template(data)

      expectFetch({
        fetchMock,
        url: "/entity/salesreturn/new",
        method: "PUT",
        body: data,
      })
    })
  })
})

import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"
import { EnterOverheadDistribution } from "./types"

describe("enter", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list()

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list({
        filter: {
          applicable: true,
          name: "Test Enter",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          filter: "applicable=true;name=Test Enter",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list({
        expand: {
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          expand: "organization,positions",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list({
        order: { field: "moment", direction: "desc" },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          order: "moment,desc",
        },
      })
    })

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.list({
        search: "test enter",
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          search: "test enter",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.enter.all()

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.enter.all({
        filter: {
          applicable: true,
        },
        expand: {
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "applicable=true",
          expand: "organization",
        }),
      })
    })
  })

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.first()

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.first({
        filter: {
          applicable: true,
        },
        search: "test",
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
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

      await moysklad.enter.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/enter/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.enter.get(id, {
        expand: {
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/enter/${id}`,
        method: "GET",
        searchParameters: {
          expand: "organization,positions",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.size()

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.enter.size({
        filter: {
          name: "Test Enter",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Enter",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.enter.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/enter/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Enter",
        description: "New description",
      }

      await moysklad.enter.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/enter/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Enter",
        description: "New description",
      }

      await moysklad.enter.update(id, data, {
        expand: {
          organization: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/enter/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "organization",
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
      } as const

      await moysklad.enter.create(data)

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with overhead", async () => {
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
        name: "New Enter",
        overhead: {
          sum: 10_000,
          distribution: EnterOverheadDistribution.Price,
        },
      } as const

      await moysklad.enter.create(data)

      expectFetch({
        fetchMock,
        url: "/entity/enter",
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
        name: "New Enter",
      } as const

      await moysklad.enter.create(data, {
        expand: {
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "organization,positions",
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

      await moysklad.enter.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/enter/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(`/entity/enter/${id}`),
            type: Entity.Enter,
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
        // Create new enter
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
          name: "New Enter",
        },
        // Update existing enter
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.Enter,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.Enter,
          },
          description: "Updated description",
        },
      ]

      await moysklad.enter.upsert(data as never)

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new enter
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
          name: "New Enter",
        },
      ]

      await moysklad.enter.upsert(data as never, {
        expand: {
          organization: true,
          positions: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/enter",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "organization,positions",
          limit: expect.any(String),
        },
      })
    })
  })
})

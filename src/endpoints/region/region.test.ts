import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"

describe("region", () => {
  describe("list", () => {
    it("makes a request to get regions list", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.list()

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
      })
    })

    it("handles pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.list({
        pagination: {
          limit: 10,
          offset: 20,
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "10",
          offset: "20",
        },
      })
    })

    it("handles filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.list({
        filter: {
          name: "Москва",
          code: "77",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          filter: "name=Москва;code=77",
        },
      })
    })

    it("handles order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.list({
        order: { field: "code", direction: "asc" },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          order: "code,asc",
        },
      })
    })

    it("handles search parameter", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.list({
        search: "область",
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          search: "область",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request to get all regions", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.region.all()

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("handles filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.region.all({
        filter: {
          name: "край",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=край",
        }),
      })
    })
  })

  describe("first", () => {
    it("makes a request to get first region", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.first()

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("handles filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.first({
        filter: {
          name: "Москва",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "name=Москва",
        },
      })
    })

    it("handles order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.first({
        order: { field: "code", direction: "asc" },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "1",
          order: "code,asc",
        },
      })
    })
  })

  describe("get", () => {
    it("makes a request to get region by id", async () => {
      const fetchMock = createFetchMock()
      const regionId = "00000000-0000-0000-0000-000000000077"

      await moysklad.region.get(regionId)

      await expectFetch({
        fetchMock,
        url: `/entity/region/${regionId}`,
        method: "GET",
      })
    })

    it("handles expand options", async () => {
      const fetchMock = createFetchMock()
      const regionId = "00000000-0000-0000-0000-000000000077"

      await moysklad.region.get(regionId, {})

      await expectFetch({
        fetchMock,
        url: `/entity/region/${regionId}`,
        method: "GET",
      })
    })
  })

  describe("size", () => {
    it("makes a request to get regions count", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.size()

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "0",
        },
      })
    })

    it("handles filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.region.size({
        filter: {
          name: "область",
        },
      })

      await expectFetch({
        fetchMock,
        url: "/entity/region",
        method: "GET",
        searchParameters: {
          limit: "0",
          filter: "name=область",
        },
      })
    })
  })
})

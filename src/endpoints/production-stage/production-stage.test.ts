import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"

describe("productionStage", () => {
  describe("list", () => {
    it("makes a request with required filter", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.list({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.list({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        pagination: {
          limit: 5,
          offset: 10,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          limit: "5",
          offset: "10",
        },
      })
    })

    it("makes a request with multiple filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.list({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
          stage: "5427bc76-b95f-11eb-0a80-04bb000cd584",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          filter:
            "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583;stage=5427bc76-b95f-11eb-0a80-04bb000cd584",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.list({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        expand: {
          stage: true,
          productionRow: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          expand: "stage,productionRow",
          limit: expect.any(String),
        },
      })
    })

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.list({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        order: { field: "orderingPosition", direction: "asc" },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          order: "orderingPosition,asc",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request with required filter", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.productionStage.all({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter and expand options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.productionStage.all({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        expand: {
          stage: true,
          productionRow: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          expand: "stage,productionRow",
        }),
      })
    })
  })

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStage.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/productionstage/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStage.get(id, {
        expand: {
          stage: true,
          productionRow: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstage/${id}`,
        method: "GET",
        searchParameters: {
          expand: "stage,productionRow",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        labourUnitCost: 100,
        processingUnitCost: 200,
      }

      await moysklad.productionStage.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/productionstage/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        labourUnitCost: 100,
        processingUnitCost: 200,
      }

      await moysklad.productionStage.update(id, data, {
        expand: {
          stage: true,
          productionRow: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstage/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "stage,productionRow",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("first", () => {
    it("makes a request with required filter", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.first({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })
    })

    it("makes a request with filter and expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.first({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
        expand: {
          stage: true,
          productionRow: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          expand: "stage,productionRow",
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request with required filter", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.size({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583",
          limit: "0",
        }),
      })
    })

    it("makes a request with multiple filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStage.size({
        filter: {
          productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583",
          stage: "5427bc76-b95f-11eb-0a80-04bb000cd584",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstage",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter:
            "productionTask=5427bc76-b95f-11eb-0a80-04bb000cd583;stage=5427bc76-b95f-11eb-0a80-04bb000cd584",
          limit: "0",
        }),
      })
    })
  })
})

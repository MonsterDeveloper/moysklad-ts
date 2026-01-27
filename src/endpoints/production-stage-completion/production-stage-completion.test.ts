import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity } from "../../types/entity"
import { MediaType } from "../../types/media-type"

describe("productionStageCompletion", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.list()

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.list({
        filter: {
          moment: "2023-01-01",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: {
          filter: "moment=2023-01-01",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.list({
        expand: {
          group: true,
          owner: true,
          performer: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: {
          expand: "group,owner,performer",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.productionStageCompletion.all()

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: expect.any(String),
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.productionStageCompletion.all({
        filter: {
          moment: "2023-01-01",
        },
        expand: {
          group: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "moment=2023-01-01",
          expand: "group",
        }),
      })
    })
  })

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.first()

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.first({
        filter: {
          moment: "2023-01-01",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "moment=2023-01-01",
        },
      })
    })
  })

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${id}`,
        method: "GET",
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion.get(id, {
        expand: {
          group: true,
          owner: true,
          performer: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${id}`,
        method: "GET",
        searchParameters: {
          expand: "group,owner,performer",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.size()

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.productionStageCompletion.size({
        filter: {
          moment: "2023-01-01",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "moment=2023-01-01",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Production Stage Completion",
        productionVolume: 100,
      }

      await moysklad.productionStageCompletion.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Updated Production Stage Completion",
        productionVolume: 100,
      }

      await moysklad.productionStageCompletion.update(id, data, {
        expand: {
          group: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "group",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock()
      const data = {
        productionStage: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProductionStage,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProductionStage,
          },
        },
        productionVolume: 100,
      } as const

      await moysklad.productionStageCompletion.create(data)

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = {
        productionStage: {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProductionStage,
                "5427bc76-b95f-11eb-0a80-04bb000cd583",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProductionStage,
          },
        },
        productionVolume: 100,
        name: "New Production Stage Completion",
      } as const

      await moysklad.productionStageCompletion.create(data, {
        expand: {
          group: true,
          owner: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "group,owner",
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

      await moysklad.productionStageCompletion.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: expect.stringContaining(
              `/entity/productionstagecompletion/${id}`,
            ),
            type: Entity.ProductionStageCompletion,
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
        // Create new production stage completion
        {
          productionStage: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.ProductionStage,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.ProductionStage,
            },
          },
          productionVolume: 100,
          name: "New Production Stage Completion",
        },
        // Update existing production stage completion
        {
          meta: {
            href: moysklad.client
              .buildUrl([
                "entity",
                Entity.ProductionStageCompletion,
                "5427bc76-b95f-11eb-0a80-04bb000cd584",
              ])
              .toString(),
            mediaType: MediaType.Json,
            type: Entity.ProductionStageCompletion,
          },
          productionVolume: 200,
        },
      ]

      await moysklad.productionStageCompletion.upsert(data as never)

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const data = [
        // Create new production stage completion
        {
          productionStage: {
            meta: {
              href: moysklad.client
                .buildUrl([
                  "entity",
                  Entity.ProductionStage,
                  "5427bc76-b95f-11eb-0a80-04bb000cd583",
                ])
                .toString(),
              mediaType: MediaType.Json,
              type: Entity.ProductionStage,
            },
          },
          productionVolume: 100,
          name: "New Production Stage Completion",
        },
      ]

      await moysklad.productionStageCompletion.upsert(data as never, {
        expand: {
          group: true,
          owner: true,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/productionstagecompletion",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "group,owner",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("materials.list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.list()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.list({
        expand: {
          assortment: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: {
          expand: "assortment",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("materials.create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        assortment: {
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
        consumedQuantity: 10,
      } as const

      await moysklad.productionStageCompletion[completionId].materials.create(
        data,
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "POST",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        assortment: {
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
        consumedQuantity: 10,
      } as const

      await moysklad.productionStageCompletion[completionId].materials.create(
        data,
        {
          expand: {
            assortment: true,
          },
        },
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "POST",
        body: data,
        searchParameters: {
          expand: "assortment",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("materials.update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const materialId = "5427bc76-b95f-11eb-0a80-04bb000cd584"
      const data = {
        consumedQuantity: 20,
      }

      await moysklad.productionStageCompletion[completionId].materials.update(
        materialId,
        data,
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials/${materialId}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const materialId = "5427bc76-b95f-11eb-0a80-04bb000cd584"
      const data = {
        consumedQuantity: 20,
      }

      await moysklad.productionStageCompletion[completionId].materials.update(
        materialId,
        data,
        {
          expand: {
            assortment: true,
          },
        },
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials/${materialId}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "assortment",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("materials.first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.first()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.first({
        expand: {
          assortment: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: {
          limit: "1",
          expand: "assortment",
        },
      })
    })
  })

  describe("materials.size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.size()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].materials.size({
        filter: {
          moment: "2025-01-01",
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/materials`,
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "moment=2025-01-01",
          limit: "0",
        }),
      })
    })
  })

  describe("results.list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.list()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
      })
    })

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.list({
        expand: {
          assortment: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: {
          expand: "assortment",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("products.update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const resultId = "5427bc76-b95f-11eb-0a80-04bb000cd584"
      const data = {
        producedQuantity: 20,
      }

      await moysklad.productionStageCompletion[completionId].products.update(
        resultId,
        data,
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products/${resultId}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const resultId = "5427bc76-b95f-11eb-0a80-04bb000cd584"
      const data = {
        producedQuantity: 20,
      }

      await moysklad.productionStageCompletion[completionId].products.update(
        resultId,
        data,
        {
          expand: {
            assortment: true,
          },
        },
      )

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products/${resultId}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "assortment",
          limit: expect.any(String),
        },
      })
    })
  })

  describe("products.first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.first()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.first({
        expand: {
          assortment: true,
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: {
          limit: "1",
          expand: "assortment",
        },
      })
    })
  })

  describe("products.size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.size()

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()
      const completionId = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.productionStageCompletion[completionId].products.size({
        filter: {
          moment: "2025-01-01",
        },
      })

      expectFetch({
        fetchMock,
        url: `/entity/productionstagecompletion/${completionId}/products`,
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "moment=2025-01-01",
          limit: "0",
        }),
      })
    })
  })
})

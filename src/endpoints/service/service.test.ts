import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity, MediaType } from "../../types"

describe("service", () => {
  it("lists services", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.list({ search: "delivery" })

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "GET",
      searchParameters: { search: "delivery" },
    })
  })

  it("gets all services", async () => {
    const fetchMock = createFetchMock(true)

    await moysklad.service.all({ filter: { archived: false } })

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "GET",
      searchParameters: {
        limit: "1000",
        offset: "0",
        filter: "archived=false",
      },
    })
  })

  it("gets the first service", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.first({ search: "delivery" })

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "GET",
      searchParameters: { limit: "1", search: "delivery" },
    })
  })

  it("gets the service count", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.size({ filter: { archived: false } })

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "GET",
      searchParameters: { limit: "0", filter: "archived=false" },
    })
  })

  it("gets a service by ID", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.get("service-id", { expand: { owner: true } })

    await expectFetch({
      fetchMock,
      url: "/entity/service/service-id",
      method: "GET",
      searchParameters: { expand: "owner", limit: "100" },
    })
  })

  it("creates a service with syncId", async () => {
    const fetchMock = createFetchMock()
    const data = { name: "Delivery", syncId: "catalog-service" }

    await moysklad.service.create(data)

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "POST",
      body: data,
    })
  })

  it("upserts a service with syncId", async () => {
    const fetchMock = createFetchMock()
    const data = { name: "Delivery", syncId: "catalog-service" }

    await moysklad.service.upsert(data)

    await expectFetch({
      fetchMock,
      url: "/entity/service",
      method: "POST",
      body: data,
    })
  })

  it("updates a service", async () => {
    const fetchMock = createFetchMock()
    const data = { name: "Express delivery" }

    await moysklad.service.update("service-id", data)

    await expectFetch({
      fetchMock,
      url: "/entity/service/service-id",
      method: "PUT",
      body: data,
    })
  })

  it("deletes a service", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.delete("service-id")

    await expectFetch({
      fetchMock,
      url: "/entity/service/service-id",
      method: "DELETE",
    })
  })

  it("deletes services in a batch", async () => {
    const fetchMock = createFetchMock()

    await moysklad.service.batchDelete(["first-id", "second-id"])

    await expectFetch({
      fetchMock,
      url: "/entity/service/delete",
      method: "POST",
      body: ["first-id", "second-id"].map((id) => ({
        meta: {
          href: `https://test-api.moysklad.ru/api/remap/1.2/entity/service/${id}`,
          type: Entity.Service,
          mediaType: MediaType.Json,
        },
      })),
    })
  })

  it("creates a product with syncId", async () => {
    const fetchMock = createFetchMock()
    const data = { name: "Coffee", syncId: "catalog-product" }

    await moysklad.product.create(data)

    await expectFetch({
      fetchMock,
      url: "/entity/product",
      method: "POST",
      body: data,
    })
  })

  it("gets shared catalog metadata through product", async () => {
    const fetchMock = createFetchMock()

    await moysklad.product.metadata()

    await expectFetch({
      fetchMock,
      url: "/entity/product/metadata",
      method: "GET",
    })
  })
})

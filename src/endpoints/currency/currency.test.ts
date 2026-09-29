import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"

describe("currency", () => {
  it("lists currencies", async () => {
    const fetchMock = createFetchMock()

    await moysklad.currency.list({ pagination: { limit: 25, offset: 5 } })

    await expectFetch({
      fetchMock,
      url: "/entity/currency",
      method: "GET",
      searchParameters: { limit: "25", offset: "5" },
    })
  })

  it("gets all currencies", async () => {
    const fetchMock = createFetchMock(true)

    await moysklad.currency.all({ search: "руб" })

    await expectFetch({
      fetchMock,
      url: "/entity/currency",
      method: "GET",
      searchParameters: { limit: "1000", offset: "0", search: "руб" },
    })
  })

  it("finds the first currency by ISO code", async () => {
    const fetchMock = createFetchMock()

    await moysklad.currency.first({
      filter: { isoCode: "EUR", archived: false },
    })

    await expectFetch({
      fetchMock,
      url: "/entity/currency",
      method: "GET",
      searchParameters: {
        limit: "1",
        filter: "isoCode=EUR;archived=false",
      },
    })
  })

  it("gets a currency by ID", async () => {
    const fetchMock = createFetchMock()

    await moysklad.currency.get("currency-id")

    await expectFetch({
      fetchMock,
      url: "/entity/currency/currency-id",
      method: "GET",
    })
  })

  it("gets the currency count", async () => {
    const fetchMock = createFetchMock()

    await moysklad.currency.size({ filter: { isoCode: "EUR" } })

    await expectFetch({
      fetchMock,
      url: "/entity/currency",
      method: "GET",
      searchParameters: { limit: "0", filter: "isoCode=EUR" },
    })
  })
})

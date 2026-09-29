import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"

describe("uom", () => {
  it("searches units", async () => {
    const fetchMock = createFetchMock()

    await moysklad.uom.list({ search: "упак" })

    await expectFetch({
      fetchMock,
      url: "/entity/uom",
      method: "GET",
      searchParameters: { search: "упак" },
    })
  })

  it("expands unit ownership", async () => {
    const fetchMock = createFetchMock()

    await moysklad.uom.get("uom-id", {
      expand: { owner: true, group: true },
    })

    await expectFetch({
      fetchMock,
      url: "/entity/uom/uom-id",
      method: "GET",
      searchParameters: {
        expand: "owner,group",
        limit: "100",
      },
    })
  })

  it("gets all units", async () => {
    const fetchMock = createFetchMock(true)

    await moysklad.uom.all({ filter: { shared: true } })

    await expectFetch({
      fetchMock,
      url: "/entity/uom",
      method: "GET",
      searchParameters: {
        limit: "1000",
        offset: "0",
        filter: "shared=true",
      },
    })
  })

  it("gets the first unit", async () => {
    const fetchMock = createFetchMock()

    await moysklad.uom.first({ search: "шт" })

    await expectFetch({
      fetchMock,
      url: "/entity/uom",
      method: "GET",
      searchParameters: { limit: "1", search: "шт" },
    })
  })

  it("gets the unit count", async () => {
    const fetchMock = createFetchMock()

    await moysklad.uom.size({ filter: { name: "шт" } })

    await expectFetch({
      fetchMock,
      url: "/entity/uom",
      method: "GET",
      searchParameters: { limit: "0", filter: "name=шт" },
    })
  })
})

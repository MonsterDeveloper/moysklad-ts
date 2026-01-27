import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"

describe("custom-entity", () => {
  describe("get", () => {
    it("makes a request to get a custom entity by id", async () => {
      const fetchMock = createFetchMock(true)
      const customEntityId = "12345-67890"

      await moysklad.customEntity.get(customEntityId)

      expectFetch({
        fetchMock,
        url: "/entity/customentity/" + customEntityId,
        method: "GET",
      })
    })
  })
})

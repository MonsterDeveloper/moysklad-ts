import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity, MediaType, type Meta } from "../../types"

const mockStore: Meta<Entity.Store> = {
  meta: {
    type: Entity.Store,
    href: "",
    mediaType: MediaType.Json,
    metadataHref: "",
  },
}

describe("wizard", () => {
  describe("salesreturn", () => {
    it("sends correct salesreturn request", async () => {
      const fetchMock = createFetchMock()

      const requestData = {
        store: mockStore,
        positions: [
          {
            assortment: {
              meta: {
                type: Entity.Product,
                href: "",
                mediaType: MediaType.Json,
                metadataHref: "",
              },
            } as const,
            quantity: 5,
          },
        ],
      }

      await moysklad.wizard.salesreturn({
        action: "evaluate_cost",
        ...requestData,
      })

      expectFetch({
        fetchMock,
        url: "/wizard/salesreturn",
        method: "POST",
        body: requestData,
        searchParameters: {
          action: "evaluate_cost",
        },
      })
    })
  })
})

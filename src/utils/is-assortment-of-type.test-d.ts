import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../test-utils"
import { Entity, type PositionStockData } from "../types"
import { isAssortmentOfType } from "./is-assortment-of-type"

describe("isAssortmentOfType types", () => {
  it("narrows an expanded demand assortment with position stock", async () => {
    const demand = await moysklad.demand.get("id", {
      fields: ["stock"],
      expand: { positions: { assortment: { product: true } } },
    })
    const position = demand.positions.rows[0]

    if (position) {
      expectTypeOf(position.stock).toEqualTypeOf<PositionStockData>()

      if (isAssortmentOfType(position.assortment, Entity.Variant)) {
        expectTypeOf(position.assortment.product.name).toBeString()
      }
    }
  })
})

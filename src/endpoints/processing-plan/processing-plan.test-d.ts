import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../../test-utils"
import { Entity } from "../../types"
import { isAssortmentOfType } from "../../utils"

describe("processingPlan types", () => {
  it("expands and narrows assortment members", async () => {
    const plans = await moysklad.processingPlan.all({
      expand: {
        products: { assortment: { product: true } },
        materials: { assortment: { product: true } },
      },
    })
    const productAssortment = plans.rows[0]?.products.rows[0]?.assortment
    const materialAssortment = plans.rows[0]?.materials.rows[0]?.assortment

    if (
      productAssortment &&
      isAssortmentOfType(productAssortment, Entity.Variant)
    ) {
      expectTypeOf(productAssortment.product.name).toBeString()
    }
    if (
      materialAssortment &&
      isAssortmentOfType(materialAssortment, Entity.Variant)
    ) {
      expectTypeOf(materialAssortment.product.name).toBeString()
    }
  })

  it("accepts attribute IDs alongside legacy URL keys", async () => {
    const legacyUrl = moysklad.client
      .buildUrl([
        "entity",
        Entity.ProcessingPlan,
        "metadata",
        "attributes",
        "legacy-id",
      ])
      .toString()

    await moysklad.processingPlan.list({
      filter: {
        [legacyUrl]: "legacy",
        attributes: {
          "attribute-id": { eq: ["1", "2"] },
        },
      },
    })
  })
})

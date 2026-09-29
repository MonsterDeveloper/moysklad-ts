import { describe, it } from "vitest"
import { moysklad } from "../../../test-utils"

describe("catalog creation types", () => {
  it("accepts create-only syncId for products and services", async () => {
    await moysklad.product.create({ name: "Coffee", syncId: "product-sync" })
    await moysklad.product.upsert({
      name: "Coffee",
      syncId: "product-sync",
    })
    await moysklad.service.create({
      name: "Delivery",
      syncId: "service-sync",
    })
    await moysklad.service.upsert({
      name: "Delivery",
      syncId: "service-sync",
    })

    // @ts-expect-error syncId cannot be updated
    await moysklad.service.update("service-id", { syncId: "new-sync" })
    // @ts-expect-error service has no trash route
    await moysklad.service.trash("service-id")
    // @ts-expect-error service metadata is shared with product
    await moysklad.service.metadata()
    await moysklad.product.metadata()
  })
})

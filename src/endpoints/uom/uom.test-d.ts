import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../../test-utils"
import type { Entity, Meta } from "../../types"

describe("uom types", () => {
  it("returns optional ownership for system units", async () => {
    const response = await moysklad.uom.list({ search: "упак" })

    expectTypeOf(response.rows[0]?.owner).toEqualTypeOf<
      Meta<Entity.Employee> | undefined
    >()
  })
})

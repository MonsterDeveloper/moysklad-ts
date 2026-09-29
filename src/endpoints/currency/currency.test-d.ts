import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../../test-utils"
import type { Currency } from "./types"

describe("currency types", () => {
  it("returns currencies filtered by ISO code", async () => {
    const response = await moysklad.currency.first({
      filter: { isoCode: "EUR", archived: false },
    })

    expectTypeOf(response.rows[0]).toEqualTypeOf<Currency>()
  })
})

import { describe, expect, it } from "vitest"
import { Entity } from "../types"
import { isAssortmentOfType } from "./is-assortment-of-type"

describe("isAssortmentOfType", () => {
  it.each([
    [Entity.Service, Entity.Product],
    [Entity.Product, Entity.Variant],
    [Entity.Variant, Entity.Bundle],
    [Entity.Bundle, Entity.Service],
    [Entity.Consignment, Entity.Service],
  ] as const)("correctly identifies %s assortment type", (correctEntity, incorrectEntity) => {
    expect(
      isAssortmentOfType(
        {
          meta: {
            type: correctEntity,
          },
        } as never,
        correctEntity,
      ),
    ).toBe(true)

    expect(
      isAssortmentOfType(
        {
          meta: {
            type: incorrectEntity,
          },
        } as never,
        correctEntity,
      ),
    ).toBe(false)
  })

  it("returns false for invalid type", () => {
    expect(
      isAssortmentOfType(
        { meta: { type: "InvalidType" } } as never,
        Entity.Service,
      ),
    ).toBe(false)
  })
})

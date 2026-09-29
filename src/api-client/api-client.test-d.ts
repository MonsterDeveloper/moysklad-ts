import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../test-utils"
import { Entity } from "../types"

describe("ApiClient types", () => {
  it("preserves the entity literal in composed metadata", () => {
    const store = moysklad.client.composeMeta(Entity.Store, "store-id")

    expectTypeOf(store.meta.type).toEqualTypeOf<Entity.Store>()

    // @ts-expect-error nested resources are not supported
    moysklad.client.composeMeta(Entity.Account, "account-id")
  })
})

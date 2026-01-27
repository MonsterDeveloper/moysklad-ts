import type { IsEmptyObject } from "type-fest"
import { describe, expectTypeOf, it } from "vitest"
import type { Entity } from "./entity"
import type { MediaType } from "./media-type"
import type { Meta } from "./metadata"
import type {
  GetModelCreatableFields,
  GetModelRequiredCreateFields,
  GetModelUpdatableFields,
  Model,
} from "./model"

describe("model", () => {
  describe("GetModelUpdatableFields", () => {
    it("should return an empty object if the model has no updatable fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
        }
      }

      expectTypeOf<
        IsEmptyObject<GetModelUpdatableFields<TestModel>>
      >().toEqualTypeOf<true>()
    })

    it("should return model's updatable fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
          readonly accountId: string
          meta: unknown
          name: string
          moment: string
        }
      }

      expectTypeOf<GetModelUpdatableFields<TestModel>>().toEqualTypeOf<{
        name?: string
        moment?: string
      }>()
    })

    it("should return model's updatable fields with nullable fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
          readonly accountId: string
          name?: string
          moment?: string
        }
      }

      expectTypeOf<GetModelUpdatableFields<TestModel>>().toEqualTypeOf<{
        name?: string | null
        moment?: string | null
      }>()
    })

    it("should return model's updatable fields with UpdateMeta", () => {
      interface TestModel extends Model {
        object: {
          agent: Meta<Entity.Counterparty>
        }
      }

      expectTypeOf<GetModelUpdatableFields<TestModel>>().toEqualTypeOf<{
        agent?: {
          meta: {
            type: Entity.Counterparty
            href: string
            mediaType: MediaType
          }
        }
      }>()
    })

    it("should return model's updatable fields with nullable UpdateMeta", () => {
      interface TestModel extends Model {
        object: {
          agent?: Meta<Entity.Counterparty>
        }
      }

      expectTypeOf<GetModelUpdatableFields<TestModel>>().toEqualTypeOf<{
        agent?: {
          meta: {
            type: Entity.Counterparty
            href: string
            mediaType: MediaType
          }
        } | null
      }>()
    })
  })

  describe("GetModelRequiredCreateFields", () => {
    it("should return an empty object if the model has no required create fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
        }
      }

      expectTypeOf<
        IsEmptyObject<GetModelRequiredCreateFields<TestModel>>
      >().toEqualTypeOf<true>()
    })

    it("should return model's required create fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
          readonly accountId: string
          meta: unknown
          name: string
          moment?: string
        }
        requiredCreateFields: "name" | "moment"
      }

      expectTypeOf<GetModelRequiredCreateFields<TestModel>>().toEqualTypeOf<{
        name: string
        moment: string
      }>()
    })

    it("should return model's required create fields with UpdateMeta", () => {
      interface TestModel extends Model {
        object: {
          agent: Meta<Entity.Counterparty>
        }
        requiredCreateFields: "agent"
      }

      expectTypeOf<GetModelRequiredCreateFields<TestModel>>().toEqualTypeOf<{
        agent: {
          meta: {
            type: Entity.Counterparty
            href: string
            mediaType: MediaType
          }
        }
      }>()
    })
  })

  describe("GetModelCreatableFields", () => {
    it("should return an empty object if the model has no creatable fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
        }
      }
      expectTypeOf<
        IsEmptyObject<GetModelCreatableFields<TestModel>>
      >().toEqualTypeOf<true>()
    })

    it("should return model's creatable fields", () => {
      interface TestModel extends Model {
        object: {
          readonly id: string
          readonly accountId: string
          meta: unknown
          name: string
          moment?: string
        }
        requiredCreateFields: "name"
      }

      expectTypeOf<GetModelCreatableFields<TestModel>>().toMatchTypeOf<{
        name: string
        moment?: string | null
      }>()
    })
  })
})

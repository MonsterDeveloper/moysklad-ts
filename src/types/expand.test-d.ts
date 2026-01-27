import type { EmptyObject } from "type-fest"
import { describe, expectTypeOf, it } from "vitest"
import type {
  ExpandOptions,
  Model,
  RestoreExpandableFieldsOptionality,
} from "."

interface NonExpandableModel extends Model {
  expandalbe: EmptyObject
}

describe("expand", () => {
  describe("ExpandOptions", () => {
    it("should be never if a model has no expandable fields", () => {
      expectTypeOf<ExpandOptions<Model>>().toBeNever()

      expectTypeOf<ExpandOptions<NonExpandableModel>>().toBeNever()
    })

    it("should return an object with boolean values if expandable model has no nested expandable fields", () => {
      interface ExpandableModel extends Model {
        expandable: {
          foo: Model
          bar: Model
        }
      }

      expectTypeOf<ExpandOptions<ExpandableModel>>().toEqualTypeOf<{
        foo?: boolean
        bar?: boolean
      }>()
    })

    it("should return an object with boolean values if expandable model has nested expandable fields", () => {
      interface ExpandableModel extends Model {
        expandable: {
          baz: NonExpandableModel
        }
      }

      interface NestedExpandableModel extends Model {
        expandable: {
          foo: NonExpandableModel
          bar: ExpandableModel
        }
      }

      expectTypeOf<ExpandOptions<NestedExpandableModel>>().toEqualTypeOf<{
        foo?: boolean
        bar?: boolean | { baz?: boolean }
      }>()
    })
  })

  describe("RestoreExpandableFieldsOptionality", () => {
    it("should return the same type if it's empty", () => {
      expectTypeOf<
        RestoreExpandableFieldsOptionality<NonExpandableModel, EmptyObject>
      >().toEqualTypeOf<EmptyObject>()
    })

    it("should return the same type if the model has no optional keys", () => {
      interface ExpandableModel extends Model {
        object: {
          agent: { meta: unknown }
        }
        expandable: {
          agent: Model
        }
      }
      interface SomeObject {
        agent: { meta: unknown }
      }

      expectTypeOf<
        RestoreExpandableFieldsOptionality<ExpandableModel, SomeObject>
      >().toEqualTypeOf<SomeObject>()
    })

    it("should make optional fields that are optional in the model", () => {
      interface ExpandableModel extends Model {
        object: {
          agent?: { meta: unknown }
          group?: { meta: unknown }
          foo: unknown
        }
        expandable: {
          agent: Model
          group: Model
        }
      }

      expectTypeOf<
        RestoreExpandableFieldsOptionality<
          ExpandableModel,
          {
            agent: { meta: unknown }
          }
        >
      >().toEqualTypeOf<{
        agent?: { meta: unknown }
      }>()
    })
  })
})

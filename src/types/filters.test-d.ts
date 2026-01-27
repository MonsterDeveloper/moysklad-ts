/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: testing types */
/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: testing types */

import type { EmptyObject } from "type-fest"
import { assertType, describe, expectTypeOf, it } from "vitest"
import type {
  ArchivedFilter,
  BooleanFilter,
  EnumFilter,
  EqualityFilter,
  FilterOptions,
  IdFilter,
  NumberFilter,
  StringFilter,
} from "./filters"
import type { Model } from "./model"

describe("filters", () => {
  describe("EqualityFilter", () => {
    const equalityFilter = (
      filter: Record<string, Partial<EqualityFilter<string>>>,
    ) => {}

    it("should throw an error if equality and inequality filters are used together", () => {
      assertType(
        equalityFilter({
          name: {
            // @ts-expect-error wrong types
            eq: "test",
            ne: "test",
            gt: "test",
            gte: "test",
            lt: "test",
            lte: "test",
          },
        }),
      )
    })

    it("should allow usage of equals filter", () => {
      assertType(equalityFilter({ name: { eq: "test" } }))
    })

    it("should allow usage of not equals filter", () => {
      assertType(equalityFilter({ name: { ne: "test" } }))
    })

    it("should allow usage of is null filter", () => {
      assertType(equalityFilter({ name: { isNull: true } }))
    })

    it("should allow usage of is not null filter", () => {
      assertType(equalityFilter({ name: { isNotNull: true } }))
    })

    it("should throw an error if is null and is not null filters are used together", () => {
      assertType(
        equalityFilter({
          name: {
            // @ts-expect-error wrong types
            isNull: true,
            isNotNull: true,
          },
        }),
      )
    })
  })

  describe("IdFilter", () => {
    const idFilter = (filter: Record<string, IdFilter>) => {}

    it("should accept a string", () => {
      assertType(idFilter({ id: "test" }))
    })

    it("should accept an array of strings", () => {
      assertType(idFilter({ id: ["test"] }))
    })

    it("should accept equals filter", () => {
      assertType(idFilter({ id: { eq: "test" } }))
    })

    it("should accept not equals filter", () => {
      assertType(idFilter({ id: { ne: "test" } }))
    })

    it("should accept is null filter", () => {
      assertType(idFilter({ id: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(idFilter({ id: { isNotNull: true } }))
    })
  })

  describe("EnumFilter", () => {
    enum TestEnum {
      Value1 = "value1",
      Value2 = "value2",
    }

    const enumFilter = (filter: Record<string, EnumFilter<TestEnum>>) => {}

    it("should accept a string", () => {
      assertType(enumFilter({ name: TestEnum.Value1 }))
    })

    it("should accept an array of strings", () => {
      assertType(enumFilter({ name: [TestEnum.Value1] }))
    })

    it("should accept equals filter", () => {
      assertType(enumFilter({ name: { eq: TestEnum.Value2 } }))
    })

    it("should accept not equals filter", () => {
      assertType(enumFilter({ name: { ne: TestEnum.Value2 } }))
    })

    it("should accept is null filter", () => {
      assertType(enumFilter({ name: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(enumFilter({ name: { isNotNull: true } }))
    })
  })

  describe("BooleanFilter", () => {
    const booleanFilter = (filter: Record<string, BooleanFilter>) => {}

    it("should accept a boolean", () => {
      assertType(booleanFilter({ archived: true }))
    })

    it("should accept equals filter", () => {
      assertType(booleanFilter({ archived: { eq: true } }))
    })

    it("should accept not equals filter", () => {
      assertType(booleanFilter({ archived: { ne: true } }))
    })

    it("should accept is null filter", () => {
      assertType(booleanFilter({ archived: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(booleanFilter({ archived: { isNotNull: true } }))
    })
  })

  describe("ArchivedFilter", () => {
    const archivedFilter = (filter: Record<string, ArchivedFilter>) => {}

    it("should accept a boolean", () => {
      assertType(archivedFilter({ archived: true }))
      assertType(archivedFilter({ archived: false }))
    })

    it("should accept equals filter", () => {
      assertType(archivedFilter({ archived: { eq: true } }))
    })

    it("should accept not equals filter", () => {
      assertType(archivedFilter({ archived: { ne: true } }))
    })

    it("should accept is null filter", () => {
      assertType(archivedFilter({ archived: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(archivedFilter({ archived: { isNotNull: true } }))
    })

    it("should accept [true, false] array", () => {
      assertType(archivedFilter({ archived: [true, false] }))
    })

    it("should accept [false, true] array", () => {
      assertType(archivedFilter({ archived: [false, true] }))
    })

    it("should reject invalid array lengths", () => {
      assertType(
        // @ts-expect-error wrong array length
        archivedFilter({ archived: [true] }),
      )
      assertType(
        // @ts-expect-error wrong array length
        archivedFilter({ archived: [true, false, true] }),
      )
    })

    it("should reject non-boolean array values", () => {
      assertType(
        // @ts-expect-error wrong array value types
        archivedFilter({ archived: [1, 2] }),
      )
      assertType(
        // @ts-expect-error wrong array value types
        archivedFilter({ archived: ["true", "false"] }),
      )
    })
  })

  describe("NumberFilter", () => {
    const numberFilter = (filter: Record<string, NumberFilter>) => {}

    it("should accept a number", () => {
      assertType(numberFilter({ quantity: 1 }))
    })

    it("should accept equals filter", () => {
      assertType(numberFilter({ quantity: { eq: 1 } }))
    })

    it("should accept not equals filter", () => {
      assertType(numberFilter({ quantity: { ne: 1 } }))
    })

    it("should accept is null filter", () => {
      assertType(numberFilter({ quantity: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(numberFilter({ quantity: { isNotNull: true } }))
    })

    it("should accept greater than filter", () => {
      assertType(numberFilter({ quantity: { gt: 1 } }))
    })

    it("should accept greater or equals filter", () => {
      assertType(numberFilter({ quantity: { gte: 1 } }))
    })

    it("should accept less than filter", () => {
      assertType(numberFilter({ quantity: { lt: 1 } }))
    })

    it("should accept less or equals filter", () => {
      assertType(numberFilter({ quantity: { lte: 1 } }))
    })

    it("should accept greater than and less than filters", () => {
      assertType(numberFilter({ quantity: { gt: 1, lt: 2 } }))
    })
  })

  describe("StringFilter", () => {
    const stringFilter = (filter: Record<string, StringFilter>) => {}

    it("should accept a string", () => {
      assertType(stringFilter({ name: "test" }))
    })

    it("should accept equals filter", () => {
      assertType(stringFilter({ name: { eq: "test" } }))
    })

    it("should accept not equals filter", () => {
      assertType(stringFilter({ name: { ne: "test" } }))
    })

    it("should accept is null filter", () => {
      assertType(stringFilter({ name: { isNull: true } }))
    })

    it("should accept is not null filter", () => {
      assertType(stringFilter({ name: { isNotNull: true } }))
    })

    it("should accept like filter", () => {
      assertType(stringFilter({ name: { like: "test" } }))
    })

    it("should accept starts with filter", () => {
      assertType(stringFilter({ name: { sw: "test" } }))
    })

    it("should accept ends with filter", () => {
      assertType(stringFilter({ name: { ew: "test" } }))
    })
  })

  describe("FilterOptions", () => {
    it("should return never if a model has no filters", () => {
      interface TestModel extends Model {
        filters: EmptyObject
      }

      expectTypeOf<FilterOptions<TestModel>>().toBeNever()
    })

    it("should return available filters for a model", () => {
      interface TestModel extends Model {
        filters: {
          id: IdFilter
          name: StringFilter
          quantity: NumberFilter
          archived: BooleanFilter
        }
      }

      expectTypeOf<FilterOptions<TestModel>>().toEqualTypeOf<{
        id?: IdFilter
        name?: StringFilter
        quantity?: NumberFilter
        archived?: BooleanFilter
      }>()
    })
  })
})

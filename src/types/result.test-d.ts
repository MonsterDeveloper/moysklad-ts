import type { EmptyObject, Simplify, SimplifyDeep } from "type-fest"
import { describe, expectTypeOf, it } from "vitest"
import type { PositionStockData } from "."
import type { Entity } from "./entity"
import type { ListMeta, Meta } from "./metadata"
import type { Model } from "./model"
import type { GetFindResult, IncludeFields } from "./result"

describe("result", () => {
  describe("IncludeFields", () => {
    it("should return the result if fields are undefined", () => {
      interface SampleModel extends Model {
        object: {
          name: string
        }
      }
      expectTypeOf<
        IncludeFields<SampleModel["object"], SampleModel, undefined>
      >().toEqualTypeOf<SampleModel["object"]>
    })

    it("should return the result if fields are empty", () => {
      interface SampleModel extends Model {
        object: {
          name: string
        }
      }
      expectTypeOf<
        IncludeFields<SampleModel["object"], SampleModel, []>
      >().toEqualTypeOf<SampleModel["object"]>()
    })

    it("should return the result if fields contain stock", () => {
      interface SampleModel extends Model {
        object: {
          name: string
          stock?: undefined
        }
      }

      expectTypeOf<
        Simplify<IncludeFields<SampleModel["object"], SampleModel, ["stock"]>>
      >().toEqualTypeOf<{
        name: string
        stock: PositionStockData
      }>()
    })
  })
  describe("GetFindResult", () => {
    it("should return model's obejct if expand is not defined", () => {
      interface SampleModel extends Model {
        object: {
          name: string
        }
      }
      expectTypeOf<GetFindResult<SampleModel, undefined>>().toEqualTypeOf<
        SampleModel["object"]
      >()
    })

    it("should return model's obejct if expand is empty object", () => {
      interface SampleModel extends Model {
        object: {
          name: string
        }
      }
      expectTypeOf<GetFindResult<SampleModel, EmptyObject>>().toEqualTypeOf<
        SampleModel["object"]
      >()
    })

    it("should preserve optionality of expandable fields", () => {
      interface RootModel extends Model {
        object: {
          agent?: Meta<Entity.Counterparty>
          name: string
        }
        expandable: {
          agent: Model
        }
      }

      expectTypeOf<
        Simplify<GetFindResult<RootModel, { agent: true }>>
      >().toEqualTypeOf<{
        agent?: object
        name: string
      }>()
    })

    it("should handle 1 level expand", () => {
      interface AgentModel extends Model {
        object: {
          agentName: string
        }
      }

      interface GroupModel extends Model {
        object: {
          groupName: string
        }
      }

      interface EmployeeModel extends Model {
        object: {
          employeeName: string
        }
      }

      interface RootModel extends Model {
        object: {
          agents: ListMeta<Entity.Counterparty>
          groups: Meta<Entity.Group>[]
          employee: Meta<Entity.Employee>
        }
        expandable: {
          agents: AgentModel
          groups: GroupModel
          employee: EmployeeModel
        }
      }

      expectTypeOf<
        Simplify<
          GetFindResult<
            RootModel,
            { agents: true; groups: true; employee: true }
          >
        >
      >().toEqualTypeOf<{
        agents: ListMeta<Entity.Counterparty> & {
          rows: AgentModel["object"][]
        }
        groups: GroupModel["object"][]
        employee: EmployeeModel["object"]
      }>()
    })

    it("should handle nested expand", () => {
      interface GroupModel extends Model {
        object: {
          groupName: string
        }
      }

      interface AgentModel extends Model {
        object: {
          agentName: string
          group: Meta<Entity.Group>
        }
        expandable: {
          group: GroupModel
        }
      }

      interface RootModel extends Model {
        object: {
          agent: Meta<Entity.Counterparty>
        }
        expandable: {
          agent: AgentModel
        }
      }

      expectTypeOf<
        SimplifyDeep<GetFindResult<RootModel, { agent: { group: true } }>>
      >().toEqualTypeOf<{
        agent: {
          agentName: string
          group: {
            groupName: string
          }
        }
      }>()
    })

    it("should handle position fields", () => {
      interface DemandPosition {
        quantity: number
        stock?: undefined
      }
      interface DemandPositionModel extends Model {
        object: DemandPosition
      }
      interface DemandModel extends Model {
        object: {
          positions: ListMeta<Entity.DemandPosition>
        }
        expandable: {
          positions: DemandPositionModel
        }
      }

      type Result = GetFindResult<
        DemandModel,
        { positions: true },
        ["stock"]
      >["positions"]["rows"][number]
      expectTypeOf<Simplify<Result>>().toEqualTypeOf<{
        quantity: number
        stock: PositionStockData
      }>()
    })

    it("should handle nested expand with position fields", () => {
      interface AssortmentModel extends Model {
        object: {
          assortmentName: string
        }
      }

      interface DemandPosition {
        quantity: number
        assortment: Meta<Entity.Assortment>
        stock?: undefined
      }
      interface DemandPositionModel extends Model {
        object: DemandPosition
        expandable: {
          assortment: AssortmentModel
        }
      }
      interface DemandModel extends Model {
        object: {
          positions: ListMeta<Entity.DemandPosition>
        }
        expandable: {
          positions: DemandPositionModel
        }
      }

      type NestedResult = GetFindResult<
        DemandModel,
        { positions: { assortment: true } },
        ["stock"]
      >["positions"]["rows"][number]

      expectTypeOf<Simplify<NestedResult>>().toEqualTypeOf<{
        quantity: number
        assortment: AssortmentModel["object"]
        stock: PositionStockData
      }>()
    })

    it("should keep stock undefined when fields are not provided in nested expand", () => {
      interface AssortmentModel extends Model {
        object: {
          assortmentName: string
        }
      }

      interface DemandPosition {
        quantity: number
        assortment: Meta<Entity.Assortment>
        stock?: undefined
      }
      interface DemandPositionModel extends Model {
        object: DemandPosition
        expandable: {
          assortment: AssortmentModel
        }
      }
      interface DemandModel extends Model {
        object: {
          positions: ListMeta<Entity.DemandPosition>
        }
        expandable: {
          positions: DemandPositionModel
        }
      }

      type NestedResultNoStock = GetFindResult<
        DemandModel,
        { positions: { assortment: true } }
      >["positions"]["rows"][number]

      expectTypeOf<Simplify<NestedResultNoStock>>().toEqualTypeOf<{
        quantity: number
        assortment: AssortmentModel["object"]
        stock?: undefined
      }>()
    })
  })
})

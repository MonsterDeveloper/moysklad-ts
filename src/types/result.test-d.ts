import { describe, expectTypeOf, it } from "vitest";
import type { GetFindResult, IncludeFields } from "./result";
import type { Model } from "./model";
import type { EmptyObject, Simplify } from "type-fest";
import type { ListMeta, Meta } from "./metadata";
import type { Entity } from "./entity";
import type { SimplifyDeep } from "type-fest/source/merge-deep";
import type { PositionStockData } from ".";

describe("result", () => {
  describe("IncludeFields", () => {
    it("should return the result if fields are undefined", () => {
      interface SampleModel extends Model {
        object: {
          name: string;
        };
      }
      expectTypeOf<
        IncludeFields<SampleModel["object"], SampleModel, undefined>
      >().toEqualTypeOf<SampleModel["object"]>;
    });

    it("should return the result if fields are empty", () => {
      interface SampleModel extends Model {
        object: {
          name: string;
        };
      }
      expectTypeOf<
        IncludeFields<SampleModel["object"], SampleModel, []>
      >().toEqualTypeOf<SampleModel["object"]>();
    });

    it("should return the result if fields contain stock", () => {
      interface SampleModel extends Model {
        object: {
          name: string;
          stock?: undefined;
        };
      }

      expectTypeOf<
        Simplify<IncludeFields<SampleModel["object"], SampleModel, ["stock"]>>
      >().toEqualTypeOf<{
        name: string;
        stock: PositionStockData;
      }>();
    });
  });
  describe("GetFindResult", () => {
    it("should return model's obejct if expand is not defined", () => {
      interface SampleModel extends Model {
        object: {
          name: string;
        };
      }
      expectTypeOf<GetFindResult<SampleModel, undefined>>().toEqualTypeOf<
        SampleModel["object"]
      >();
    });

    it("should return model's obejct if expand is empty object", () => {
      interface SampleModel extends Model {
        object: {
          name: string;
        };
      }
      expectTypeOf<GetFindResult<SampleModel, EmptyObject>>().toEqualTypeOf<
        SampleModel["object"]
      >();
    });

    it("should preserve optionality of expandable fields", () => {
      interface RootModel extends Model {
        object: {
          agent?: Meta<Entity.Counterparty>;
          name: string;
        };
        expandable: {
          agent: Model;
        };
      }

      expectTypeOf<
        Simplify<GetFindResult<RootModel, { agent: true }>>
      >().toEqualTypeOf<{
        agent?: object;
        name: string;
      }>();
    });

    it("should handle 1 level expand", () => {
      interface AgentModel extends Model {
        object: {
          agentName: string;
        };
      }

      interface GroupModel extends Model {
        object: {
          groupName: string;
        };
      }

      interface EmployeeModel extends Model {
        object: {
          employeeName: string;
        };
      }

      interface RootModel extends Model {
        object: {
          agents: ListMeta<Entity.Counterparty>;
          groups: Meta<Entity.Group>[];
          employee: Meta<Entity.Employee>;
        };
        expandable: {
          agents: AgentModel;
          groups: GroupModel;
          employee: EmployeeModel;
        };
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
          rows: AgentModel["object"][];
        };
        groups: GroupModel["object"][];
        employee: EmployeeModel["object"];
      }>();
    });

    it("should handle nested expand", () => {
      interface GroupModel extends Model {
        object: {
          groupName: string;
        };
      }

      interface AgentModel extends Model {
        object: {
          agentName: string;
          group: Meta<Entity.Group>;
        };
        expandable: {
          group: GroupModel;
        };
      }

      interface RootModel extends Model {
        object: {
          agent: Meta<Entity.Counterparty>;
        };
        expandable: {
          agent: AgentModel;
        };
      }

      expectTypeOf<
        SimplifyDeep<GetFindResult<RootModel, { agent: { group: true } }>>
      >().toEqualTypeOf<{
        agent: {
          agentName: string;
          group: {
            groupName: string;
          };
        };
      }>();
    });

    it("should handle position fields", () => {
      interface DemandPosition {
        quantity: number;
        stock?: undefined;
      }
      interface DemandPositionModel extends Model {
        object: DemandPosition;
      }
      interface DemandModel extends Model {
        object: {
          positions: ListMeta<Entity.DemandPosition>;
        };
        expandable: {
          positions: DemandPositionModel;
        };
      }

      type Result = GetFindResult<
        DemandModel,
        { positions: true },
        ["stock"]
      >["positions"]["rows"][number];
      expectTypeOf<Simplify<Result>>().toEqualTypeOf<{
        quantity: number;
        stock: PositionStockData;
      }>();
    });
  });
});

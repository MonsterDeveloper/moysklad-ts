import { describe, expectTypeOf, it } from "vitest";
import type { GetFindResult } from "./result";
import type { Model } from "./model";
import type { EmptyObject, Simplify } from "type-fest";
import type { ListMeta, Meta } from "./metadata";
import type { Entity } from "./entity";
import type { SimplifyDeep } from "type-fest/source/merge-deep";

describe("result", () => {
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
  });
});

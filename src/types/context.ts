import type { Meta } from "./metadata";
import type { Entity } from "./entity";

export interface Context {
  employee: Meta<Entity.Employee>;
}

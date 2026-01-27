import type { Entity } from "./entity"
import type { Meta } from "./metadata"

export interface Context {
  employee: Meta<Entity.Employee>
}

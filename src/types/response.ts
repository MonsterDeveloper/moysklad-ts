import type { ListMeta } from "."
import type { Context } from "./context"
import type { Entity } from "./entity"

export interface ListResponse<T, E extends Entity> extends ListMeta<E> {
  context: Context
  rows: T[]
}

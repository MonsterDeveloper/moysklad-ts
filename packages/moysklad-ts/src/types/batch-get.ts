import type { Entity } from "./entity";
import type { ListResponse } from "./response";

export type BatchGetResult<T, E extends Entity> = Pick<
  ListResponse<T, E>,
  "rows" | "context"
>;

export interface BatchGetOptions {
  limit?: number;
  expandLimit?: number;
  concurrencyLimit?: number;
}

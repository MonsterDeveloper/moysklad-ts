import type { Entity } from "./entity";
import type { ListResponse } from "./response";

export type BatchGetResult<T, E extends Entity> = Pick<
  ListResponse<T, E>,
  "rows" | "context"
>;

export interface BatchGetOptions {
  /** Limit query parameter for 1 request */
  limit?: number;
  /** Limit query param for 1 request with `expand` */
  expandLimit?: number;
  /** Limit of concurrent requests */
  concurrencyLimit?: number;
}

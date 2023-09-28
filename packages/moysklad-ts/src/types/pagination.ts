/**
 * Options for pagination.
 */
export interface PaginationOptions {
  /**
   * The maximum number of items to return in a single page. Min 1, max 1000.
   * @default 1000
   */
  limit?: number;
  /**
   * The number of items to skip before starting to collect the result set.
   * @default 0
   */
  offset?: number;
}

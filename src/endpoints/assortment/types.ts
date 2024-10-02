import type { EqualityFilter, PaginationOptions } from "../../types";

export interface ListAssortmentOptions {
  /** Получить вместе с сериями. */
  groupBy?: "consignment";

  filter?: {
    barcode?: EqualityFilter<string> | string | string[];
  };

  pagination?: PaginationOptions;
}

export type AllAssortmentOptions = Omit<ListAssortmentOptions, "pagination">;
export type FirstAssortmentOptions = Omit<ListAssortmentOptions, "pagination">;

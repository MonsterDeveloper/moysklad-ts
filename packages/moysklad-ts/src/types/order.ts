import type { Model } from "./model";

export interface OrderObject<T extends string> {
  field: T;
  direction: "asc" | "desc";
}

export type OrderOption<T extends string> = OrderObject<T> | T;

export type OrderOptions<M extends Model> = M["orderable"] extends string
  ? OrderOption<M["orderable"]> | OrderOption<M["orderable"]>[]
  : never;

import type { Payload } from "./payload";

export interface OrderObject<T extends string> {
  field: T;
  direction: "asc" | "desc";
}

export type OrderOption<T extends string> = OrderObject<T> | T;

export type OrderOptions<P extends Payload> = P["orderable"] extends string
  ? OrderOption<P["orderable"]> | OrderOption<P["orderable"]>[]
  : never;

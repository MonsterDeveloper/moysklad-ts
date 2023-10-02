import type {
  HasOptionalKeys,
  IsEmptyObject,
  OptionalKeysOf,
  SetOptional,
} from "type-fest";
import type { Payload } from "./payload";

export type ExpandOptions<T extends Payload> = IsEmptyObject<
  T["expandable"]
> extends false
  ? {
      [key in keyof T["expandable"]]?: T["expandable"][key] extends Payload
        ? boolean | ExpandOptions<T["expandable"][key]>
        : never;
    }
  : never;

/**
 * Given a payload `P` and a type `T`, make fields in `T` optional based on their optionality in `P["object"]`.
 */
export type RestoreExpandableFieldsOptionality<
  P extends Payload,
  T,
> = IsEmptyObject<T> extends true
  ? T
  : HasOptionalKeys<P["object"]> extends true
  ? SetOptional<T, Extract<OptionalKeysOf<P["object"]>, keyof T>>
  : T;

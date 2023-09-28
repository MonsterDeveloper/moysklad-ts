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

export type IsExpandableFieldOptional<
  P extends Payload,
  K,
> = K extends keyof P["object"]
  ? K extends OptionalKeysOf<P["object"]>
    ? true
    : false
  : never;

export type SetExpandableFieldsOptional<
  P extends Payload,
  T,
> = IsEmptyObject<T> extends true
  ? T
  : HasOptionalKeys<P["object"]> extends true
  ? OptionalKeysOf<P["object"]> extends keyof T
    ? SetOptional<T, OptionalKeysOf<P["object"]>>
    : T
  : T;

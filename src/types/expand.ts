import type {
  HasOptionalKeys,
  IsEmptyObject,
  OptionalKeysOf,
  SetOptional,
} from "type-fest";
import type { Model } from "./model";

// prettier-ignore
/**
 * Given a model `M`, get an option for `expand` query parameter.
 */
export type ExpandOptions<M extends Model> = IsEmptyObject<
  M["expandable"]
> extends false
  ? {
      [key in keyof M["expandable"]]?: M["expandable"][key] extends Model
        ? boolean | ExpandOptions<M["expandable"][key]>
        : never;
    }
  : never;

// prettier-ignore
/**
 * Given a model `M` and some type `T`, make fields in `T` optional based on their optionality in model's object.
 */
export type RestoreExpandableFieldsOptionality<
  M extends Model,
  T,
> = IsEmptyObject<T> extends true
  ? T
  : HasOptionalKeys<M["object"]> extends true
    ? SetOptional<T, Extract<OptionalKeysOf<M["object"]>, keyof T>>
    : T;

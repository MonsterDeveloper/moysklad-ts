import type { IsEmptyObject, Primitive } from "type-fest";
import type { DateTime } from "./datetime";
import type { Model } from "./model";

export interface EqualsFilter<T extends Primitive> {
  eq: T | T[];
  ne: never;
  gt: never;
  gte: never;
  lt: never;
  lte: never;
}

export interface IsNullFilter {
  isNull: boolean;
  isNotNull: never;
  eq: never;
  ne: never;
}

export interface IsNotNullFilter {
  isNotNull: boolean;
}

export interface NotEqualsFilter<T extends Primitive> {
  ne: T | T[];
}

export interface GreaterThanFilter<T extends Primitive> {
  gt: T;
}

export interface GreaterOrEqualsFilter<T extends Primitive> {
  gte: T;
}

export interface LessThanFilter<T extends Primitive> {
  lt: T;
}

export interface LessOrEqualsFilter<T extends Primitive> {
  lte: T;
}

export interface LikeFilter {
  like: string;
}

export interface StartsWithFilter {
  sw: string;
}

export interface EndsWithFilter {
  ew: string;
}

/**
 * A type that is used to ensure that equality and inequality filters are not used together.
 */
export type EqualityFilter<T extends Primitive> =
  | EqualsFilter<T>
  | NotEqualsFilter<T>
  | IsNullFilter
  | IsNotNullFilter;

export type IdFilter = Partial<EqualityFilter<string>> | string | string[];

export type BooleanFilter = Partial<EqualityFilter<boolean>> | boolean;

export type NumberFilter =
  | Partial<
      EqualityFilter<number> &
        GreaterThanFilter<number> &
        GreaterOrEqualsFilter<number> &
        LessThanFilter<number> &
        LessOrEqualsFilter<number>
    >
  | number
  | number[];

export type StringFilter =
  | Partial<
      EqualityFilter<string> & LikeFilter & StartsWithFilter & EndsWithFilter
    >
  | string
  | string[];

export type DateTimeFilter =
  | Partial<
      EqualityFilter<DateTime> &
        GreaterThanFilter<DateTime> &
        GreaterOrEqualsFilter<DateTime> &
        LessThanFilter<DateTime> &
        LessOrEqualsFilter<DateTime>
    >
  | DateTime
  | DateTime[];

export type Filter =
  | IdFilter
  | BooleanFilter
  | NumberFilter
  | StringFilter
  | DateTimeFilter;

export type FilterOptions<M extends Model> = IsEmptyObject<
  M["filters"]
> extends true
  ? never
  : Partial<M["filters"]>;

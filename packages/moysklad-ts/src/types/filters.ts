import type { IsEmptyObject, Primitive } from "type-fest";
import type { DateTime } from "./datetime";
import type { Model } from "./model";

export interface EqualsFilter<T extends Primitive> {
  eq: T | T[];
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

export interface IsNullFilter {
  isNull: boolean;
}

export interface IsNotNullFilter {
  isNotNull: boolean;
}

export interface LikeFilter {
  like: string;
}

export interface LeftLikeFilter {
  llike: string;
}

export interface RightLikeFilter {
  rlike: string;
}

export type IdFilter =
  | Partial<EqualsFilter<string> & NotEqualsFilter<string>>
  | string
  | string[];

export type BooleanFilter =
  | Partial<EqualsFilter<boolean> & NotEqualsFilter<boolean>>
  | boolean
  | boolean[];

export type NumberFilter =
  | Partial<
      IsNullFilter &
        IsNotNullFilter &
        EqualsFilter<number> &
        NotEqualsFilter<number> &
        GreaterThanFilter<number> &
        GreaterOrEqualsFilter<number> &
        LessThanFilter<number> &
        LessOrEqualsFilter<number>
    >
  | number
  | number[];

export type StringFilter =
  | Partial<
      IsNullFilter &
        IsNotNullFilter &
        EqualsFilter<string> &
        NotEqualsFilter<string> &
        LikeFilter &
        LeftLikeFilter &
        RightLikeFilter
    >
  | string
  | string[];

export type DateTimeFilter =
  | Partial<
      IsNullFilter &
        IsNotNullFilter &
        EqualsFilter<DateTime> &
        NotEqualsFilter<DateTime> &
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

import type { IsEmptyObject, IsNever, Primitive } from "type-fest"
import type { DateTime } from "./datetime"
import type { Model } from "./model"

export interface EqualsFilter<T extends Primitive> {
  /** Равно (`=`) */
  eq: T | T[]
  ne: never
  gt: never
  gte: never
  lt: never
  lte: never
}

export interface IsNullFilter {
  isNull: boolean
  isNotNull: never
  eq: never
  ne: never
}

export interface IsNotNullFilter {
  /** Не пустое */
  isNotNull: boolean
}

export interface NotEqualsFilter<T extends Primitive> {
  /** Не равно (`!=`) */
  ne: T | T[]
}

export interface GreaterThanFilter<T extends Primitive> {
  /** Больше (`>`) */
  gt: T
}

export interface GreaterOrEqualsFilter<T extends Primitive> {
  /** Больше либо равно (`>=`) */
  gte: T
}

export interface LessThanFilter<T extends Primitive> {
  /** Меньше (`<`) */
  lt: T
}

export interface LessOrEqualsFilter<T extends Primitive> {
  /** Меньше либо равно (`<=`) */
  lte: T
}

export interface LikeFilter {
  /** Содержит (`~`) */
  like: string
}

export interface StartsWithFilter {
  /** Начинается с (`~=`) */
  sw: string
}

export interface EndsWithFilter {
  /** Заканчивается на (`=~`) */
  ew: string
}

/**
 * A type that is used to ensure that equality and inequality filters are not used together.
 */
export type EqualityFilter<T extends Primitive> =
  | EqualsFilter<T>
  | NotEqualsFilter<T>
  | IsNullFilter
  | IsNotNullFilter

export type IdFilter = Partial<EqualityFilter<string>> | string | string[]

export type EnumFilter<T extends Primitive> =
  | Partial<EqualityFilter<T>>
  | T
  | T[]

export type BooleanFilter = Partial<EqualityFilter<boolean>> | boolean

/**
 * Archived filter that supports boolean values, boolean filter operators,
 * and an array of both [true, false] to include both archived and non-archived items.
 */
export type ArchivedFilter = BooleanFilter | [boolean, boolean]

export type NumberFilter =
  | Partial<
      EqualityFilter<number> &
        GreaterThanFilter<number> &
        GreaterOrEqualsFilter<number> &
        LessThanFilter<number> &
        LessOrEqualsFilter<number>
    >
  | number
  | number[]

export type StringFilter =
  | Partial<
      EqualityFilter<string> & LikeFilter & StartsWithFilter & EndsWithFilter
    >
  | string
  | string[]

export type DateTimeFilter =
  | Partial<
      EqualityFilter<DateTime> &
        GreaterThanFilter<DateTime> &
        GreaterOrEqualsFilter<DateTime> &
        LessThanFilter<DateTime> &
        LessOrEqualsFilter<DateTime>
    >
  | DateTime
  | DateTime[]

export type Filter =
  | IdFilter
  | BooleanFilter
  | ArchivedFilter
  | NumberFilter
  | StringFilter
  | DateTimeFilter

type AddAttributesFilters<
  M extends Model,
  F,
> = "attributes" extends keyof M["object"]
  ? IsNever<F> extends false
    ? F & { [attributeUrl: string]: Filter }
    : { [attributeUrl: string]: Filter }
  : F

type GetFiltersForModel<M extends Model> =
  IsEmptyObject<M["filters"]> extends true ? never : Partial<M["filters"]>

export type FilterOptions<M extends Model> = AddAttributesFilters<
  M,
  GetFiltersForModel<M>
>

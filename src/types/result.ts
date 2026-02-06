import type { ConditionalKeys, IsEmptyObject, IsEqual } from "type-fest"
import type { RestoreExpandableFieldsOptionality } from "./expand"
import type { ListMeta } from "./metadata"
import type { Model } from "./model"
import type { PositionFields, PositionStockData } from "./position-fields"

// TODO finish & format
export type IncludeFields<
  Result,
  M extends Model,
  F extends PositionFields | undefined,
> = F extends PositionFields
  ? F[number] extends "stock"
    ? "stock" extends keyof M["object"]
      ? Omit<Result, "stock"> & { stock: PositionStockData }
      : Result
    : Result
  : Result

export type GetFindResult<
  M extends Model,
  E,
  F extends PositionFields | undefined = undefined,
> =
  // biome-ignore lint/suspicious/noExplicitAny: we need to check for any
  IsEqual<E, any> extends true // ❔ Is expand not defined ..
    ? // 🚫 return default.
      IncludeFields<M["object"], M, F>
    : // ❔ Is expand empty object ..
      IsEmptyObject<E> extends true
      ? // 🚫 return default.
        IncludeFields<M["object"], M, F>
      : // ❔ Is expand not empty object ..
        E extends object
        ? // ✅ Expand is defined ..
          RestoreExpandableFieldsOptionality<
            M,
            {
              // ℹ️ only map through truthy values (explicitly expanded fields)
              [K in keyof E as E[K] extends false | undefined
                ? never
                : K]: // ❔ Can the expanded field to be expanded ..
              K extends keyof M["expandable"]
                ? // ❔ Does the entity contain expanded field ..
                  K extends keyof M["object"]
                  ? // ❔ Does the expanded field contain a description of the model ..
                    M["expandable"][K] extends Model
                    ? // ❔ Is the expand nested ..
                      E[K] extends object
                      ? // ℹ️ expand option is an object
                        // ⤵️ Recursively falling into a nested expand.
                        M["object"][K] extends ListMeta<infer O>
                        ? ListMeta<O> & {
                            rows: GetFindResult<M["expandable"][K], E[K], F>[]
                          }
                        : GetFindResult<M["expandable"][K], E[K], F>
                      : // ℹ️ expand option is `true`
                        // ❔ Is the entity field a list ..
                        M["object"][K] extends ListMeta<infer O>
                        ? // ✅ Expand list field.
                          ListMeta<O> & {
                            rows: IncludeFields<
                              M["expandable"][K]["object"],
                              M["expandable"][K],
                              F
                            >[]
                          }
                        : // ❔ Is the entity field an array ..
                          NonNullable<M["object"][K]> extends unknown[]
                          ? // ✅ Expand array field.
                            M["expandable"][K]["object"][]
                          : // ✅ Expand reference field.
                            M["expandable"][K]["object"]
                    : // 🚫 expanded field has't model info
                      never
                  : // 🚫 expanded field has't model info
                    never
                : // 🚫 there is no expanded field in the model
                  never
            }
          > &
            // ℹ️ Merge other model fields except expanded fields
            IncludeFields<
              Omit<M["object"], ConditionalKeys<E, true | object>>,
              M,
              F
            >
        : // 🚫 expand not defined
          IncludeFields<M["object"], M, F>

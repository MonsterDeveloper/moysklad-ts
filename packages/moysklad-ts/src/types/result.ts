import type { IsEqual, ConditionalKeys, IsEmptyObject } from "type-fest";
import type { Model } from "./model";
import type { RestoreExpandableFieldsOptionality } from "./expand";
import type { ListMeta } from "./metadata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetFindResult<M extends Model, E> = IsEqual<E, any> extends true
  ? M["object"]
  : IsEmptyObject<E> extends true
  ? M["object"]
  : E extends object
  ? RestoreExpandableFieldsOptionality<
      M,
      {
        // only map through truthy values
        [K in keyof E as E[K] extends false | undefined
          ? never
          : K]: K extends keyof M["expandable"] // dummy checks
          ? K extends keyof M["object"]
            ? M["expandable"][K] extends Model
              ? E[K] extends object
                ? // expand option is an object (nested expand)
                  GetFindResult<M["expandable"][K], E[K]>
                : // expand option is `true`
                M["object"][K] extends ListMeta<infer O>
                ? // expandable field is a ListMeta
                  ListMeta<O> & { rows: M["expandable"][K]["object"][] }
                : NonNullable<M["object"][K]> extends Array<unknown>
                ? // expandable field is an array
                  M["expandable"][K]["object"][]
                : M["expandable"][K]["object"]
              : never
            : never
          : never;
      }
    > &
      // exclude expanded properties from original model's object
      Omit<M["object"], ConditionalKeys<E, true | object>>
  : M["object"];

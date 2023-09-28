import type { IsEqual, ConditionalKeys, IsEmptyObject } from "type-fest";
import type { Payload } from "./payload";
import type { SetExpandableFieldsOptional } from "./expand";
import type { ListMeta } from "./metadata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetFindResult<P extends Payload, E> = IsEqual<E, any> extends true
  ? P["object"]
  : IsEmptyObject<E> extends true
  ? P["object"]
  : E extends object
  ? SetExpandableFieldsOptional<
      P,
      {
        // only map through truthy values
        [K in keyof E as E[K] extends false | undefined
          ? never
          : K]: K extends keyof P["expandable"] // dummy checks
          ? K extends keyof P["object"]
            ? P["expandable"][K] extends Payload
              ? E[K] extends object
                ? // expand option is an object
                  // GetFindResult<P["expandable"][K], E[K]>
                  // TODO add nested expand
                  "object - todo"
                : // expand option is `true`
                P["object"][K] extends ListMeta<infer O>
                ? // expandable field is a ListMeta
                  ListMeta<O> & { rows: P["expandable"][K]["object"][] }
                : NonNullable<P["object"][K]> extends Array<unknown>
                ? P["expandable"][K]["object"][]
                : P["expandable"][K]["object"]
              : never
            : never
          : never;
      }
    > &
      // exclude expanded properties from original payload
      Omit<P["object"], ConditionalKeys<E, true | object>>
  : P["object"];

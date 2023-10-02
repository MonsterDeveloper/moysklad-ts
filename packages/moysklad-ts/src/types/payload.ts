import type { WritableKeysOf } from "type-fest";
import type { UpdateMeta, Meta } from "./metadata";

export interface Payload<T extends object = object> {
  object: T;
  expandable: {
    // in theory, it should be Payload | Payload[] | null instead of unknown
    // but if we do that TypeScript will attempt to compare types recursively
    [ObjectName in string]?: unknown;
  };
  orderable?: string;
}

export type GetPayloadUpdatableFields<T extends Payload> = {
  // extract non-readonly fields from payload's object and replace Meta with UpdateMeta
  [Key in Exclude<
    WritableKeysOf<T["object"]>,
    "meta"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  >]?: Meta<any> extends T["object"][Key]
    ? undefined extends T["object"][Key]
      ? UpdateMeta | null
      : UpdateMeta
    : // if key is optional, make it accept null
    undefined extends T["object"][Key]
    ? T["object"][Key] | null
    : T["object"][Key];
};

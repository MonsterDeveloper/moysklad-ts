/* eslint-disable @typescript-eslint/no-explicit-any */
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
  creatable?: string;
}

// prettier-ignore
/**
 * Extract the updatable fields from a payload's object and replace the Meta with UpdateMeta.
 */
export type GetPayloadUpdatableFields<T extends Payload> = {
  // itarate over non-readonly fields in payload's object, excluding some Moysklad-specific readonly fields
  [Key in Exclude<WritableKeysOf<T["object"]>,"meta" | "id" | "accountId">]?:

    // value is a Meta object?
    Meta<any> extends T["object"][Key]
      // key is optional?
      ? undefined extends T["object"][Key]
        // make it nullable
        ? UpdateMeta | null
        : UpdateMeta

    // key is optional?
    : undefined extends T["object"][Key]
      // make it nullable
      ? T["object"][Key] | null
      : T["object"][Key];
};

// prettier-ignore
/**
 * Get the required fields for creating a new object from a payload.
 */
export type GetPayloadRequiredCreateFields<T extends Payload> = {
  // iterate over creatable fields in payload's object, while making them required
  [Key in Extract<T["creatable"], keyof T["object"]>]-?:
    // value is a Meta object?
    Meta<any> extends T["object"][Key]
      // replace it with UpdateMeta
      ? UpdateMeta
      : T["object"][Key];
};

// prettier-ignore
/**
 * Get the fields for creating a new object from a payload.
 */
export type GetPayloadCreatableFields<
  T extends Payload,
  R = GetPayloadRequiredCreateFields<T>,
> =
  // required create fields + updatable fields excluding the required ones
  R & Omit<GetPayloadUpdatableFields<T>, keyof R>;

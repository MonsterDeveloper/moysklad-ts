/* eslint-disable @typescript-eslint/no-explicit-any */
import type { WritableKeysOf } from "type-fest";
import type { UpdateMeta, Meta } from "./metadata";

export interface Model<T extends object = object> {
  object: T;
  expandable: {
    // in theory, it should be Model instead of unknown
    // but if we do that TypeScript will attempt to compare types recursively
    [ObjectName in string]?: unknown;
  };
  orderable?: string;
  creatable?: string;
}

// prettier-ignore
/**
 * Extract the updatable fields from a model's object and replace the Meta with UpdateMeta.
 */
export type GetModelUpdatableFields<M extends Model> = {
  // itarate over non-readonly fields in model's object, excluding some Moysklad-specific readonly fields
  [Key in Exclude<WritableKeysOf<M["object"]>,"meta" | "id" | "accountId">]?:

    // value is a Meta object?
    Meta<any> extends M["object"][Key]
      // key is optional?
      ? undefined extends M["object"][Key]
        // make it nullable
        ? UpdateMeta | null
        : UpdateMeta

      // key is optional?
      : undefined extends M["object"][Key]
        // make it nullable
        ? M["object"][Key] | null
        : M["object"][Key];
};

// prettier-ignore
/**
 * Given model M, get the required fields for creating a new object.
 */
export type GetModelRequiredCreateFields<M extends Model> = {
  // iterate over creatable fields in model's object, while making them required
  [Key in Extract<M["creatable"], keyof M["object"]>]-?:
    // value is a Meta object?
    Meta<any> extends M["object"][Key]
      // replace it with UpdateMeta
      ? UpdateMeta
      : M["object"][Key];
};

// prettier-ignore
/**
 * Given model M, get the fields for creating a new object.
 */
export type GetModelCreatableFields<
  M extends Model,
  R = GetModelRequiredCreateFields<M>,
> =
  // required create fields + updatable fields excluding the required ones
  R & Omit<GetModelUpdatableFields<M>, keyof R>;

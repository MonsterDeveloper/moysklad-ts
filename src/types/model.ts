/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReadonlyKeysOf } from "type-fest";
import type { UpdateMeta, Meta, Metadata, ListMeta } from "./metadata";
import type { Filter } from "./filters";
import type { Attribute } from "./attribute";
import type { Entity } from "./entity";

export interface Model<T extends object = object> {
  object: T;
  expandable: {
    // in theory, it should be Model instead of unknown
    // but if we do that TypeScript will attempt to compare types recursively
    [ObjectName in string]?: unknown;
  };
  filters: Record<string, Filter>;
  orderableFields?: string;
  requiredCreateFields?: string;
}

// prettier-ignore
/**
 * Extract the updatable fields from a model's object and replace the Meta with UpdateMeta.
 */
export type GetModelUpdatableFields<M extends Model> = {
  // itarate over non-readonly fields in model's object, excluding some Moysklad-specific readonly fields
  [Key in keyof M["object"] as Exclude<Key, ReadonlyKeysOf<M["object"]> | "meta" | "id" | "accountId">]?:

    // value is a Meta array?
    M["object"][Key] extends ListMeta<infer T>
      // Model supports expand on this field?
      ? Key extends keyof M["expandable"]
        ? M["expandable"][Key] extends Model
          // Recursively get the updatable fields of the expanded model
          ? GetModelUpdatableFields<M["expandable"][Key]>[]
          : never
      // Model does not support expand on this field
      : UpdateMeta<T>[]

    // value is a Meta object?
    : M["object"][Key] extends Meta<infer T>
      ? UpdateMeta<T> 
    // key is optional?
    : M["object"][Key] extends Meta<infer T> | undefined
      // make it nullable
      ? UpdateMeta<T> | null
    
    // value is an Attribute array?
    : Attribute[] extends M["object"][Key]
      ? (UpdateMeta<Entity.AttributeMetadata> & Pick<Attribute, "value">)[]

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
  [Key in Extract<M["requiredCreateFields"], keyof M["object"]>]-?:
    // value is a Meta object?
    M["object"][Key] extends Meta<infer T> 
      // replace it with UpdateMeta
      ? UpdateMeta<T>
      : NonNullable<M["object"][Key]>;
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

// prettier-ignore
/**
 * Data for creating or batch updating a model.
 */
export type ModelCreateOrUpdateData<M extends Model> =
  // Object has a meta field?
  "meta" extends keyof M["object"]
    // Meta is a Meta object?
    ? M["object"]["meta"] extends Metadata<infer T>
      ?
        // Create object or an array of create/update objects
          | GetModelCreatableFields<M>
          | Array<
              | GetModelCreatableFields<M>
              | (GetModelUpdatableFields<M> & UpdateMeta<T>)
            >
      : never
    : never;

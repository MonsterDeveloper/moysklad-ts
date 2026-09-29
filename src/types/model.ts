import type { ReadonlyKeysOf } from "type-fest"
import type { Attribute } from "./attribute"
import type { Entity } from "./entity"
import type { Filter } from "./filters"
import type {
  ListMeta,
  Meta,
  Metadata,
  UpdateMeta,
  UpdateMetadata,
} from "./metadata"

export interface Model<T extends object = object> {
  object: T
  expandable: {
    // in theory, it should be Model instead of unknown
    // but if we do that TypeScript will attempt to compare types recursively
    [ObjectName in string]?: unknown
  }
  filters: Record<string, Filter>
  orderableFields?: string
  requiredCreateFields?: string
}

/**
 * Подготавливает значение модели для отправки в запросе.
 *
 * Рекурсивно заменяет полные метаданные ссылок сокращёнными метаданными,
 * которые принимает API в запросах. Объекты, массивы и объединения типов
 * сохраняют остальные поля без изменений.
 */
export type ToUpdatable<T> =
  T extends Metadata<infer E>
    ? Metadata<E> | UpdateMetadata<E>
    : T extends ReadonlyArray<infer Item>
      ? ToUpdatable<Item>[]
      : T extends object
        ? { [Key in keyof T]: ToUpdatable<T[Key]> }
        : T

/**
 * Extract the updatable fields from a model's object and replace the Meta with UpdateMeta.
 */
export type GetModelUpdatableFields<M extends Model> = {
  // itarate over non-readonly fields in model's object, excluding some Moysklad-specific readonly fields
  [Key in keyof M["object"] as Exclude<
    Key,
    ReadonlyKeysOf<M["object"]> | "meta" | "id" | "accountId"
  >]?: M["object"][Key] extends ListMeta<infer T>
    ? // Model supports expand on this field?
      Key extends keyof M["expandable"]
      ? M["expandable"][Key] extends Model
        ? // Recursively get the updatable fields of the expanded model
            | { rows: GetModelUpdatableFields<M["expandable"][Key]>[] }
            | GetModelUpdatableFields<M["expandable"][Key]>[]
        : never
      : // Model does not support expand on this field
        UpdateMeta<T>[]
    : // value is a Meta object?
      M["object"][Key] extends Meta<infer T>
      ? Meta<T> | UpdateMeta<T>
      : // key is optional?
        M["object"][Key] extends Meta<infer T> | undefined
        ? // make it nullable
          Meta<T> | UpdateMeta<T> | null
        : // value is an array?
          NonNullable<M["object"][Key]> extends Array<infer T>
          ? // value is an Attribute array?
            T extends Attribute
            ? (UpdateMeta<Entity.AttributeMetadata> &
                Pick<Attribute, "value">)[]
            : ToUpdatable<NonNullable<M["object"][Key]>>
          : // key is optional?
            undefined extends M["object"][Key]
            ? // make it nullable
              ToUpdatable<Exclude<M["object"][Key], undefined>> | null
            : ToUpdatable<M["object"][Key]>
}

/**
 * Given model M, get the required fields for creating a new object.
 */
export type GetModelRequiredCreateFields<M extends Model> = {
  // iterate over creatable fields in model's object, while making them required
  [Key in Extract<
    M["requiredCreateFields"],
    keyof M["object"]
  >]-?: // value is a Meta object?
  ToUpdatable<NonNullable<M["object"][Key]>>
}

/**
 * Given model M, get the fields for creating a new object.
 */
export type GetModelCreatableFields<
  M extends Model,
  R = GetModelRequiredCreateFields<M>,
> = R & Omit<GetModelUpdatableFields<M>, keyof R> // required create fields + updatable fields excluding the required ones

/**
 * Data for creating or batch updating a model.
 */
export type ModelCreateOrUpdateData<
  M extends Model,
  AdditionalCreateFields extends object = object,
> =
  // Object has a meta field?
  "meta" extends keyof M["object"]
    ? // Meta is a Meta object?
      M["object"]["meta"] extends Metadata<infer T>
      ? // Create object or an array of create/update objects
          | (GetModelCreatableFields<M> & AdditionalCreateFields)
          | Array<
              | (GetModelCreatableFields<M> & AdditionalCreateFields)
              | (GetModelUpdatableFields<M> & UpdateMeta<T>)
            >
      : never
    : never

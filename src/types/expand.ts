import type {
  HasOptionalKeys,
  IsEmptyObject,
  OptionalKeysOf,
  SetOptional,
} from "type-fest"
import type { Model } from "./model"

type ExpandOptionsForModel<M extends Model> =
  IsEmptyObject<M["expandable"]> extends false
    ? {
        [key in keyof M["expandable"]]?: M["expandable"][key] extends Model
          ? boolean | ExpandOptions<M["expandable"][key]>
          : never
      }
    : never

/**
 * Возвращает опции `expand` для модели.
 *
 * Для объединения моделей тип распределяется по каждому варианту. Благодаря
 * этому вложенный `expand` принимает поля, доступные хотя бы одному варианту
 * ассортимента.
 */
export type ExpandOptions<M extends Model> = M extends unknown
  ? ExpandOptionsForModel<M>
  : never

/**
 * Given a model `M` and some type `T`, make fields in `T` optional based on their optionality in model's object.
 */
export type RestoreExpandableFieldsOptionality<M extends Model, T> =
  IsEmptyObject<T> extends true
    ? T
    : HasOptionalKeys<M["object"]> extends true
      ? SetOptional<T, Extract<OptionalKeysOf<M["object"]>, keyof T>>
      : T

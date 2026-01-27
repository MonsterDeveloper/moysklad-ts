import type { Entity } from "./entity"
import type { Meta } from "./metadata"
import type { Idable } from "./mixins"
import type { Model } from "./model"

/**
 * Статус
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-statusy-dokumentow
 */
export interface State extends Idable, Meta<Entity.State> {
  /** ID учетной записи */
  readonly accountId: string

  /** Название статуса */
  name: string

  /** Цвет статуса */
  color: number

  /** Тип статуса */
  stateType: "Regular" | "Successful" | "Unsuccessful"

  /** Тип сущности */
  entityType: string
}

/**
 * Модель статуса
 *
 * {@linkcode State}
 */
export interface StateModel extends Model {
  object: State
}

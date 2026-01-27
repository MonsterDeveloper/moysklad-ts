import type { Attribute } from "./attribute"
import type { DateTime } from "./datetime"
import type { Entity } from "./entity"
import type {
  BooleanFilter,
  DateTimeFilter,
  IdFilter,
  StringFilter,
} from "./filters"
import type { Meta } from "./metadata"
import type { Idable } from "./mixins"
import type { Model } from "./model"

/**
 * Склад
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sklad
 */
export interface Store extends Idable, Meta<Entity.Store> {
  /** ID учетной записи */
  readonly accountId: string

  /** Адрес склада */
  address?: string

  /** Адрес склада с детализацией по отдельным полям */
  addressFull?: {
    /** Другое */
    addInfo?: string
    /** Квартира */
    apartment?: string
    /** Город */
    city?: string
    /** Комментарий */
    comment?: string
    /** Метаданные страны */
    country?: Meta<Entity.Country>
    /** Дом */
    house?: string
    /** Почтовый индекс */
    postalCode?: string
    /** Метаданные региона */
    region?: Meta<Entity.Region>
    /** Улица */
    street?: string
  }

  /** Добавлен ли склад в архив */
  archived: boolean

  /** Массив метаданных дополнительных полей склада */
  attributes?: Attribute[]

  /** Код склада */
  code?: string

  /** Комментарий к складу */
  description?: string

  /** Внешний код склада */
  externalCode: string

  /** Метаданные отдела сотрудника */
  group: Meta<Entity.Group>

  /** Наименование склада */
  name: string

  /** Метаданные владельца (Сотрудника) */
  owner?: Meta<Entity.Employee>

  /** Метаданные родительского склада (Группы) */
  parent?: Meta<Entity.Store>

  /** Группа склада */
  pathName: string

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления склада */
  readonly updated: DateTime
}

/**
 * Модель склада
 *
 * {@linkcode Store}
 */
export interface StoreModel extends Model {
  object: Store
  filters: {
    id: IdFilter
    accountId: IdFilter
    address: StringFilter
    archived: BooleanFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    name: StringFilter
    owner: IdFilter
    parent: IdFilter
    pathName: StringFilter
    shared: BooleanFilter
    updated: DateTimeFilter
  }
}

import type { EmptyObject } from "type-fest"
import type {
  DateTime,
  DateTimeFilter,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"

/**
 * Регион
 *
 * Справочник регионов России для использования в адресах.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region
 */
export interface Region extends Idable, Meta<Entity.Region> {
  /** ID учетной записи */
  readonly accountId: string

  /** Код Региона */
  code?: string

  /** Внешний код Региона */
  externalCode: string

  /** Наименование Региона */
  name: string

  /** Момент последнего обновления сущности */
  readonly updated: DateTime

  /** Версия сущности */
  readonly version: number
}

/**
 * Модель для работы с регионами
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region
 */
export interface RegionModel extends Model {
  object: Region
  expandable: EmptyObject
  filters: {
    /** ID в формате UUID */
    id: IdFilter
    /** ID учетной записи */
    accountId: IdFilter
    /** Код Региона */
    code: StringFilter
    /** Внешний код Региона */
    externalCode: StringFilter
    /** Наименование Региона */
    name: StringFilter
    /** Момент последнего обновления сущности */
    updated: DateTimeFilter
  }
  orderableFields:
    | "id"
    | "code"
    | "externalCode"
    | "name"
    | "updated"
    | "version"
  requiredCreateFields: never // Read-only entity
}

/**
 * Опции для получения списка регионов
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-poluchit-regiony
 */
export interface ListRegionsOptions {
  /** Параметры пагинации */
  pagination?: PaginationOptions
  /** Параметры раскрытия вложенных сущностей */
  expand?: ExpandOptions<RegionModel>
  /** Параметры сортировки */
  order?: OrderOptions<RegionModel>
  /** Строка поиска */
  search?: string
  /** Параметры фильтрации */
  filter?: FilterOptions<RegionModel>
}

/**
 * Опции для получения региона по ID
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-region
 */
export interface GetRegionOptions {
  /** Параметры раскрытия вложенных сущностей */
  expand?: ExpandOptions<RegionModel>
}

/** Опции для получения первого региона из списка */
export type FirstRegionOptions = Omit<ListRegionsOptions, "pagination">

/** Опции для получения всех регионов */
export type AllRegionsOptions = Omit<ListRegionsOptions, "pagination">

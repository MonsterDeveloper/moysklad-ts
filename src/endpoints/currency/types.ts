import type { EmptyObject } from "type-fest"
import type {
  ArchivedFilter,
  BooleanFilter,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"

/** Род существительного в формах единиц валюты. */
export type CurrencyUnitGender = "masculine" | "feminine"

/** Формы единицы целой или дробной части валюты. */
export interface CurrencyUnitForms {
  /** Род существительного */
  gender: CurrencyUnitGender
  /** Форма для числительного 1 */
  s1: string
  /** Форма для числительного 2 */
  s2: string
  /** Форма для числительного 5 */
  s5: string
}

/** Способ обновления курса валюты: автоматический или ручной. */
export type CurrencyRateUpdateType = "auto" | "manual"

/**
 * Валюта.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-valuta
 */
export interface Currency extends Idable, Meta<Entity.Currency> {
  /** ID учетной записи, если API вернул его */
  readonly accountId?: string
  /** Добавлена ли валюта в архив */
  archived: boolean
  /** Цифровой код валюты */
  code: string
  /** Является ли валюта валютой учёта */
  readonly default: boolean
  /** Полное наименование валюты */
  fullName?: string
  /** Используется ли обратный курс */
  indirect: boolean
  /** Буквенный ISO-код валюты */
  isoCode: string
  /** Формы единиц целой части */
  majorUnit: CurrencyUnitForms
  /** Наценка при автоматическом обновлении курса */
  margin: number
  /** Формы единиц дробной части */
  minorUnit: CurrencyUnitForms
  /** Кратность курса */
  multiplicity: number
  /** Краткое наименование валюты */
  name: string
  /** Курс валюты */
  rate: number
  /** Способ обновления курса */
  readonly rateUpdateType: CurrencyRateUpdateType
  /** Основана ли валюта на системном справочнике */
  readonly system?: boolean
}

/** Модель валюты. */
export interface CurrencyModel extends Model {
  object: Currency
  expandable: EmptyObject
  filters: {
    id: IdFilter
    archived: ArchivedFilter
    code: StringFilter
    default: BooleanFilter
    fullName: StringFilter
    isoCode: StringFilter
    multiplicity: NumberFilter
    name: StringFilter
  }
  orderableFields:
    | "id"
    | "archived"
    | "code"
    | "default"
    | "fullName"
    | "isoCode"
    | "multiplicity"
    | "name"
}

/** Опции списка валют. */
export interface ListCurrenciesOptions {
  /** Опции пагинации */
  pagination?: PaginationOptions
  /** Валюта не содержит раскрываемых полей */
  expand?: ExpandOptions<CurrencyModel>
  /** Опции сортировки */
  order?: OrderOptions<CurrencyModel>
  /** Строка контекстного поиска */
  search?: string
  /** Опции фильтрации */
  filter?: FilterOptions<CurrencyModel>
}

/** Опции получения всех валют. */
export type AllCurrenciesOptions = Omit<ListCurrenciesOptions, "pagination">

/** Опции получения первой валюты. */
export type FirstCurrencyOptions = Omit<ListCurrenciesOptions, "pagination">

/** Опции получения валюты по ID. */
export interface GetCurrencyOptions {
  /** Валюта не содержит раскрываемых полей */
  expand?: ExpandOptions<CurrencyModel>
}

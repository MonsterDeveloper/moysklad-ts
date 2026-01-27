import type {
  AssortmentEntity,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  DocumentRate,
  Entity,
  ExpandOptions,
  FilterOptions,
  Gtd,
  Idable,
  IdFilter,
  ListMeta,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StateModel,
  StringFilter,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/** Распределение накладных расходов оприходования */
export enum EnterOverheadDistribution {
  /** По весу */
  Weight = "weight",
  /** По объёму */
  Volume = "volume",
  /** По цене */
  Price = "price",
}

/** Накладные расходы оприходования */
export interface EnterOverhead {
  /** Сумма накладных расходов в копейках */
  sum: number
  /** Распределение накладных расходов */
  distribution: EnterOverheadDistribution
}

/**
 * Позиция оприходования
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-pozicii-oprihodowanij
 */
export interface EnterPosition extends Idable, Meta<Entity.EnterPosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара/услуги/серии/модификации/комплекта, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>
  /** Метаданные страны */
  country?: Meta<Entity.Country> // TODO add country expand
  /** Грузовая таможенная декларация (ГТД) */
  gtd?: Gtd
  /**
   * Накладные расходы
   *
   * Если Позиции Оприходования не заданы, то накладные расходы нельзя задать
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-oprihodowaniq-nakladnye-rashody
   */
  overhead: number
  /**
   * Упаковка Товара.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-towary-atributy-wlozhennyh-suschnostej-upakowki-towara
   */
  pack?: unknown // TODO add pack type;
  /** Цена товара/услуги в копейках */
  price: number
  /**
   * Количество товаров/услуг данного вида в позиции.
   *
   * Если позиция - товар, у которого включен учет по серийным номерам, то значение в этом поле всегда будет равно количеству серийных номеров для данной позиции в документе.
   */
  quantity: number
  /** Причина оприходования данной позиции */
  reason?: string
  /**
   * Ячейка на складе
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-sklad-yachejki-sklada
   */
  slot?: Meta<Entity.Slot> // TODO add slot expand
  /**
   * Серийные номера
   *
   * Значение данного атрибута игнорируется, если товар позиции не находится на серийном учете. В ином случае количество товаров в позиции будет равно количеству серийных номеров, переданных в значении атрибута.
   */
  things?: string[]
}

/**
 * Модель позиции оприходования
 *
 * {@linkcode EnterPosition}
 */
export interface EnterPositionModel extends Model {
  object: EnterPosition
}

/**
 * Оприходование
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie
 */
export interface Enter extends Idable, Meta<Entity.Enter> {
  /** ID учетной записи */
  readonly accountId: string
  /**
   * Коллекция метаданных доп. полей.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-rabota-s-dopolnitel-nymi-polqmi
   */
  attributes?: unknown[] // TODO add attributes
  /** Отметка о проведении */
  applicable: boolean
  /** Код оприходования */
  code?: string
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Оприходования */
  readonly deleted?: DateTime
  /** Комментарий Оприходования */
  description?: string
  /** Внешний код Оприходования */
  externalCode: string
  /**
   * Метаданные массива Файлов
   *
   * Максимальное количество файлов - 100
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files: unknown[] // TODO add files
  /** Отдел сотрудника */
  group: Meta<Entity.Group>
  /** Дата документа */
  moment: DateTime
  /** Номер оприходования */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Накладные расходы */
  overhead?: EnterOverhead
  /** Владелец-сотрудник */
  owner?: Meta<Entity.Employee>
  /** Метаданные позиций */
  positions: ListMeta<Entity.EnterPosition>
  /** Напечатан ли документ */
  readonly printed: boolean
  /** Метаданные проекта */
  project?: Meta<Entity.Project>
  /** Опубликован ли документ */
  readonly published: boolean
  /**
   * Валюта.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-obschie-swedeniq-valuta-w-dokumentah
   */
  rate: DocumentRate // TODO expand rate currency
  /** Общий доступ */
  shared: boolean
  /** Метаданные статуса оприходования */
  state?: Meta<Entity.State>
  /** Метаданные склада */
  store: Meta<Entity.Store>
  /** Сумма оприходования в копейках */
  readonly sum: number
  /**
   * ID синхронизации
   *
   * После заполнения недоступен для изменения. */
  syncId?: string
  /** Момент последнего обновления оприходования */
  readonly updated: DateTime
}

/**
 * Модель оприходования
 *
 * {@linkcode Enter}
 */
export interface EnterModel extends Model {
  object: Enter
  expandable: {
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: EnterPositionModel
    state: StateModel
  }
  filters: {
    id: IdFilter
    assortment: IdFilter
    accountId: IdFilter
    applicable: BooleanFilter
    code: StringFilter
    created: DateTimeFilter
    deleted: DateTimeFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    moment: DateTimeFilter
    name: StringFilter
    organization: IdFilter
    owner: IdFilter
    printed: BooleanFilter
    project: IdFilter
    published: BooleanFilter
    shared: BooleanFilter
    state: IdFilter
    store: IdFilter
    sum: NumberFilter
    syncId: IdFilter
    updated: DateTimeFilter
  }
  orderableFields:
    | "id"
    | "syncId"
    | "updated"
    | "updatedBy"
    | "name"
    | "description"
    | "externalCode"
    | "moment"
    | "applicable"
    | "sum"
    | "created"
  requiredCreateFields: "organization" | "store"
}

export interface ListEntersOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<EnterModel>
  order?: OrderOptions<EnterModel>
  search?: string
  filter?: FilterOptions<EnterModel>
}

export interface GetEnterOptions {
  expand?: ExpandOptions<EnterModel>
}

export interface UpdateEnterOptions {
  expand?: ExpandOptions<EnterModel>
}

export interface CreateEnterOptions {
  expand?: ExpandOptions<EnterModel>
}

export type FirstEnterOptions = Omit<ListEntersOptions, "pagination">
export type AllEntersOptions = Omit<ListEntersOptions, "pagination">

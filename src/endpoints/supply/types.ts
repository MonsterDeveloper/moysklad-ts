import type {
  AccountModel,
  AssortmentEntity,
  AssortmentModel,
  Attribute,
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
  PositionFields,
  StateModel,
  StringFilter,
  UpdateMeta,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"
import type { PurchaseOrderModel } from "../purchase-order"

/**
 * Распределение накладных расходов приёмки.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/supply%232-priemka
 */
export enum SupplyOverheadDistribution {
  /** По весу. */
  Weight = "weight",
  /** По объёму. */
  Volume = "volume",
  /** По цене. */
  Price = "price",
}

/**
 * Накладные расходы приёмки в копейках.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/supply%232-priemka
 */
export interface SupplyOverhead {
  sum: number
  distribution: SupplyOverheadDistribution
}

/**
 * Код маркировки товара или упаковки в позиции приёмки.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/supply%232-priemka
 */
export interface SupplyTrackingCode {
  /** Значение кода маркировки. */
  cis: string
  /** Вид кода маркировки. */
  type: "trackingcode" | "consumerpack" | "transportpack"
  /** Коды маркировки внутри упаковки. */
  trackingCodes?: SupplyTrackingCode[]
}

/**
 * Позиция приёмки
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-poziciq-priemki
 */
export interface SupplyPosition extends Idable, Meta<Entity.SupplyPosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара/услуги/серии/модификации/комплекта, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>
  /** Метаданные страны */
  country?: Meta<Entity.Country> // TODO expand country,
  /**
   * Процент скидки или наценки
   *
   * Наценка указывается отрицательным числом, т.е. -10 создаст наценку в 10%
   */
  discount: number
  /** ГТД */
  gtd?: Gtd
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
   * Если позиция - товар, у которого включен учет по серийным номерам, то значение в этом поле всегда будет равно количеству серийных номеров для данной позиции в документе. */
  quantity: number
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
  /**
   * Коды маркировки товаров и транспортных упаковок
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki-kody-markirowki-towarow-i-transportnyh-upakowok
   */
  trackingCodes?: SupplyTrackingCode[]
  /**
   * Накладные расходы
   *
   * Если Позиции Приемки не заданы, то накладные расходы нельзя задать.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki-nakladnye-rashody
   */
  readonly overhead: number
  /** НДС, которым облагается текущая позиция */
  vat: number
  /**
   * Включен ли НДС для позиции
   *
   * С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС". (`vat` = `0`, `vatEnabled` = `false`) -> `vat` = "без НДС", (`vat` = `0`, `vatEnabled` = `true`) -> `vat` = 0%. */
  vatEnabled: boolean
  /** Остатки и себестоимость при запросе `fields=stock`. */
  readonly stock?: undefined
}

/**
 * Модель позиции приёмки
 *
 * {@linkcode SupplyPosition}
 */
export interface SupplyPositionModel extends Model {
  object: SupplyPosition
  expandable: {
    assortment: AssortmentModel
  }
}

/**
 * Приёмка
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki
 */
export interface Supply extends Idable, Meta<Entity.Supply> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные контрагента */
  agent: Meta<Entity.Counterparty>
  /** Метаданные счета контрагента */
  agentAccount?: Meta<Entity.Account>
  /** Отметка о проведении */
  applicable: boolean
  /**
   * Коллекция метаданных доп. полей.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-rabota-s-dopolnitel-nymi-polqmi
   */
  attributes?: Attribute[]
  /** Код Приемки */
  code?: string
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Приемки */
  readonly deleted?: DateTime
  /** Комментарий Приемки */
  description?: string
  /** Внешний код Приемки */
  externalCode: string
  /**
   * Метаданные массива Файлов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files: unknown[] // TODO add files
  /** Отдел сотрудника */
  group: Meta<Entity.Group>
  /** Входящая дата */
  incomingDate?: DateTime
  /** Входящий номер */
  incomingNumber?: string
  /** Дата документа */
  moment: DateTime
  /** Наименование прёмки */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Метаданные счёта юрлица */
  organizationAccount?: Meta<Entity.Account>
  /**
   * Накладные расходы
   *
   * Если Позиции Приемки не заданы, то накладные расходы нельзя задать.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki-nakladnye-rashody
   */
  overhead?: SupplyOverhead
  /** Владелец (сотдруник) */
  owner?: Meta<Entity.Employee>
  /** Сумма входящих платежей по приёмке */
  readonly payedSum: number
  /** Метаданные позиций */
  positions: ListMeta<Entity.SupplyPosition>
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
  rate: DocumentRate
  /** Общий доступ */
  shared: boolean
  /** Метаданные статуса приёмки */
  state?: Meta<Entity.State>
  /** Метаданные склада */
  store: Meta<Entity.Store>
  /** Сумма приёмки в копейках */
  readonly sum: number
  /**
   * ID синхронизации
   *
   * После заполнения недоступен для изменения.
   * */
  syncId?: string
  /** Момент последнего обновления приёмки */
  readonly updated: DateTime
  /** Учитывается ли НДС */
  vatEnabled: boolean
  /** Включен ли НДС в цену */
  vatIncluded?: boolean
  /** Сумма НДС */
  readonly vatSum?: number
  /**
   * Ссылка на связанный заказ поставщику в формате Метаданных
   *
   * {@linkcode PurchaseOrderModel}
   */
  purchaseOrder?: Meta<Entity.PurchaseOrder>
  /** Ссылка на связанный полученный счёт-фактуру. */
  factureIn?: Meta<Entity.FactureIn>
  /** Связанные счета поставщиков. */
  invoicesIn?: Meta<Entity.InvoiceIn>[]
  /** Связанные платежи. */
  payments?: Meta<Entity>[]
  /** Ссылка на связанное производственное задание. */
  productionTask?: Meta<Entity.ProductionTask>
  /** Связанные возвраты поставщику. */
  returns?: Meta<Entity.PurchaseReturn>[]
}

/**
 * Модель приёмки
 *
 * {@linkcode Supply}
 */
export interface SupplyModel extends Model {
  object: Supply
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: SupplyPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    purchaseOrder: PurchaseOrderModel
    state: StateModel
  }
  filters: {
    id: IdFilter
    assortment: IdFilter
    accountId: IdFilter
    agent: IdFilter
    applicable: BooleanFilter
    code: StringFilter
    contract: IdFilter
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
  requiredCreateFields: "agent" | "organization" | "store"
}

export interface ListSuppliesOptions {
  pagination?: PaginationOptions
  fields?: PositionFields
  expand?: ExpandOptions<SupplyModel>
  order?: OrderOptions<SupplyModel>
  search?: string
  filter?: FilterOptions<SupplyModel>
}

export interface GetSupplyOptions {
  expand?: ExpandOptions<SupplyModel>
  fields?: PositionFields
}

export interface UpdateSupplyOptions {
  expand?: ExpandOptions<SupplyModel>
}

export interface UpsertSuppliesOptions {
  expand?: ExpandOptions<SupplyModel>
}

export type FirstSupplyOptions = Omit<ListSuppliesOptions, "pagination">
export type AllSuppliesOptions = Omit<ListSuppliesOptions, "pagination">

/** Документы, на основе которых МойСклад заполняет шаблон приёмки. */
export interface SupplyTemplateData {
  /** Связанный заказ поставщику. */
  purchaseOrder?: UpdateMeta<Entity.PurchaseOrder>
  /** Связанные счета поставщиков. */
  invoicesIn?: UpdateMeta<Entity.InvoiceIn>[]
}

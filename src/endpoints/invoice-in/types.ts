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
  Idable,
  IdFilter,
  ListMeta,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  PositionFields,
  ProjectModel,
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
 * Позиция счёта поставщика
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
 */
export interface InvoiceInPosition
  extends Idable,
    Meta<Entity.InvoicePosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара, услуги, партии или модификации в позиции. */
  assortment: Meta<AssortmentEntity>
  /** Процент скидки или наценки. Наценка указывается отрицательным числом, т.е. -10 создаст наценку в 10% */
  discount: number
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
  /** НДС, которым облагается текущая позиция */
  vat: number
  /** Включен ли НДС для позиции. С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС". (`vat` = `0`, `vatEnabled` = `false`) -> `vat` = "без НДС", (`vat` = `0`, `vatEnabled` = `true`) -> `vat` = 0%. */
  vatEnabled: boolean
  /** Остатки и себестоимость при запросе `fields=stock`. */
  readonly stock?: undefined
}

/**
 * Модель позиции счёта поставщика
 *
 * {@linkcode InvoiceInPosition}
 */
export interface InvoiceInPositionModel extends Model {
  object: InvoiceInPosition
  expandable: {
    assortment: AssortmentModel
  }
}

/**
 * Счёт поставщика
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
 */
export interface InvoiceIn extends Idable, Meta<Entity.InvoiceIn> {
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
  /** Код Счета поставщика */
  code?: string
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Счета поставщика */
  readonly deleted?: DateTime
  /** Комментарий Счета поставщика */
  description?: string
  /** Внешний код Счета поставщика */
  externalCode: string
  /**
   * Метаданные массива файлов (максимум 100)
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
  /** Наименование Счета поставщика */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>
  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>
  /** Сумма платежей по счёту поставщика */
  readonly payedSum: number
  /** Планируемая дата оплаты */
  paymentPlannedMoment?: DateTime
  /** Метаданные позиций Счета поставщика */
  positions: ListMeta<Entity.InvoicePosition>
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
  /** Сумма отгруженного */
  readonly shippedSum: number
  /** Метаданные статуса счета */
  state?: Meta<Entity.State>
  /** Метаданные склада */
  store?: Meta<Entity.Store>
  /** Сумма Счета в установленной валюте */
  readonly sum: number
  /** ID синхронизации. После заполнения недоступен для изменения */
  syncId?: string
  /** Момент последнего обновления Счета поставщика */
  readonly updated: DateTime
  /** Учитывается ли НДС */
  vatEnabled: boolean
  /** Включен ли НДС в цену */
  vatIncluded?: boolean
  /** Сумма НДС */
  readonly vatSum?: number
  /** Связанные платежи. */
  readonly payments?: Meta<Entity>[]
  /** Связанный заказ поставщику. */
  purchaseOrder?: Meta<Entity.PurchaseOrder>
  /** Связанные приёмки. */
  supplies?: Meta<Entity.Supply>[]
}

/**
 * Модель счета поставщика
 *
 * {@linkcode InvoiceIn}
 */
export interface InvoiceInModel extends Model {
  object: InvoiceIn
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: InvoiceInPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    state: StateModel
    project: ProjectModel
    purchaseOrder: PurchaseOrderModel
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
    incomingDate: DateTimeFilter
    incomingNumber: StringFilter
    moment: DateTimeFilter
    name: StringFilter
    organization: IdFilter
    owner: IdFilter
    paymentPlannedMoment: DateTimeFilter
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
    | "paymentPlannedMoment"
  requiredCreateFields: "agent" | "organization"
}

/** Опции списка счетов поставщиков. */
export interface ListInvoiceInsOptions {
  pagination?: PaginationOptions
  fields?: PositionFields
  expand?: ExpandOptions<InvoiceInModel>
  order?: OrderOptions<InvoiceInModel>
  search?: string
  filter?: FilterOptions<InvoiceInModel>
}

/** Опции получения счёта поставщика. */
export interface GetInvoiceInOptions {
  expand?: ExpandOptions<InvoiceInModel>
  fields?: PositionFields
}

/** Опции изменения счёта поставщика. */
export interface UpdateInvoiceInOptions {
  expand?: ExpandOptions<InvoiceInModel>
}

/** Опции создания счёта поставщика. */
export interface CreateInvoiceInOptions {
  expand?: ExpandOptions<InvoiceInModel>
}

/** Опции поиска первого счёта поставщика. */
export type FirstInvoiceInOptions = Omit<ListInvoiceInsOptions, "pagination">
/** Опции получения всех счетов поставщиков. */
export type AllInvoiceInsOptions = Omit<ListInvoiceInsOptions, "pagination">

/** Документ, на основе которого создаётся шаблон счёта поставщика. */
export interface InvoiceInTemplateData {
  /** Заказ поставщику. */
  purchaseOrder?: UpdateMeta<Entity.PurchaseOrder>
  /** Приёмки. */
  supplies?: UpdateMeta<Entity.Supply>[]
}

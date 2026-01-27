import type {
  AccountModel,
  AssortmentEntity,
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
  StateModel,
  StringFilter,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Позиция счёта покупателю
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-pozicii-scheta-pokupatelu
 */
export interface InvoiceOutPosition
  extends Idable,
    Meta<Entity.InvoicePosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара/услуги/серии/модификации/комплекта, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>
  /** Процент скидки или наценки. Наценка указывается отрицательным числом, т.е. -10 создаст наценку в 10% */
  discount?: number
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
}

/**
 * Модель позиции счёта покупателю
 *
 * {@linkcode InvoiceOutPosition}
 */
export interface InvoiceOutPositionModel extends Model {
  object: InvoiceOutPosition
}

/**
 * Счёт покупателю
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-scheta-pokupatelqm
 */
export interface InvoiceOut extends Idable, Meta<Entity.InvoiceOut> {
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
  attributes?: unknown[] // TODO add attributes
  /** Код Счета покупателю */
  code?: string
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Счета покупателю */
  readonly deleted?: DateTime
  /** Комментарий Счета покупателю */
  description?: string
  /** Внешний код Счета покупателю */
  externalCode: string
  /**
   * Метаданные массива Файлов (Максимальное количество файлов - 100)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files: unknown[] // TODO add files
  /** Отдел сотрудника */
  group: Meta<Entity.Group>
  /** Дата документа */
  moment: DateTime
  /** Наименование Счета покупателю */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>
  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>
  /** Сумма входящих платежей по Счету покупателю */
  readonly payedSum: number
  /** Планируемая дата оплаты */
  paymentPlannedMoment?: DateTime
  /** Метаданные позиций Счета покупателю */
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
  rate: DocumentRate // TODO expand rate currency
  /** Метаданные канала продаж */
  salesChannel?: Meta<Entity.SalesChannel>
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
  /** Момент последнего обновления Счета покупателю */
  readonly updated: DateTime
  /** Учитывается ли НДС */
  vatEnabled: boolean
  /** Включен ли НДС в цену */
  vatIncluded?: boolean
  /** Сумма НДС */
  readonly vatSum: number
}

/**
 * Модель счета покупателю
 *
 * {@linkcode InvoiceOut}
 */
export interface InvoiceOutModel extends Model {
  object: InvoiceOut
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: InvoiceOutPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
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
    paymentPlannedMoment: DateTimeFilter
    printed: BooleanFilter
    project: IdFilter
    published: BooleanFilter
    salesChannel: IdFilter
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

export interface ListInvoiceOutsOptions {
  pagination?: PaginationOptions
  fields?: PositionFields
  expand?: ExpandOptions<InvoiceOutModel>
  order?: OrderOptions<InvoiceOutModel>
  search?: string
  filter?: FilterOptions<InvoiceOutModel>
}

export interface GetInvoiceOutOptions {
  expand?: ExpandOptions<InvoiceOutModel>
  fields?: PositionFields
}

export interface UpdateInvoiceOutOptions {
  expand?: ExpandOptions<InvoiceOutModel>
}

export interface CreateInvoiceOutOptions {
  expand?: ExpandOptions<InvoiceOutModel>
}

export type FirstInvoiceOutOptions = Omit<ListInvoiceOutsOptions, "pagination">
export type AllInvoiceOutsOptions = Omit<ListInvoiceOutsOptions, "pagination">

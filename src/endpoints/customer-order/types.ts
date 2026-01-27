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
  ListMetadata,
  MediaType,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  ProjectModel,
  State,
  StateModel,
  StoreModel,
  StringFilter,
  TaxSystem,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { DemandModel } from "../demand"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Позиция заказа покупателя.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-zakazy-pokupatelej
 */
export interface CustomerOrderPosition
  extends Idable,
    Meta<Entity.CustomerOrderPosition> {
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

  /** Резерв данной позиции */
  reserve?: number

  /** Доставлено */
  readonly shipped: number

  /** Код системы налогообложения */
  taxSystem?: TaxSystem

  /** НДС, которым облагается текущая позиция */
  vat: number

  /** Включен ли НДС для позиции. С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС". (`vat` = `0`, `vatEnabled` = `false`) -> `vat` = "без НДС", (`vat` = `0`, `vatEnabled` = `true`) -> `vat` = 0%. */
  vatEnabled: boolean
}

/**
 * Модель позиции заказа покупателя
 *
 * {@linkcode CustomerOrderPosition}
 * */
export interface CustomerOrderPositionModel extends Model {
  object: CustomerOrderPosition
  expandable: {
    assortment: AssortmentModel
  }
}

export interface CustomerOrder extends Idable, Meta<Entity.CustomerOrder> {
  readonly accountId: string
  agent: Meta<Entity.Counterparty>
  agentAccount?: Meta<Entity.Account>
  applicable: boolean
  attributes?: Attribute[] // TODO add attributes filters
  code?: string
  contract?: Meta<Entity.Contract> // TODO expand contract
  readonly created: DateTime
  readonly deleted?: DateTime
  deliveryPlannedMoment?: DateTime
  description?: string
  externalCode: string
  files: unknown[] // TODO add files types & expand
  group: Meta<Entity.Group>
  readonly invoicedSum: number
  moment: DateTime
  name: string
  organization: Meta<Entity.Organization>
  organizationAccount?: Meta<Entity.Account>
  owner?: Meta<Entity.Employee>
  readonly payedSum: number
  positions: ListMeta<Entity.CustomerOrderPosition>
  readonly printed: boolean
  project?: Meta<Entity.Project>
  readonly published: boolean
  rate: DocumentRate // TODO expand rate's currency
  readonly reservedSum: number
  salesChannel?: Meta<Entity.SalesChannel> // TODO expand salesChannel
  shared: boolean
  shipmentAddress?: string
  shipmentAddressFull?: {
    addInfo?: string
    apartment?: string
    city?: string
    comment?: string
    country?: Meta<Entity.Country>
    house?: string
    postalCode?: string
    region?: Meta<Entity.Region>
    street?: string
  }

  readonly shippedSum: number
  state?: Meta<Entity.State>
  store?: Meta<Entity.Store>
  readonly sum: number
  syncId?: string
  taxSystem?: TaxSystem
  readonly updated: DateTime
  vatEnabled: boolean
  vatIncluded: boolean
  readonly vatSum: number

  purchaseOrders?: unknown // TODO add purchaseOrders types & expand
  demands?: Meta<Entity.Demand>[]
  payments?: unknown // TODO add payments types & expand
  invoicesOut?: unknown // TODO add invoicesOut types & expand
  moves?: unknown // TODO add moves types & expand
  prepayments?: unknown // TODO add prepayments types & expand
}

export interface CustomerOrderModel extends Model {
  object: CustomerOrder
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    demands: DemandModel
    organizationAccount: AccountModel
    agentAccount: AccountModel
    positions: CustomerOrderPositionModel
    store: StoreModel
    project: ProjectModel
    state: StateModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    agent: IdFilter
    applicable: BooleanFilter
    code: StringFilter
    contract: IdFilter
    deleted: DateTimeFilter
    deliveryPlannedMoment: DateTimeFilter
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
    salesChannel: IdFilter
    shared: BooleanFilter
    shipmentAddress: StringFilter
    state: IdFilter
    store: IdFilter
    sum: NumberFilter
    syncId: IdFilter
    updated: DateTimeFilter
    isDeleted: BooleanFilter
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
    | "deliveryPlannedMoment"
  requiredCreateFields: "agent" | "organization"
}

export interface ListCustomerOrdersOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<CustomerOrderModel>
  order?: OrderOptions<CustomerOrderModel>
  search?: string
  filter?: FilterOptions<CustomerOrderModel>
  namedfilter?: string
}

export interface CreateCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>
}

export interface UpdateCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>
}

export interface GetCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>
}

export type FirstCustomerOrderOptions = Omit<
  ListCustomerOrdersOptions,
  "pagination"
>
export type AllCustomerOrdersOptions = Omit<
  ListCustomerOrdersOptions,
  "pagination"
>

/**
 * Метаданные заказов покупателей.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-metadannye-zakazow-pokupatelej
 */
export interface CustomerOrderMetadata {
  /** Метаданные */
  meta: {
    href: string
    mediaType: MediaType
  }

  /** Дополнительные поля */
  attributes: {
    meta: ListMetadata<Entity.AttributeMetadata>
  }

  /** Массив статусов заказов покупателей */
  states: State[]

  /** Создавать новые заказы покупателей с меткой "Общий" */
  createShared: boolean
}

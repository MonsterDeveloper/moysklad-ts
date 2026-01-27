import type { RequireExactlyOne } from "type-fest"
import type {
  AccountModel,
  AssortmentEntity,
  AssortmentModel,
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
  StoreModel,
  StringFilter,
  UpdateMeta,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

export enum DemandOverheadDistribution {
  Weight = "weight",
  Volume = "volume",
  Price = "price",
}

export interface DemandOverhead {
  sum: number
  distribution: DemandOverheadDistribution
}

export interface DemandPosition extends Idable, Meta<Entity.DemandPosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара/услуги/серии/модификации/комплекта, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>
  /** Себестоимость (только для услуг) */
  cost?: number
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
  /** Ячейка на складе. */
  slot?: Meta<Entity.Slot>
  /** Серийные номера. Значение данного атрибута игнорируется, если товар позиции не находится на серийном учете. В ином случае количество товаров в позиции будет равно количеству серийных номеров, переданных в значении атрибута. */
  things?: string[]
  /** Коды маркировки товаров и транспортных упаковок. */
  trackingCodes?: unknown // TODO add trackingCodes type;
  /** Коды маркировки товаров в формате тега 1162. */
  trackingCodes_1162?: unknown // TODO add trackingCodes_1162 type;
  /** Накладные расходы. Если Позиции Отгрузки не заданы, то накладные расходы нельзя задать. */
  readonly overhead: number
  /** НДС, которым облагается текущая позиция */
  vat: number
  /** Включен ли НДС для позиции. С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС". (`vat` = `0`, `vatEnabled` = `false`) -> `vat` = "без НДС", (`vat` = `0`, `vatEnabled` = `true`) -> `vat` = 0%. */
  vatEnabled: boolean

  /** Данные по себестоимости и остаткам. */
  stock?: undefined
}

export interface DemandPositionModel extends Model {
  object: DemandPosition

  expandable: {
    assortment: AssortmentModel
  }
}

export interface Demand extends Idable, Meta<Entity.Demand> {
  readonly accountId: string
  agent: Meta<Entity.Counterparty>
  agentAccount?: Meta<Entity.Account>
  applicable: boolean
  attributes: unknown // TODO add attributes types & filters
  code?: string
  contract?: Meta<Entity.Contract> // TODO expand contract
  readonly created: DateTime
  readonly deleted?: DateTime
  description?: string
  externalCode: string
  files: unknown[] // TODO add files types & expand
  group: Meta<Entity.Group>
  moment: DateTime
  name: string
  organization: Meta<Entity.Organization>
  organizationAccount?: Meta<Entity.Account>
  overhead?: DemandOverhead
  owner: Meta<Entity.Employee>
  readonly payedSum: number
  positions: ListMeta<Entity.DemandPosition> // TODO add positions types & expand
  readonly printed: boolean
  project?: Meta<Entity.Project>
  readonly published: boolean
  rate: DocumentRate // TODO expand rate's currency
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
  state?: Meta<Entity.State>
  store: Meta<Entity.Store>
  readonly sum: number
  syncId?: string
  readonly updated: DateTime
  vatEnabled: boolean
  vatIncluded?: boolean
  vatSum?: number

  customerOrder?: Meta<Entity.CustomerOrder> // TODO expand customerOrder
  factureOut?: Meta<Entity.FactureOut> // TODO expand factureOut
  returns?: unknown[] // TODO expand returns
  payments?: Meta<Entity.PaymentIn | Entity.PaymentOut>[] // TODO expand payments
  invoicesOut?: Meta<Entity.InvoiceOut>[] // TODO expand invoicesOut

  cargoName?: string
  carrier?: Meta<Entity.Counterparty> | Meta<Entity.Organization> // TODO expand carrier
  consignee?: Meta<Entity.Counterparty> | Meta<Entity.Organization> // TODO expand consignee
  goodPackQuantity?: number
  shippingInstructions?: string
  stateContractId?: string
  transportFacility?: string
  transportFacilityNumber?: string
}

export interface DemandModel extends Model {
  object: Demand
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: DemandPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    store: StoreModel
    project: ProjectModel
    state: StateModel
  }
  filters: {
    assortment: IdFilter
    id: IdFilter
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
  requiredCreateFields: "agent" | "organization" | "store"
}

export interface ListDemandsOptions {
  pagination?: PaginationOptions
  fields?: PositionFields
  expand?: ExpandOptions<DemandModel>
  order?: OrderOptions<DemandModel>
  search?: string
  filter?: FilterOptions<DemandModel>
}

export interface GetDemandOptions {
  expand?: ExpandOptions<DemandModel>
  fields?: PositionFields
}

export interface UpsertDemandsOptions {
  expand?: ExpandOptions<DemandModel>
}

export type FirstDemandOptions = Omit<ListDemandsOptions, "pagination">
export type AllDemandsOptions = Omit<ListDemandsOptions, "pagination">

export type DemandTemplateData = RequireExactlyOne<{
  customerOrder: UpdateMeta<Entity.CustomerOrder>
  invoiceOut: UpdateMeta<Entity.InvoiceOut>
}>

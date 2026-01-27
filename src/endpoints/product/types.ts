import type {
  ArchivedFilter,
  Attribute,
  Barcodes,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
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
  PriceType,
  StringFilter,
  TaxSystem,
  TrackingType,
} from "../../types"
import type { CounterpartyModel } from ".."
import type { GroupModel } from "../group"

export enum ProductPaymentItemType {
  Good = "GOOD",
  ExcisableGood = "EXCISABLE_GOOD",
  CompoundPaymentItem = "COMPOUND_PAYMENT_ITEM",
  AnotherPaymentItem = "ANOTHER_PAYMENT_ITEM",
}

export type PpeType =
  | "2400001225408"
  | "2400001225606"
  | "2400001226108"
  | "2400001226306"
  | "2400001226405"
  | "2400001323807"
  | "2400001368105"
  | "2400001393107"
  | "2400001393503"
  | "2400001393602"
  | "2400001565306"
  | "2400001807703"
  | "2400001818303"
  | "2400001857005"
  | "2400001857203"
  | "2400001858309"
  | "2400001858507"
  | "2400002015909"
  | "2400002016005"
  | "2400002016104"
  | "2400002052805"
  | "2400002052904"
  | "2400002186203"
  | "2400002886707"
  | "2400002886806"
  | "2400002984502"
  | "2400003117107"
  | "2400003117206"
  | "2400003161209"
  | "2400003207907"
  | "2400003215308"
  | "2400003227806"
  | "2400003237409"
  | "2400003263408"
  | "2400003297700"
  | "2400003356704"
  | "2400003356803"
  | "2400003356902"
  | "2400003433108"
  | "2400003492303"
  | "2400003495700"
  | "2400003495809"
  | "2400003495908"
  | "2400003496004"
  | "2400003496103"
  | "2400003675805"

export interface Product extends Idable, Meta<Entity.Product> {
  readonly accountId: string
  alcoholic?: {
    excise?: number
    type?: number
    strength?: number
    volume?: number
  }
  archived: boolean
  article?: string
  attributes?: Attribute[] // TODO add attributes filters
  barcodes?: Barcodes
  buyPrice?: {
    value: number
    currency: Meta<Entity.Currency>
  }
  code?: string
  country?: Meta<Entity.Country>
  description?: string
  discountProhibited: boolean
  readonly effectiveVat?: number
  readonly effectiveVatEnabled?: boolean
  externalCode: string
  files?: unknown[] // TODO add files types & expand
  group: Meta<Entity.Group>
  images?: unknown[] // TODO add files types & expand
  isSerialTrackable?: boolean
  minimumBalance?: number
  name: string
  owner?: Meta<Entity.Employee>
  packs?: {
    barcodes?: Barcodes
    readonly id: string
    quantity: number
    uom: Meta<Entity.Uom>
  }[]
  partialDisposal?: boolean
  readonly pathName: string
  paymentItemType?: ProductPaymentItemType
  ppeType?: PpeType
  productFolder?: Meta<Entity.ProductFolder>
  salePrices?: {
    value: number
    currency: Meta<Entity.Currency>
    priceType: PriceType
  }[]
  shared: boolean
  supplier?: Meta<Entity.Counterparty>
  readonly syncId?: string
  taxSystem?: TaxSystem
  things?: string[]
  tnved?: string
  trackingType?: TrackingType
  uom?: Meta<Entity.Uom>
  readonly updated: DateTime
  useParentVat: boolean
  readonly variantsCount: number
  vat?: number
  vatEnabled?: boolean
  volume?: number
  weight?: number
}

export interface ProductModel extends Model {
  object: Product
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    owner: CounterpartyModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    archived: ArchivedFilter
    article: StringFilter
    barcodes: StringFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    isSerialTrackable: BooleanFilter
    minimumBalance: NumberFilter
    name: StringFilter
    owner: IdFilter
    pathName: StringFilter
    shared: BooleanFilter
    supplier: IdFilter
    syncId: IdFilter
    updated: DateTimeFilter
    volume: NumberFilter
    weight: NumberFilter
  }
  orderableFields:
    | "id"
    | "updated"
    | "name"
    | "code"
    | "externalCode"
    | "archived"
    | "pathName"
    | "isSerialTrackable"
    | "weighed"
    | "weight"
    | "volume"
    | "syncId"
  requiredCreateFields: "name"
}

export interface ListProductsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductModel>
  order?: OrderOptions<ProductModel>
  search?: string
  filter?: FilterOptions<ProductModel>
}

export interface UpsertProductsOptions {
  expand?: ExpandOptions<ProductModel>
}

export interface UpdateProductOptions {
  expand?: ExpandOptions<ProductModel>
}

export interface GetProductOptions {
  expand?: ExpandOptions<ProductModel>
}

export type FirstProductOptions = Omit<ListProductsOptions, "pagination">
export type AllProductsOptions = Omit<ListProductsOptions, "pagination">

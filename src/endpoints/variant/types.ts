import type {
  ArchivedFilter,
  Attribute,
  Barcodes,
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
  PriceType,
  StringFilter,
} from "../../types"
import type { ProductModel } from ".."

export interface Variant extends Idable, Meta<Entity.Variant> {
  readonly accountId: string
  archived: boolean
  barcodes?: Barcodes
  buyPrice?: {
    value: number
    currency: Meta<Entity.Currency>
  }
  characteristics: Attribute[]
  code?: string
  description?: string
  discountProhibited: boolean
  externalCode: string
  images?: unknown[] // TODO add files types & expand
  minPrice?: {
    value: number
    currency: Meta<Entity.Currency>
  }
  name: string
  packs?: {
    barcodes?: Barcodes
    readonly id: string
    quantity: number
    uom: Meta<Entity.Uom>
  }[]
  product: Meta<Entity.Product>
  salePrices?: {
    value: number
    currency: Meta<Entity.Currency>
    priceType: PriceType
  }[]
  readonly things?: string[]
  readonly updated: DateTime
}

export interface VariantModel extends Model {
  object: Variant
  expandable: {
    product: ProductModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    archived: ArchivedFilter
    barcodes: StringFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    name: StringFilter
    updated: DateTimeFilter
    productid: IdFilter
  }
  orderableFields:
    | "id"
    | "accountId"
    | "archived"
    | "barcodes"
    | "code"
    | "description"
    | "externalCode"
    | "name"
    | "updated"
  requiredCreateFields: "characteristics" | "product"
}

export interface ListVariantsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<VariantModel>
  order?: OrderOptions<VariantModel>
  search?: string
  filter?: FilterOptions<VariantModel>
}

export interface CreateVariantOptions {
  expand?: ExpandOptions<VariantModel>
}

export interface UpdateVariantOptions {
  expand?: ExpandOptions<VariantModel>
}

export interface GetVariantOptions {
  expand?: ExpandOptions<VariantModel>
}

export type FirstVariantOptions = Omit<ListVariantsOptions, "pagination">
export type AllVariantsOptions = Omit<ListVariantsOptions, "pagination">

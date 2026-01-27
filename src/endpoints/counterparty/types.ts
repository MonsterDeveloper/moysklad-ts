import type {
  ArchivedFilter,
  Attribute,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  EnumFilter,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StateModel,
  StringFilter,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

export enum CounterpartyCompanyType {
  Legal = "legal",
  Entrepreneur = "entrepreneur",
  Individual = "individual",
}

export enum IndividualCounterpartySex {
  Male = "male",
  Female = "female",
}

interface BaseCounterparty extends Idable, Meta<Entity.Counterparty> {
  readonly accountId: string
  // TODO expand accounts
  accounts: unknown
  actualAddress?: string
  actualAddressFull?: {
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
  legalAddress?: string
  legalAddressFull?: {
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
  archived: boolean
  attributes?: Attribute[] // TODO attributes filters
  bonusPoints?: number
  // TODO expand bonusProgram
  bonusProgram?: unknown
  code?: string
  companyType: CounterpartyCompanyType
  // TODO expand contactpersons
  contactpersons?: unknown
  created: DateTime
  description?: string
  discountCardNumber?: string
  // TODO figure out discounts
  discounts?: unknown
  email?: string
  externalCode: string
  fax?: string
  // TODO expand files
  files: unknown
  group: Meta<Entity.Group>
  name: string
  // TODO expand notes
  notes?: unknown
  owner?: Meta<Entity.Employee>
  phone?: string
  // TODO add priceType
  priceType?: unknown
  readonly salesAmount: number
  shared: boolean
  state?: Meta<Entity.State>
  syncId?: string
  tags?: string[]
  readonly updated: DateTime
}

export interface LegalCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Legal
  inn?: string
  kpp?: string
  legalTitle?: string
  ogrn?: string
  okpo?: string
}

export interface EntrepreneurCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Entrepreneur
  certificateDate?: DateTime
  certificateNumber?: string
  inn?: string
  legalFirstName?: string
  legalLastName?: string
  legalMiddleName?: string
  legalTitle?: string
  ogrnip?: string
  okpo?: string
}

export interface IndividualCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Individual
  birthDate?: DateTime
  inn?: string
  legalFirstName?: string
  legalLastName?: string
  legalMiddleName?: string
  legalTitle?: string
  sex?: IndividualCounterpartySex
}

/**
 * Counterparty / Контрагент
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-kontragenty
 */
export type Counterparty =
  | LegalCounterparty
  | EntrepreneurCounterparty
  | IndividualCounterparty

export interface CounterpartyModel extends Model {
  object: Counterparty
  expandable: {
    owner: EmployeeModel
    group: GroupModel
    state: StateModel
  }
  filters: {
    accountId: IdFilter
    actualAddress: StringFilter
    archived: ArchivedFilter
    // TODO filters for attributes
    code: StringFilter
    companyType: EnumFilter<CounterpartyCompanyType>
    created: DateTimeFilter
    description: StringFilter
    discountCardNumber: StringFilter
    email: StringFilter
    externalCode: StringFilter
    fax: StringFilter
    group: IdFilter
    id: IdFilter
    name: StringFilter
    owner: IdFilter
    priceType: IdFilter
    shared: BooleanFilter
    state: IdFilter
    syncId: IdFilter
    tags: StringFilter
    updated: DateTimeFilter
  }
  orderableFields:
    | "id"
    | "version"
    | "updated"
    | "updatedBy"
    | "name"
    | "description"
    | "code"
    | "externalCode"
    | "archived"
    | "created"
    | "phone"
    | "email"
    | "fax"
}

export interface ListCounterpartiesOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<CounterpartyModel>
  order?: OrderOptions<CounterpartyModel>
  search?: string
  filter?: FilterOptions<CounterpartyModel>
}

export type AllCounterpartiesOptions = Omit<
  ListCounterpartiesOptions,
  "pagination"
>
export type FirstCounterpartyOptions = Omit<
  ListCounterpartiesOptions,
  "pagination"
>

export interface GetCounterpartyOptions {
  expand?: ExpandOptions<CounterpartyModel>
}

export interface UpdateCounterpartyOptions {
  expand?: ExpandOptions<CounterpartyModel>
}

/**
 * Опции для создания или обновления контрагента
 */
export interface UpsertCounterpartyOptions {
  expand?: ExpandOptions<CounterpartyModel>
}

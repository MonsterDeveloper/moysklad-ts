import type {
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  EnumFilter,
  IdFilter,
  Idable,
  Meta,
  Model,
  StringFilter,
} from "@/types";
import type { EmployeeModel } from "../employee";
import type { GroupModel } from "../group";

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
  readonly accountId: string;
  // TODO expand accounts
  accounts: unknown;
  actualAddress?: string;
  actualAddressFull?: {
    addInfo?: string;
    apartment?: string;
    city?: string;
    comment?: string;
    // TODO add country
    country?: Meta<never>;
    house?: string;
    postalCode?: string;
    // TODO add region
    region?: Meta<never>;
    street?: string;
  };
  archived: boolean;
  // TODO attributes
  attributes?: unknown;
  bonusPoints?: number;
  // TODO expand bonusProgram
  bonusProgram?: unknown;
  code?: string;
  companyType: CounterpartyCompanyType;
  // TODO expand contactpersons
  contactpersons?: unknown;
  created: DateTime;
  description?: string;
  discountCardNumber?: string;
  // TODO figure out discounts
  discounts?: unknown;
  email?: string;
  externalCode: string;
  fax?: string;
  // TODO expand files
  files: unknown;
  group: Meta<Entity.Group>;
  name: string;
  // TODO expand notes
  notes?: unknown;
  owner?: Meta<Entity.Employee>;
  phone?: string;
  // TODO add priceType
  priceType?: unknown;
  readonly salesAmount: number;
  shared: boolean;
  // TODO expand state
  state?: unknown;
  syncId?: string;
  tags?: string[];
  readonly updated: DateTime;
}

export interface LegalCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Legal;
  inn?: string;
  kpp?: string;
  legalAddress?: string;
  legalTitle?: string;
  ogrn?: string;
  okpo?: string;
}

export interface EntrepreneurCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Entrepreneur;
  certificateDate?: DateTime;
  certificateNumber?: string;
  inn?: string;
  legalAddress?: string;
  legalFirstName?: string;
  legalLastName?: string;
  legalMiddleName?: string;
  legalTitle?: string;
  ogrnip?: string;
  okpo?: string;
}

export interface IndividualCounterparty extends BaseCounterparty {
  companyType: CounterpartyCompanyType.Individual;
  birthDate?: DateTime;
  inn?: string;
  legalAddress?: string;
  legalFirstName?: string;
  legalLastName?: string;
  legalMiddleName?: string;
  legalTitle?: string;
  sex?: IndividualCounterpartySex;
}

/**
 * Counterparty / Контрагент
 *
 * @link https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-kontragenty
 */
export type Counterparty =
  | LegalCounterparty
  | EntrepreneurCounterparty
  | IndividualCounterparty;

export interface CounterpartyModel extends Model {
  object: Counterparty;
  expandable: {
    owner: EmployeeModel;
    group: GroupModel;
  };
  filters: {
    accountId: IdFilter;
    actualAddress: StringFilter;
    archived: BooleanFilter;
    // TODO filters for attributes
    code: StringFilter;
    companyType: EnumFilter<CounterpartyCompanyType>;
    created: DateTimeFilter;
    description: StringFilter;
    discountCardNumber: StringFilter;
    email: StringFilter;
    externalCode: StringFilter;
    fax: StringFilter;
    group: IdFilter;
    id: IdFilter;
    name: StringFilter;
    owner: IdFilter;
    priceType: IdFilter;
    shared: BooleanFilter;
    // TODO filters for state
    syncId: IdFilter;
    tags: StringFilter;
    updated: DateTimeFilter;
  };
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
    | "fax";
}

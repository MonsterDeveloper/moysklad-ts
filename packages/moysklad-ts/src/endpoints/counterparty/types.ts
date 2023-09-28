import type { DateTime, Entity, Idable, Meta, Payload } from "@/types";
import type { EmptyObject } from "type-fest";

export enum CounterpartyCompanyType {
  Legal = "legal",
  Entrepreneur = "entrepreneur",
  Individual = "individual",
}

export enum IndividualCounterpartySex {
  Male = "male",
  Female = "female",
}

/**
 * Counterparty / Контрагент
 *
 * @link https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-kontragenty
 */
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
  // TODO expand group
  group: unknown;
  name: string;
  // TODO expand notes
  notes?: unknown;
  // TODO expand owner
  owner?: unknown;
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

export type Counterparty =
  | LegalCounterparty
  | EntrepreneurCounterparty
  | IndividualCounterparty;

export interface CounterpartyPayload extends Payload {
  object: Counterparty;
  expandable: EmptyObject;
}

import type { DateTime, Entity, Idable, Meta, Model } from "@/types";
import type { BonusProgramModel } from "../bonus-program";
import type { GroupModel } from "../group";
import type { EmployeeModel } from "../employee";

export enum OrganizationCompanyType {
  Legal = "legal",
  Entrepreneur = "entrepreneur",
  Individual = "individual",
}

interface BaseOrganization extends Idable, Meta<Entity.Organization> {
  readonly accountId: string;
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
  readonly bonusPoints?: number;
  bonusProgram?: Meta<Entity.BonusProgram>;
  code?: string;
  companyType: OrganizationCompanyType;
  created: DateTime;
  description?: string;
  externalCode: string;
  group: Meta<Entity.Group>;
  name: string;
  owner?: Meta<Entity.Employee>;
  shared: boolean;
  syncId?: string;
  trackingContractDate?: DateTime;
  trackingContractNumber?: string;
  readonly updated: DateTime;
}

export interface LegalOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Legal;
  legalTitle?: string;
  legalAddress?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  okpo?: string;
}

export interface EntrepreneurOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Entrepreneur;
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

export interface IndividualOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Individual;
  inn?: string;
  legalAddress?: string;
  legalFirstName?: string;
  legalLastName?: string;
  legalMiddleName?: string;
  legalTitle?: string;
}

export type Organization =
  | LegalOrganization
  | EntrepreneurOrganization
  | IndividualOrganization;

export interface OrganizationModel extends Model {
  object: Organization;
  expandable: {
    bonusProgram: BonusProgramModel;
    group: GroupModel;
    owner: EmployeeModel;
  };
}

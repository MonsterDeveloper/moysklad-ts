import type { DateTime, Entity, Idable, Meta, Model } from "../../types"
import type { BonusProgramModel } from "../bonus-program"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

export enum OrganizationCompanyType {
  Legal = "legal",
  Entrepreneur = "entrepreneur",
  Individual = "individual",
}

interface BaseOrganization extends Idable, Meta<Entity.Organization> {
  readonly accountId: string
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
  phone?: string
  email?: string
  archived: boolean
  readonly bonusPoints?: number
  bonusProgram?: Meta<Entity.BonusProgram>
  code?: string
  companyType: OrganizationCompanyType
  created: DateTime
  description?: string
  externalCode: string
  group: Meta<Entity.Group>
  name: string
  owner?: Meta<Entity.Employee>
  shared: boolean
  syncId?: string
  trackingContractDate?: DateTime
  trackingContractNumber?: string
  readonly updated: DateTime
}

export interface LegalOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Legal
  legalTitle?: string
  inn?: string
  kpp?: string
  ogrn?: string
  okpo?: string
}

export interface EntrepreneurOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Entrepreneur
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

export interface IndividualOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Individual
  inn?: string
  legalFirstName?: string
  legalLastName?: string
  legalMiddleName?: string
  legalTitle?: string
}

export type Organization =
  | LegalOrganization
  | EntrepreneurOrganization
  | IndividualOrganization

export interface OrganizationModel extends Model {
  object: Organization
  expandable: {
    bonusProgram: BonusProgramModel
    group: GroupModel
    owner: EmployeeModel
  }
}

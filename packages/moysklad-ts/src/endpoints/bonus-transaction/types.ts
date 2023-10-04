import type {
  DateTime,
  Entity,
  ExpandOptions,
  Idable,
  Meta,
  OrderOptions,
  PaginationOptions,
  Model,
  IdFilter,
  BooleanFilter,
  NumberFilter,
  StringFilter,
  DateTimeFilter,
  FilterOptions,
} from "@/types";
import type { CounterpartyModel } from "../counterparty";
import type { EmployeeModel } from "../employee";
import type { GroupModel } from "../group";
import type { BonusProgramModel } from "../bonus-program";
import type { OrganizationModel } from "../organization";

export enum BonusTransactionCategoryType {
  Regular = "REGULAR",
  Welcome = "WELCOME",
}

export enum BonusTransactionStatus {
  WaitProcessing = "WAIT_PROCESSING",
  Completed = "COMPLETED",
  Canceled = "CANCELED",
}

export enum BonusTransactionType {
  Earning = "EARNING",
  Spending = "SPENDING",
}

export interface BonusTransaction
  extends Idable,
    Meta<Entity.BonusTransaction> {
  readonly accountId: string;
  agent: Meta<Entity.Counterparty>;
  applicable: boolean;
  bonusProgram?: Meta<Entity.BonusProgram>;
  bonusValue?: number;
  readonly categoryType?: BonusTransactionCategoryType;
  code?: string;
  created: DateTime;
  executionDate?: DateTime;
  externalCode: string;
  group: Meta<Entity.Group>;
  moment?: DateTime;
  name?: string;
  organization?: Meta<Entity.Organization>;
  owner?: Meta<Entity.Employee>;
  parentDocument?: Meta<never>;
  shared: boolean;
  readonly transactionStatus?: BonusTransactionStatus;
  transactionType: BonusTransactionType;
  updated: DateTime;
}

export interface BonusTransactionModel extends Model {
  object: BonusTransaction;
  expandable: {
    agent: CounterpartyModel;
    owner: EmployeeModel;
    group: GroupModel;
    bonusProgram: BonusProgramModel;
    organization: OrganizationModel;
  };
  orderableFields:
    | "id"
    | "applicable"
    | "bonusValue"
    | "code"
    | "created"
    | "executionDate"
    | "externalCode"
    | "moment"
    | "name"
    | "shared"
    | "updated";

  requiredCreateFields: "agent" | "transactionType";
  filters: {
    accountId: IdFilter;
    agent: IdFilter;
    applicable: BooleanFilter;
    bonusProgram: IdFilter;
    bonusValue: NumberFilter;
    code: StringFilter;
    created: DateTimeFilter;
    externalCode: StringFilter;
    group: IdFilter;
    id: IdFilter;
    moment: DateTimeFilter;
    name: StringFilter;
    organization: IdFilter;
    owner: IdFilter;
    shared: BooleanFilter;
    updated: DateTimeFilter;
    updatedBy: IdFilter;
  };
}

export interface ListBonusTransactionsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<BonusTransactionModel>;
  order?: OrderOptions<BonusTransactionModel>;
  search?: string;
  filter?: FilterOptions<BonusTransactionModel>;
}

export type FirstBonusTransactionOptions = Omit<
  ListBonusTransactionsOptions,
  "pagination"
>;

export interface GetBonusTransactionOptions {
  expand?: ExpandOptions<BonusTransactionModel>;
}

export interface UpdateBonusTransactionOptions {
  expand?: ExpandOptions<BonusTransactionModel>;
}

export interface CreateBonusTransactionOptions {
  expand?: ExpandOptions<BonusTransactionModel>;
}

import type {
  DateTime,
  Entity,
  ExpandOptions,
  Idable,
  Meta,
  PaginationOptions,
  Payload,
} from "@/types";
import type { CounterpartyPayload } from "../counterparty";
import type { EmployeePayload } from "../employee";
import type { GroupPayload } from "../group";
import type { BonusProgramPayload } from "../bonus-program";
import type { OrganizationPayload } from "../organization";

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

export interface BonusTransactionPayload extends Payload {
  object: BonusTransaction;
  expandable: {
    agent: CounterpartyPayload;
    owner: EmployeePayload;
    group: GroupPayload;
    bonusProgram: BonusProgramPayload;
    organization: OrganizationPayload;
  };
}

export interface ListBonusTransactionsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<BonusTransactionPayload>;
}

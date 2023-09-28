import type {
  DateTime,
  Entity,
  ExpandOptions,
  Idable,
  Meta,
  PaginationOptions,
  Payload,
} from "@/types";
import type { Counterparty, CounterpartyPayload } from "../counterparty";
import type { EmployeePayload } from "../employee";
import type { GroupPayload } from "../group";

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
  agent: Counterparty;
  applicable: boolean;
  // TODO expand bonus program
  bonusProgram?: unknown;
  bonusValue?: number;
  readonly categoryType?: BonusTransactionCategoryType;
  code?: string;
  created: DateTime;
  executionDate?: DateTime;
  externalCode: string;
  group: Meta<Entity.Group>;
  moment?: DateTime;
  name?: string;
  // TODO expand organization
  organization?: unknown;
  owner?: Meta<Entity.Employee>;
  // TODO expand parentDocument
  parentDocument?: unknown;
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
  };
}

export interface ListBonusTransactionsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<BonusTransactionPayload>;
}

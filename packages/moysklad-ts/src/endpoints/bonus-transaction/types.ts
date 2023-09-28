import type {
  Entity,
  ExpandOptions,
  Idable,
  Meta,
  PaginationOptions,
  Payload,
} from "@/types";
import type { EmptyObject } from "type-fest";

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
  // TODO expand agent
  agent: unknown;
  applicable: boolean;
  // TODO expand bonus program
  bonusProgram?: unknown;
  bonusValue?: number;
  readonly categoryType?: BonusTransactionCategoryType;
  code?: string;
  created: string;
  executionDate?: string;
  externalCode: string;
  // TODO expand group
  group: unknown;
  moment?: string;
  name?: string;
  // TODO expand organization
  organization?: unknown;
  // TODO expand owner
  owner?: unknown;
  // TODO expand parentDocument
  parentDocument?: unknown;
  shared: boolean;
  readonly transactionStatus?: BonusTransactionStatus;
  transactionType: BonusTransactionType;
  updated: string;
}

export interface BonusTransactionPayload extends Payload {
  object: BonusTransaction;
  expandable: EmptyObject;
}

export interface ListBonusTransactionsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<BonusTransactionPayload>;
}

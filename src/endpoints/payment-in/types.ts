import type {
  AccountModel,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  DocumentRate,
  Entity,
  ExpandOptions,
  FilterOptions,
  IdFilter,
  Idable,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types";
import type { CounterpartyModel } from "../counterparty";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";
import type { EmployeeModel } from "../employee";

export interface PaymentIn extends Idable, Meta<Entity.PaymentIn> {
  readonly accountId: string;
  agent: Meta<Entity.Counterparty>;
  agentAccount?: Meta<Entity.Account>;
  applicable: boolean;
  attributes?: unknown; // TODO add attributes
  code?: string;
  contract?: Meta<Entity.Contract>;
  readonly created: DateTime;
  readonly deleted?: DateTime;
  description?: string;
  externalCode: string;
  files?: unknown[]; // TODO add files
  group: Meta<Entity.Group>;
  incomingDate?: DateTime;
  incomingNumber?: number;
  moment: DateTime;
  name: string;
  organization: Meta<Entity.Organization>;
  organizationAccount?: Meta<Entity.Account>;
  owner?: Meta<Entity.Employee>;
  paymentPurpose: string;
  readonly printed: boolean;
  project?: Meta<Entity.Project>;
  readonly published: boolean;
  rate: DocumentRate; // TODO expand rate's currency
  shared: boolean;
  salesChannel?: Meta<Entity.SalesChannel>;
  state?: Meta<Entity.State>;
  sum: number;
  syncId?: string;
  readonly updated: DateTime;
}

export interface PaymentInModel extends Model {
  object: PaymentIn;
  expandable: {
    agent: CounterpartyModel; // TODO expand contract, files, project, salesChannel, state
    group: GroupModel;
    organization: OrganizationModel;
    owner: EmployeeModel;
    agentAccount: AccountModel;
    organizationAccount: AccountModel;
  };
  filters: {
    id: IdFilter;
    accountId: IdFilter;
    agent: IdFilter;
    agentAccount: IdFilter;
    applicable: BooleanFilter;
    code: StringFilter;
    contract: IdFilter;
    created: DateTimeFilter;
    deleted: DateTimeFilter;
    description: StringFilter;
    externalCode: StringFilter;
    group: IdFilter;
    incomingDate: DateTimeFilter;
    incomingNumber: NumberFilter;
    moment: DateTimeFilter;
    name: StringFilter;
    organization: IdFilter;
    organizationAccount: IdFilter;
    owner: IdFilter;
    paymentPurpose: StringFilter;
    printed: BooleanFilter;
    project: IdFilter;
    published: BooleanFilter;
    shared: BooleanFilter;
    salesChannel: IdFilter;
    state: IdFilter;
    sum: NumberFilter;
    syncId: IdFilter;
    updated: DateTimeFilter;
  };
  orderableFields:
    | "id"
    | "syncId"
    | "updated"
    | "updatedBy"
    | "name"
    | "description"
    | "externalCode"
    | "moment"
    | "applicable"
    | "sum"
    | "created"
    | "paymentPurpose"
    | "incomingDate"
    | "incomingNumber";

  requiredCreateFields: "agent" | "organization";
}

export interface ListPaymentInsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<PaymentInModel>;
  order?: OrderOptions<PaymentInModel>;
  search?: string;
  filter?: FilterOptions<PaymentInModel>;
}

export interface GetPaymentInOptions {
  expand?: ExpandOptions<PaymentInModel>;
}

export interface UpdatePaymentInOptions {
  expand?: ExpandOptions<PaymentInModel>;
}

export interface CreatePaymentInOptions {
  expand?: ExpandOptions<PaymentInModel>;
}

export type FirstPaymentInOptions = Omit<ListPaymentInsOptions, "pagination">;
export type AllPaymentInsOptions = Omit<ListPaymentInsOptions, "pagination">;

import {
  type Attribute,
  type BooleanFilter,
  type DateTime,
  type DateTimeFilter,
  type DocumentRate,
  type Entity,
  type ExpandOptions,
  type FilterOptions,
  type IdFilter,
  type Idable,
  type Meta,
  type Model,
  type NumberFilter,
  type OrderOptions,
  type PaginationOptions,
  type StringFilter,
  type TaxSystem,
} from "@/types";
import type { CounterpartyModel } from "../counterparty";
import type { DemandModel } from "../demand";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";
import type { EmployeeModel } from "../employee";

export interface CustomerOrder extends Idable, Meta<Entity.CustomerOrder> {
  readonly accountId: string;
  agent: Meta<Entity.Counterparty>;
  agentAccount?: Meta<Entity.Account>; // TODO expand agentAccount
  applicable: boolean;
  attributes?: Attribute[]; // TODO add attributes filters
  code?: string;
  contract?: Meta<Entity.Contract>; // TODO expand contract
  readonly created: DateTime;
  readonly deleted?: DateTime;
  deliveryPlannedMoment?: DateTime;
  description?: string;
  externalCode: string;
  files: unknown[]; // TODO add files types & expand
  group: Meta<Entity.Group>;
  readonly invoicedSum: number;
  moment: DateTime;
  name: string;
  organization: Meta<Entity.Organization>;
  organizationAccount?: Meta<Entity.Account>; // TODO expand organizationAccount
  owner?: Meta<Entity.Employee>;
  readonly payedSum: number;
  positions: unknown; // TODO add positions types & expand
  readonly printed: boolean;
  project?: Meta<Entity.Project>; // TODO expand project
  readonly published: boolean;
  rate: DocumentRate; // TODO expand rate's currency
  readonly reservedSum: number;
  salesChannel?: Meta<Entity.SalesChannel>; // TODO expand salesChannel
  shared: boolean;
  shipmentAddress?: string;
  shipmentAddressFull?: {
    addInfo?: string;
    apartment?: string;
    city?: string;
    comment?: string;
    country?: Meta<Entity.Country>;
    house?: string;
    postalCode?: string;
    region?: Meta<Entity.Region>;
    street?: string;
  };

  readonly shippedSum: number;
  state?: Meta<Entity.State>; // TODO expand state
  store?: Meta<Entity.Store>; // TODO expand store
  readonly sum: number;
  syncId?: string;
  taxSystem?: TaxSystem;
  readonly updated: DateTime;
  vatEnabled: boolean;
  vatIncluded: boolean;
  readonly vatSum: number;

  purchaseOrders: unknown; // TODO add purchaseOrders types & expand
  demands: Meta<Entity.Demand>[];
  payments: unknown; // TODO add payments types & expand
  invoicesOut: unknown; // TODO add invoicesOut types & expand
  moves: unknown; // TODO add moves types & expand
  prepayments: unknown; // TODO add prepayments types & expand
}

export interface CustomerOrderModel extends Model {
  object: CustomerOrder;
  expandable: {
    agent: CounterpartyModel;
    group: GroupModel;
    organization: OrganizationModel;
    owner: EmployeeModel;
    demands: DemandModel;
  };
  filters: {
    id: IdFilter;
    accountId: IdFilter;
    agent: IdFilter;
    applicable: BooleanFilter;
    code: StringFilter;
    contract: IdFilter;
    deleted: DateTimeFilter;
    deliveryPlannedMoment: DateTimeFilter;
    description: StringFilter;
    externalCode: StringFilter;
    group: IdFilter;
    moment: DateTimeFilter;
    name: StringFilter;
    organization: IdFilter;
    owner: IdFilter;
    printed: BooleanFilter;
    project: IdFilter;
    published: BooleanFilter;
    salesChannel: IdFilter;
    shared: BooleanFilter;
    shipmentAddress: StringFilter;
    state: IdFilter;
    store: IdFilter;
    sum: NumberFilter;
    syncId: IdFilter;
    updated: DateTimeFilter;
    isDeleted: BooleanFilter;
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
    | "deliveryPlannedMoment";
  requiredCreateFields: "agent" | "organization";
}

export interface ListCustomerOrdersOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<CustomerOrderModel>;
  order?: OrderOptions<CustomerOrderModel>;
  search?: string;
  filter?: FilterOptions<CustomerOrderModel>;
}

export interface GetCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>;
}

import type {
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  DocumentRate,
  Entity,
  ExpandOptions,
  FilterOptions,
  IdFilter,
  Idable,
  ListMeta,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "@/types";
import type { CounterpartyModel } from "../counterparty";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";
import type { EmployeeModel } from "../employee";

export enum DemandOverheadDistribution {
  Weight = "weight",
  Volume = "volume",
  Price = "price",
}

export interface DemandOverhead {
  sum: number;
  distribution: DemandOverheadDistribution;
}

export interface Demand extends Idable, Meta<Entity.Demand> {
  readonly accountId: string;
  agent: Meta<Entity.Counterparty>;
  agentAccount?: Meta<Entity.Account>; // TODO expand agentAccount
  applicable: boolean;
  attributes: unknown; // TODO add attributes types & filters
  code?: string;
  contract?: Meta<Entity.Contract>; // TODO expand contract
  readonly created: DateTime;
  readonly deleted?: DateTime;
  description?: string;
  externalCode: string;
  files: unknown[]; // TODO add files types & expand
  group: Meta<Entity.Group>;
  moment: DateTime;
  name: string;
  organization: Meta<Entity.Organization>;
  organizationAccount?: Meta<Entity.Account>; // TODO expand organizationAccount
  overhead?: DemandOverhead;
  owner: Meta<Entity.Employee>;
  readonly payedSum: number;
  positions: ListMeta<Entity.DemandPosition>; // TODO add positions types & expand
  readonly printed: boolean;
  project?: Meta<Entity.Project>; // TODO expand project
  readonly published: boolean;
  rate: DocumentRate; // TODO expand rate's currency
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
  state?: Meta<Entity.State>; // TODO expand state
  store: Meta<Entity.Store>; // TODO expand store
  readonly sum: number;
  syncId?: string;
  readonly updated: DateTime;
  vatEnabled: boolean;
  vatIncluded?: boolean;
  vatSum?: number;

  customerOrder?: Meta<Entity.CustomerOrder>; // TODO expand customerOrder
  factureOut?: Meta<Entity.FactureOut>; // TODO expand factureOut
  returns?: unknown[]; // TODO expand returns
  payments?: (Meta<Entity.PaymentIn> | Meta<Entity.PaymentOut>)[]; // TODO expand payments
  invoicesOut?: Meta<Entity.InvoiceOut>[]; // TODO expand invoicesOut

  cargoName?: string;
  carrier?: Meta<Entity.Counterparty> | Meta<Entity.Organization>; // TODO expand carrier
  consignee?: Meta<Entity.Counterparty> | Meta<Entity.Organization>; // TODO expand consignee
  goodPackQuantity?: number;
  shippingInstructions?: string;
  stateContractId?: string;
  transportFacility?: string;
  transportFacilityNumber?: string;
}

export interface DemandModel extends Model {
  object: Demand;
  expandable: {
    agent: CounterpartyModel;
    group: GroupModel;
    organization: OrganizationModel;
    owner: EmployeeModel;
  };
  filters: {
    id: IdFilter;
    accountId: IdFilter;
    agent: IdFilter;
    applicable: BooleanFilter;
    code: StringFilter;
    contract: IdFilter;
    created: DateTimeFilter;
    deleted: DateTimeFilter;
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
    | "created";
  requiredCreateFields: "agent" | "organization" | "store";
}

export interface ListDemandsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<DemandModel>;
  order?: OrderOptions<DemandModel>;
  search?: string;
  filter?: FilterOptions<DemandModel>;
}

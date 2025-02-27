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
  BatchDeleteResult,
  BatchGetResult,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
  UpdateMeta,
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

/**
 * Входящие платежи
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh
 */
export interface PaymentInEndpoint {
  /**
   * Получить список входящих платежей
   *
   * @param options - Опции для получения списка
   * @returns Список входящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-poluchit-vhodqschie-platezhi
   */
  list<T extends ListPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentInsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >;

  /**
   * Получить все входящие платежи
   *
   * @param options - Опции для получения списка
   * @returns Список всех входящих платежей
   */
  all<T extends AllPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentInsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >;

  /**
   * Получить входящий платеж по ID
   *
   * @param id - ID входящего платежа
   * @param options - Опции для получения входящего платежа
   * @returns Входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-poluchit-vhodqschij-platezh
   */
  get<T extends GetPaymentInOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>;

  /**
   * Обновить входящий платеж
   *
   * @param id - ID входящего платежа
   * @param data - Данные для обновления
   * @param options - Опции для обновления
   * @returns Обновленный входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-izmenit-vhodqschij-platezh
   */
  update<T extends UpdatePaymentInOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentInModel>,
    options?: Subset<T, UpdatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>;

  /**
   * Создать входящий платеж
   *
   * @param data - Данные для создания
   * @param options - Опции для создания
   * @returns Созданный входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-sozdat-vhodqschij-platezh
   */
  create<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<PaymentInModel>,
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>;

  /**
   * Создать или обновить входящие платежи
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для создания или обновления
   * @returns Созданные или обновленные входящие платежи
   */
  upsert<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<PaymentInModel>
      | (GetModelUpdatableFields<PaymentInModel> & UpdateMeta<Entity.PaymentIn>)
    )[],
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>[]>;

  /**
   * Получить первый входящий платеж из списка
   *
   * @param options - Опции для получения
   * @returns Первый входящий платеж
   */
  first<T extends FirstPaymentInOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentInOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >;

  /**
   * Получить количество входящих платежей
   *
   * @returns Количество входящих платежей
   */
  size(): Promise<number>;

  /**
   * Удалить входящий платеж
   *
   * @param id - ID входящего платежа
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-udalit-vhodqschij-platezh
   */
  delete(id: string): Promise<void>;

  /**
   * Массовое удаление входящих платежей
   *
   * @param ids - Массив ID входящих платежей
   * @returns Результат удаления
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>;

  /**
   * Переместить входящий платеж в корзину
   *
   * @param id - ID входящего платежа
   */
  trash(id: string): Promise<void>;
}

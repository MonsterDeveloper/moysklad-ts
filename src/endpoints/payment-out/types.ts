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
import type { EmployeeModel } from "../employee";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";
import {
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  type BatchDeleteResult,
  type GetModelUpdatableFields,
  type ModelCreateOrUpdateData,
} from "../../types";

/**
 * Исходящий платёж
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
 */
export interface PaymentOut extends Idable, Meta<Entity.PaymentOut> {
  /** ID учетной записи */
  readonly accountId: string;
  /** Метаданные контрагента, сотрудника или юр.лица */
  agent: Meta<Entity.Counterparty>;
  /** Метаданные счета контрагента или юр.лица */
  agentAccount?: Meta<Entity.Account>;
  /** Отметка о проведении */
  applicable: boolean;
  /**
   * Коллекция метаданных доп. полей.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-rabota-s-dopolnitel-nymi-polqmi
   */
  attributes?: unknown[]; // TODO add attributes
  /** Код Исходящего платежа */
  code?: string;
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>;
  /** Дата создания */
  readonly created: DateTime;
  /** Момент последнего удаления Исходящего платежа */
  readonly deleted?: DateTime;
  /** Комментарий Исходящего платежа */
  description?: string;
  /** Метаданные Статьи расходов */
  expenseItem: Meta<Entity.ExpenseItem>;
  /** Внешний код Исходящего платежа */
  externalCode: string;
  /**
   * Метаданные массива Файлов (Максимальное количество файлов - 100)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files: Meta<never>[]; // TODO add files
  /** Отдел сотрудника */
  group: Meta<Entity.Group>;
  /** Дата документа */
  moment: DateTime;
  /** Наименование Исходящего платежа */
  name: string;
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>;
  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>;
  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>;
  /** Назначение платежа */
  paymentPurpose: string;
  /** Напечатан ли документ */
  readonly printed: boolean;
  /** Метаданные проекта */
  project?: Meta<Entity.Project>;
  /**
   * Валюта
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-obschie-swedeniq-valuta-w-dokumentah
   */
  rate: DocumentRate; // TODO expand rate's currency
  /** Метаданные канала продаж */
  salesChannel?: Meta<Entity.SalesChannel>;
  /** Общий доступ */
  shared: boolean;
  /** Метаданные статуса Исходящего платежа */
  state?: Meta<Entity.State>;
  /** Сумма Входящего платежа в установленной валюте */
  sum: number;
  /** ID синхронизации. После заполнения недоступен для изменения */
  syncId?: string;
  /** Момент последнего обновления Исходящего платежа */
  readonly updated: DateTime;
  /** Сумма НДС */
  vatSum: number;
}
/**
 * Модель исходящего платежа
 *
 * {@linkcode PaymentOut}
 */
export interface PaymentOutModel extends Model {
  object: PaymentOut;
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
    | "sum";

  requiredCreateFields: "agent" | "expenseItem" | "organization";
}

export interface ListPaymentOutsOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<PaymentOutModel>;
  order?: OrderOptions<PaymentOutModel>;
  search?: string;
  filter?: FilterOptions<PaymentOutModel>;
}

export interface CreatePaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>;
}

export interface UpdatePaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>;
}

export interface GetPaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>;
}

export type FirstPaymentOutOptions = Omit<ListPaymentOutsOptions, "pagination">;
export type AllPaymentOutsOptions = Omit<ListPaymentOutsOptions, "pagination">;

/**
 * Исходящие платежи
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
 */
export interface PaymentOutEndpoint {
  /**
   * Получить список исходящих платежей.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком исходящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.paymentOut.list();
   * ```
   */
  list<T extends ListPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentOutsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  >;

  /**
   * Получить все исходящие платежи с пагинацией.
   *
   * @param options - Опции для получения списка
   * @returns Массив исходящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const paymentOuts = await moysklad.paymentOut.all();
   * ```
   */
  all<T extends AllPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<PaymentOutModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >;

  /**
   * Получить первый исходящий платеж.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком исходящих платежей (лимит 1)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const { rows: [paymentOut] } = await moysklad.paymentOut.first();
   * ```
   */
  first<T extends FirstPaymentOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentOutOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  >;

  /**
   * Получить исходящий платеж по ID.
   *
   * @param id - ID исходящего платежа
   * @param options - Опции для получения
   * @returns Исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const paymentOut = await moysklad.paymentOut.get("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  get<T extends GetPaymentOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>;

  /**
   * Получить размер списка исходящих платежей.
   *
   * @returns Размер списка исходящих платежей
   *
   * @example
   * ```ts
   * const size = await moysklad.paymentOut.size();
   * ```
   */
  size(): Promise<number>;

  /**
   * Удалить исходящий платеж.
   *
   * @param id - ID исходящего платежа
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-udalit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * await moysklad.paymentOut.delete("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  delete(id: string): Promise<void>;

  /**
   * Обновить исходящий платеж.
   *
   * @param id - ID исходящего платежа
   * @param data - Данные для обновления
   * @param options - Опции для обновления
   * @returns Обновленный исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-izmenit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const updatedPaymentOut = await moysklad.paymentOut.update(
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   { name: "00002" }
   * );
   * ```
   */
  update<T extends UpdatePaymentOutOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentOutModel>,
    options?: Subset<T, UpdatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>;

  /**
   * Создать исходящий платеж.
   *
   * @param data - Данные для создания
   * @param options - Опции для создания
   * @returns Созданный исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-sozdat-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const newPaymentOut = await moysklad.paymentOut.create({
   *   organization: {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/a7404318-550f-11e8-56c0-001b21c78cd9",
   *       type: "organization",
   *       mediaType: "application/json"
   *     }
   *   },
   *   agent: {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404318-550f-11e8-56c0-001b21c78cd9",
   *       type: "counterparty",
   *       mediaType: "application/json"
   *     }
   *   },
   *   sum: 100000
   * });
   * ```
   */
  create<T extends CreatePaymentOutOptions = Record<string, unknown>>(
    data: ModelCreateOrUpdateData<PaymentOutModel>,
    options?: Subset<T, CreatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>;

  /**
   * Массовое удаление исходящих платежей.
   *
   * @param ids - Массив ID исходящих платежей
   * @returns Результат массового удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-massowoe-udalenie-ishodqschih-platezhej
   *
   * @example
   * ```ts
   * const result = await moysklad.paymentOut.batchDelete([
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   "a7404318-550f-11e8-56c0-001b21c78cd8"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>;

  /**
   * Переместить исходящий платеж в корзину.
   *
   * @param id - ID исходящего платежа
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschij-platezh-peremestit-w-korzinu
   *
   * @example
   * ```ts
   * await moysklad.paymentOut.trash("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  trash(id: string): Promise<void>;
}

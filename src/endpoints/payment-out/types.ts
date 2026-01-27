import type {
  AccountModel,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  DocumentRate,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  ProjectModel,
  StateModel,
  StringFilter,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Исходящий платёж
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
 */
export interface PaymentOut extends Idable, Meta<Entity.PaymentOut> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные контрагента, сотрудника или юр.лица */
  agent: Meta<Entity.Counterparty>
  /** Метаданные счета контрагента или юр.лица */
  agentAccount?: Meta<Entity.Account>
  /** Отметка о проведении */
  applicable: boolean
  /**
   * Коллекция метаданных доп. полей.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-rabota-s-dopolnitel-nymi-polqmi
   */
  attributes?: unknown[] // TODO add attributes
  /** Код Исходящего платежа */
  code?: string
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Исходящего платежа */
  readonly deleted?: DateTime
  /** Комментарий Исходящего платежа */
  description?: string
  /** Метаданные Статьи расходов */
  expenseItem: Meta<Entity.ExpenseItem>
  /** Внешний код Исходящего платежа */
  externalCode: string
  /**
   * Метаданные массива Файлов (Максимальное количество файлов - 100)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files: Meta<never>[] // TODO add files
  /** Отдел сотрудника */
  group: Meta<Entity.Group>
  /** Дата документа */
  moment: DateTime
  /** Наименование Исходящего платежа */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>
  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>
  /** Назначение платежа */
  paymentPurpose: string
  /** Напечатан ли документ */
  readonly printed: boolean
  /** Метаданные проекта */
  project?: Meta<Entity.Project>
  /**
   * Валюта
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-obschie-swedeniq-valuta-w-dokumentah
   */
  rate: DocumentRate // TODO expand rate's currency
  /** Метаданные канала продаж */
  salesChannel?: Meta<Entity.SalesChannel>
  /** Общий доступ */
  shared: boolean
  /** Метаданные статуса Исходящего платежа */
  state?: Meta<Entity.State>
  /** Сумма Входящего платежа в установленной валюте */
  sum: number
  /** ID синхронизации. После заполнения недоступен для изменения */
  syncId?: string
  /** Момент последнего обновления Исходящего платежа */
  readonly updated: DateTime
  /** Сумма НДС */
  vatSum: number
}
/**
 * Модель исходящего платежа
 *
 * {@linkcode PaymentOut}
 */
export interface PaymentOutModel extends Model {
  object: PaymentOut
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    state: StateModel
    project: ProjectModel
    // TODO: expand contract, files, salesChannel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    agent: IdFilter
    agentAccount: IdFilter
    applicable: BooleanFilter
    code: StringFilter
    contract: IdFilter
    created: DateTimeFilter
    deleted: DateTimeFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    incomingDate: DateTimeFilter
    incomingNumber: NumberFilter
    moment: DateTimeFilter
    name: StringFilter
    organization: IdFilter
    organizationAccount: IdFilter
    owner: IdFilter
    paymentPurpose: StringFilter
    printed: BooleanFilter
    project: IdFilter
    published: BooleanFilter
    shared: BooleanFilter
    salesChannel: IdFilter
  }
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

  requiredCreateFields: "agent" | "expenseItem" | "organization"
}

export interface ListPaymentOutsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<PaymentOutModel>
  order?: OrderOptions<PaymentOutModel>
  search?: string
  filter?: FilterOptions<PaymentOutModel>
}

export interface CreatePaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>
}

export interface UpdatePaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>
}

export interface GetPaymentOutOptions {
  expand?: ExpandOptions<PaymentOutModel>
}

export type FirstPaymentOutOptions = Omit<ListPaymentOutsOptions, "pagination">
export type AllPaymentOutsOptions = Omit<ListPaymentOutsOptions, "pagination">

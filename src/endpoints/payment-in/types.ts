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
 * Входящий платеж
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh
 */
export interface PaymentIn extends Idable, Meta<Entity.PaymentIn> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные контрагента */
  agent: Meta<Entity.Counterparty>

  /** Метаданные счета контрагента */
  agentAccount?: Meta<Entity.Account>

  /** Отметка о проведении */
  applicable: boolean

  /** Коллекция метаданных доп. полей */
  attributes?: unknown // TODO add attributes

  /** Код Входящего платежа */
  code?: string

  /** Метаданные договора */
  contract?: Meta<Entity.Contract>

  /** Дата создания */
  readonly created: DateTime

  /** Момент последнего удаления Входящего платежа */
  readonly deleted?: DateTime

  /** Комментарий Входящего платежа */
  description?: string

  /** Внешний код Входящего платежа */
  externalCode: string

  /** Ссылка на Счет-фактуру выданный, с которым связан этот платеж */
  factureOut?: Meta<Entity.FactureOut>

  /** Метаданные массива Файлов (Максимальное количество файлов - 100) */
  files?: unknown[] // TODO add files

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Входящая дата */
  incomingDate?: DateTime

  /** Входящий номер */
  incomingNumber?: number

  /** Дата документа */
  moment: DateTime

  /** Наименование Входящего платежа */
  name: string

  /** Массив ссылок на связанные операции */
  operations?: Array<{
    meta: Meta<
      | Entity.CustomerOrder
      | Entity.PurchaseReturn
      | Entity.Demand
      | Entity.InvoiceOut
      | Entity.CommissionReportIn
      | Entity.RetailShift
    >
    linkedSum?: number
  }>

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

  /** Опубликован ли документ */
  readonly published: boolean

  /** Валюта */
  rate: DocumentRate // TODO expand rate's currency

  /** Метаданные канала продаж */
  salesChannel?: Meta<Entity.SalesChannel>

  /** Общий доступ */
  shared: boolean

  /** Метаданные статуса Входящего платежа */
  state?: Meta<Entity.State>

  /** Сумма Входящего платежа в установленной валюте */
  sum: number

  /** ID синхронизации. После заполнения недоступен для изменения */
  syncId?: string

  /** Момент последнего обновления Входящего платежа */
  readonly updated: DateTime

  /** Сумма НДС */
  vatSum?: number
}

/**
 * Модель для работы с входящими платежами
 */
export interface PaymentInModel extends Model {
  object: PaymentIn
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    state: StateModel
    project: ProjectModel
    // TODO: expand contract, factureOut, files, salesChannel
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
    state: IdFilter
    sum: NumberFilter
    syncId: IdFilter
    updated: DateTimeFilter
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
    | "created"
    | "paymentPurpose"
    | "incomingDate"
    | "incomingNumber"

  requiredCreateFields: "agent" | "organization"
}

/**
 * Опции для получения списка входящих платежей
 */
export interface ListPaymentInsOptions {
  /** Опции пагинации */
  pagination?: PaginationOptions
  /** Опции раскрытия связанных сущностей */
  expand?: ExpandOptions<PaymentInModel>
  /** Опции сортировки */
  order?: OrderOptions<PaymentInModel>
  /** Поисковая строка */
  search?: string
  /** Опции фильтрации */
  filter?: FilterOptions<PaymentInModel>
}

/**
 * Опции для получения входящего платежа
 */
export interface GetPaymentInOptions {
  /** Опции раскрытия связанных сущностей */
  expand?: ExpandOptions<PaymentInModel>
}

/**
 * Опции для обновления входящего платежа
 */
export interface UpdatePaymentInOptions {
  /** Опции раскрытия связанных сущностей */
  expand?: ExpandOptions<PaymentInModel>
}

/**
 * Опции для создания входящего платежа
 */
export interface CreatePaymentInOptions {
  /** Опции раскрытия связанных сущностей */
  expand?: ExpandOptions<PaymentInModel>
}

/** Опции для получения первого входящего платежа */
export type FirstPaymentInOptions = Omit<ListPaymentInsOptions, "pagination">

/** Опции для получения всех входящих платежей */
export type AllPaymentInsOptions = Omit<ListPaymentInsOptions, "pagination">

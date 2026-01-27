import type {
  AccountModel,
  AssortmentEntity,
  AssortmentModel,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  DocumentRate,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  ListMeta,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Позиция заказа поставщику
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-zakazy-pokupatelqm-pozicii-zakaza-pokupatelq
 */
export interface PurchaseOrderPosition
  extends Idable,
    Meta<Entity.PurchaseOrderPosition> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные товара/услуги/серии/модификации, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>
  /** Процент скидки или наценки */
  discount: number
  /** Упаковка Товара */
  pack?: unknown // TODO add pack type
  /** Цена товара/услуги в копейках */
  price: number
  /** Количество товаров/услуг данного вида в позиции */
  quantity: number
  /** Принято */
  shipped: number
  /** Ожидание */
  inTransit: number
  /** НДС, которым облагается текущая позиция */
  vat: number
  /** Включен ли НДС для позиции */
  vatEnabled: boolean
}

/**
 * Модель позиции заказа поставщику
 */
export interface PurchaseOrderPositionModel extends Model {
  object: PurchaseOrderPosition
  expandable: {
    assortment: AssortmentModel
  }
}

/**
 * Заказ поставщику
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq
 */
export interface PurchaseOrder extends Idable, Meta<Entity.PurchaseOrder> {
  /** ID учетной записи */
  readonly accountId: string
  /** Метаданные контрагента */
  agent: Meta<Entity.Counterparty>
  /** Метаданные счета контрагента */
  agentAccount?: Meta<Entity.Account>
  /** Отметка о проведении */
  applicable: boolean
  /** Коллекция метаданных доп. полей */
  attributes?: unknown[] // TODO add attributes type
  /** Код Заказа поставщику */
  code?: string
  /** Метаданные договора */
  contract?: Meta<Entity.Contract>
  /** Дата создания */
  readonly created: DateTime
  /** Момент последнего удаления Заказа поставщику */
  readonly deleted?: DateTime
  /** Планируемая дата отгрузки */
  deliveryPlannedMoment?: DateTime
  /** Комментарий Заказа поставщику */
  description?: string
  /** Внешний код Заказа поставщику */
  externalCode: string
  /** Метаданные массива Файлов */
  files: unknown[] // TODO add files type
  /** Отдел сотрудника */
  group: Meta<Entity.Group>
  /** Сумма счетов поставщику */
  readonly invoicedSum: number
  /** Дата документа */
  moment: DateTime
  /** Наименование Заказа поставщику */
  name: string
  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>
  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>
  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>
  /** Сумма входящих платежей по Заказу */
  readonly payedSum: number
  /** Метаданные позиций Заказа поставщику */
  positions: ListMeta<Entity.PurchaseOrderPosition>
  /** Напечатан ли документ */
  readonly printed: boolean
  /** Метаданные проекта */
  project?: Meta<Entity.Project>
  /** Опубликован ли документ */
  readonly published: boolean
  /** Валюта */
  rate: DocumentRate
  /** Общий доступ */
  shared: boolean
  /** Сумма принятого */
  readonly shippedSum: number
  /** Метаданные статуса заказа */
  state?: Meta<Entity.State>
  /** Метаданные склада */
  store?: Meta<Entity.Store>
  /** Сумма Заказа поставщику в установленной валюте */
  readonly sum: number
  /** ID синхронизации */
  syncId?: string
  /** Момент последнего обновления */
  readonly updated: DateTime
  /** Учитывается ли НДС */
  vatEnabled: boolean
  /** Включен ли НДС в цену */
  vatIncluded?: boolean
  /** Сумма НДС */
  readonly vatSum: number
  /** Сумма товаров в пути */
  readonly waitSum: number
}

/**
 * Модель заказа поставщику
 */
export interface PurchaseOrderModel extends Model {
  object: PurchaseOrder
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: PurchaseOrderPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    agent: IdFilter
    applicable: BooleanFilter
    code: StringFilter
    contract: IdFilter
    created: DateTimeFilter
    deleted: DateTimeFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    moment: DateTimeFilter
    name: StringFilter
    organization: IdFilter
    owner: IdFilter
    printed: BooleanFilter
    project: IdFilter
    published: BooleanFilter
    shared: BooleanFilter
    state: IdFilter
    store: IdFilter
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
  requiredCreateFields: "agent" | "organization"
}

export interface ListPurchaseOrdersOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<PurchaseOrderModel>
  order?: OrderOptions<PurchaseOrderModel>
  search?: string
  filter?: FilterOptions<PurchaseOrderModel>
}

export interface GetPurchaseOrderOptions {
  expand?: ExpandOptions<PurchaseOrderModel>
}

export interface UpdatePurchaseOrderOptions {
  expand?: ExpandOptions<PurchaseOrderModel>
}

export interface CreatePurchaseOrderOptions {
  expand?: ExpandOptions<PurchaseOrderModel>
}

export type FirstPurchaseOrderOptions = Omit<
  ListPurchaseOrdersOptions,
  "pagination"
>
export type AllPurchaseOrdersOptions = Omit<
  ListPurchaseOrdersOptions,
  "pagination"
>

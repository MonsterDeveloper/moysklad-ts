import type {
  AccountModel,
  AssortmentEntity,
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
  Metadata,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  PositionFields,
  ProjectModel,
  StateModel,
  StoreModel,
  StringFilter,
  UpdateMeta,
} from "../../types"
import type { CounterpartyModel } from "../counterparty"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Позиция Возврата покупателя
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-pozicii-wozwrata-pokupatelq
 */
export interface SalesReturnPosition extends Idable, Meta<Entity.SalesReturn> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные товара/услуги/серии/модификации, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>

  /**
   * Себестоимость
   *
   * Выводится, если документ был создан без основания
   */
  cost?: number

  /** Метаданные Страны */
  country?: Meta<Entity.Country>

  /** Процент скидки или наценки. Наценка указывается отрицательным числом, т.е. -10 создаст наценку в 10% */
  discount?: number

  /** ГТД */
  gtd?: unknown // TODO add GTD type

  /** Упаковка Товара */
  pack?: unknown // TODO add pack type

  /** Цена товара/услуги в копейках */
  price: number

  /**
   * Количество товаров/услуг данного вида в позиции.
   *
   * Если позиция - товар, у которого включен учет по серийным номерам, то значение в этом поле всегда будет равно количеству серийных номеров для данной позиции в документе.
   */
  quantity: number

  /** Ячейка на складе */
  slot?: Meta<Entity.Slot>

  /**
   * Серийные номера.
   *
   * Значение данного атрибута игнорируется, если товар позиции не находится на серийном учете.
   * В ином случае количество товаров в позиции будет равно количеству серийных номеров, переданных в значении атрибута.
   */
  things?: string[]

  /** НДС, которым облагается текущая позиция */
  vat: number

  /**
   * Включен ли НДС для позиции.
   *
   * С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС".
   * (vat = 0, vatEnabled = false) -> vat = "без НДС", (vat = 0, vatEnabled = true) -> vat = 0%.
   */
  vatEnabled: boolean
}

/**
 * Модель позиции Возврата покупателя
 */
export interface SalesReturnPositionModel extends Model {
  object: SalesReturnPosition
}

/**
 * Возврат покупателя
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq
 */
export interface SalesReturn extends Idable, Meta<Entity.SalesReturn> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные контрагента */
  agent: Meta<Entity.Counterparty>

  /** Метаданные счета контрагента */
  agentAccount?: Meta<Entity.Account>

  /** Отметка о проведении */
  applicable: boolean

  /** Коллекция метаданных доп. полей */
  attributes?: unknown[] // TODO add attributes types & filters

  /** Код Возврата Покупателя */
  code?: string

  /** Метаданные договора */
  contract?: Meta<Entity.Contract> // TODO expand contract

  /** Дата создания */
  readonly created: DateTime

  /** Момент последнего удаления Возврата Покупателя */
  readonly deleted?: DateTime

  /** Комментарий Возврата Покупателя */
  description?: string

  /** Внешний код Возврата Покупателя */
  externalCode: string

  /** Метаданные массива Файлов (Максимальное количество файлов - 100) */
  files: unknown[] // TODO add files types & expand

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** ID Возврата Покупателя */
  readonly id: string

  /** Метаданные Возврата Покупателя */
  readonly meta: Metadata<Entity.SalesReturn>

  /** Дата документа */
  moment: DateTime

  /** Наименование Возврата Покупателя */
  name: string

  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>

  /** Метаданные счета юрлица */
  organizationAccount?: Meta<Entity.Account>

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>

  /** Метаданные позиций Возврата Покупателя */
  positions: ListMeta<Entity.SalesReturn> // Using Entity.SalesReturn as a fallback

  /** Напечатан ли документ */
  readonly printed: boolean

  /** Метаданные проекта */
  project?: Meta<Entity.Project>

  /** Опубликован ли документ */
  readonly published: boolean

  /** Валюта */
  rate: DocumentRate

  /** Метаданные канала продаж */
  salesChannel?: Meta<Entity.SalesChannel> // TODO expand salesChannel

  /** Общий доступ */
  shared: boolean

  /** Метаданные статуса Возврата Покупателя */
  state?: Meta<Entity.State>

  /** Метаданные склада */
  store: Meta<Entity.Store>

  /** Сумма Возврата Покупателя в копейках */
  readonly sum: number

  /** ID синхронизации. После заполнения недоступен для изменения */
  syncId?: string

  /** Момент последнего обновления Возврата Покупателя */
  readonly updated: DateTime

  /** Учитывается ли НДС */
  vatEnabled: boolean

  /** Включен ли НДС в цену */
  vatIncluded?: boolean

  /** Сумма НДС */
  vatSum?: number

  /** Ссылка на отгрузку, по которой произошел возврат */
  demand?: Meta<Entity.Demand>

  /** Массив ссылок на связанные списания */
  losses?: Meta<Entity.Loss>[]

  /** Массив ссылок на связанные платежи */
  payments?: Meta<Entity.PaymentIn | Entity.PaymentOut>[]

  /** Сумма исходящих платежей по возврату покупателя */
  readonly payedSum?: number

  /** Ссылка на Счет-фактуру выданный, с которым связан этот возврат */
  factureOut?: Meta<Entity.FactureOut>
}

/**
 * Модель Возврата покупателя
 */
export interface SalesReturnModel extends Model {
  object: SalesReturn
  expandable: {
    agent: CounterpartyModel
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    positions: SalesReturnPositionModel
    agentAccount: AccountModel
    organizationAccount: AccountModel
    store: StoreModel
    project: ProjectModel
    state: StateModel
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
    salesChannel: IdFilter
    shared: BooleanFilter
    state: IdFilter
    store: IdFilter
    sum: NumberFilter
    syncId: IdFilter
    updated: DateTimeFilter
    isDeleted: BooleanFilter
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
  requiredCreateFields: "agent" | "organization" | "store"
}

/**
 * Опции для получения списка Возвратов покупателей
 */
export interface ListSalesReturnsOptions {
  pagination?: PaginationOptions
  fields?: PositionFields
  expand?: ExpandOptions<SalesReturnModel>
  order?: OrderOptions<SalesReturnModel>
  search?: string
  filter?: FilterOptions<SalesReturnModel>
}

/**
 * Опции для получения Возврата покупателя
 */
export interface GetSalesReturnOptions {
  expand?: ExpandOptions<SalesReturnModel>
  fields?: PositionFields
}

/**
 * Опции для создания/обновления Возвратов покупателей
 */
export interface UpsertSalesReturnsOptions {
  expand?: ExpandOptions<SalesReturnModel>
}

/**
 * Опции для получения первого Возврата покупателя из списка
 */
export type FirstSalesReturnOptions = Omit<
  ListSalesReturnsOptions,
  "pagination"
>

/**
 * Опции для получения всех Возвратов покупателей
 */
export type AllSalesReturnsOptions = Omit<ListSalesReturnsOptions, "pagination">

/**
 * Данные для создания Возврата покупателя на основе шаблона
 */
export type SalesReturnTemplateData = {
  demand: UpdateMeta<Entity.Demand>
}

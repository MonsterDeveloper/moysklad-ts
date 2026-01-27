import type {
  AssortmentEntity,
  AssortmentModel,
  Attribute,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
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
  StoreModel,
  StringFilter,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { EnterModel } from "../enter"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

export interface InventoryPosition
  extends Idable,
    Meta<Entity.InventoryPosition> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные товара/услуги/серии/модификации, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>

  /** Расчетный остаток */
  calculatedQuantity: number

  /** Разница между расчетным остатком и фактическим */
  readonly correctionAmount: number

  /** Избыток/недостача */
  readonly correctionSum: number

  /**
   * Упаковка Товара.
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-towary-atributy-wlozhennyh-suschnostej-upakowki-towara
   */
  pack?: unknown // TODO: add pack type

  /** Цена товара/услуги в копейках */
  price: number

  /** Количество товаров/услуг данного вида в позиции */
  quantity: number
}

export interface InventoryPositionModel extends Model {
  object: InventoryPosition
  expandable: {
    assortment: AssortmentModel
  }
}

export interface Inventory extends Idable, Meta<Entity.Inventory> {
  /** ID учетной записи */
  readonly accountId: string

  /** Коллекция метаданных доп. полей */
  attributes?: Attribute[]

  /** Код */
  code?: string

  /** Дата создания */
  readonly created: DateTime

  /** Момент последнего удаления */
  readonly deleted?: DateTime

  /** Комментарий */
  description?: string

  /** Внешний код */
  externalCode: string

  /** Метаданные массива Файлов */
  files: unknown[] // TODO: add files type

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Дата документа */
  moment: DateTime

  /** Наименование */
  name: string

  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>

  /** Метаданные позиций Инвентаризации */
  positions: ListMeta<Entity.InventoryPosition>

  /** Напечатан ли документ */
  readonly printed: boolean

  /** Опубликован ли документ */
  readonly published: boolean

  /** Общий доступ */
  shared: boolean

  /** Метаданные статуса Инвентаризации */
  state?: Meta<Entity.State>

  /** Метаданные склада */
  store: Meta<Entity.Store>

  /** Сумма Инвентаризации в копейках */
  readonly sum: number

  /** ID синхронизации */
  syncId?: string

  /** Момент последнего обновления */
  readonly updated: DateTime

  /** Связанные оприходования */
  enters?: Meta<Entity.Enter>[]

  /** Связанные списания */
  losses?: Meta<Entity.Loss>[] // TODO: add loss expand
}

export interface InventoryModel extends Model {
  object: Inventory
  expandable: {
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    enters: EnterModel
    positions: InventoryPositionModel
    store: StoreModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    code: StringFilter
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
    published: BooleanFilter
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
    | "name"
    | "description"
    | "externalCode"
    | "moment"
    | "sum"
    | "created"
  requiredCreateFields: "organization" | "store"
}

export interface ListInventoryOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<InventoryModel>
  order?: OrderOptions<InventoryModel>
  search?: string
  filter?: FilterOptions<InventoryModel>
  namedfilter?: string
}

export interface CreateInventoryOptions {
  expand?: ExpandOptions<InventoryModel>
}

export interface UpdateInventoryOptions {
  expand?: ExpandOptions<InventoryModel>
}

export interface GetInventoryOptions {
  expand?: ExpandOptions<InventoryModel>
}

export type FirstInventoryOptions = Omit<ListInventoryOptions, "pagination">
export type AllInventoryOptions = Omit<ListInventoryOptions, "pagination">

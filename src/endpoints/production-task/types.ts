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
  OrderOptions,
  PaginationOptions,
  StateModel,
  StoreModel,
  StringFilter,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { OrganizationModel } from "../organization"

/**
 * Позиция производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionRow extends Idable, Meta<Entity.ProductionRow> {
  /** ID учётной записи */
  readonly accountId: string

  /** Внешний код */
  externalCode?: string

  /** Наименование */
  name?: string

  /** Метаданные техкарты */
  processingPlan: Meta<Entity.ProcessingPlan>

  /** Объём производства */
  productionVolume: number

  /** Момент последнего обновления производственного задания */
  readonly updated: DateTime
}

/**
 * Модель позиции производственного задания
 *
 * {@linkcode ProductionRow}
 */
export interface ProductionRowModel extends Model {
  object: ProductionRow
}

/**
 * Продукт производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionTaskResult
  extends Idable,
    Meta<Entity.ProductionTaskResult> {
  /** ID учётной записи */
  readonly accountId: string

  /** Ассортимент */
  assortment: Meta<AssortmentEntity>

  /** Запланированное для производства количество продукта */
  planQuantity: number

  /** Метаданные Позиции производственного задания */
  readonly productionRow: Meta<Entity.ProductionRow>
}

/**
 * Модель продукта производственного задания
 *
 * {@linkcode ProductionTaskResult}
 */
export interface ProductionTaskResultModel extends Model {
  object: ProductionTaskResult

  expandable: {
    assortment: AssortmentModel
    productionRow: ProductionRowModel
  }
}

/**
 * Производственное задание
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie
 */
export interface ProductionTask extends Idable, Meta<Entity.ProductionTask> {
  /** ID учётной записи */
  readonly accountId: string

  /** Отметка о проведении */
  applicable: boolean

  /** Доп. поля */
  attributes?: Attribute[]

  /** Флаг ожидания продукта Производственного задания */
  awaiting?: boolean

  /** Код */
  code?: string

  /** Дата создания */
  readonly created: DateTime

  /** Момент удаления */
  readonly deleted?: DateTime

  /** Планируемая дата выполнения */
  deliveryPlannedMoment?: DateTime

  /** Комментарий */
  description?: string

  /** Внешний код */
  externalCode: string

  /** Метаданные массива Файлов (Максимальное количество файлов - 100) */
  files: ListMeta<Entity.Files> // TODO add files expand

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Метаданные склада материалов */
  materialsStore?: Meta<Entity.Store>

  /** Дата документа */
  moment: DateTime

  /** Наименование Производственного задания */
  name: string

  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>

  /** Напечатан ли документ */
  readonly printed: boolean

  /**
   * Метаданные Позиций производственного задания
   *
   * Для поля `productionRows` недоступен `expand` вложенных полей.
   */
  productionRows: ListMeta<Entity.ProductionRow>

  /** Дата окончания производства */
  readonly productionEnd?: DateTime

  /** Дата начала производства */
  productionStart?: DateTime

  /** Метаданные производимой продукции */
  products: ListMeta<Entity.ProductionTaskResult>

  /** Метаданные склада продукции */
  productsStore?: Meta<Entity.Store>

  /** Опубликован ли документ */
  readonly published: boolean

  /** Флаг резервирования материала Производственного задания */
  reserve?: boolean

  /** Общий доступ */
  shared: boolean

  /** Метаданные статуса Производственного задания */
  state?: Meta<Entity.State>

  /** Момент последнего обновления Производственного задания */
  readonly updated: DateTime

  /** Массив ссылок на связанные заказы покупателей в формате Метаданных */
  customerOrders?: Meta<Entity.CustomerOrder>[]
}

/**
 * Модель производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionTaskModel extends Model {
  object: ProductionTask

  expandable: {
    group: GroupModel
    organization: OrganizationModel
    owner: EmployeeModel
    productionRows: ProductionRowModel
    products: ProductionTaskResultModel
    materialsStore: StoreModel
    productsStore: StoreModel
    state: StateModel
  }

  requiredCreateFields: "organization"

  filters: {
    id: IdFilter
    accountId: IdFilter
    code: StringFilter
    deleted: DateTimeFilter
    deliveryPlannedMoment: DateTimeFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    moment: DateTimeFilter
    name: StringFilter
    organization: IdFilter
    owner: IdFilter
    shared: BooleanFilter
    updated: DateTimeFilter
  }
}

export interface ListProductionTasksOptions {
  /**
   * Опции пагинации
   *
   * {@linkcode PaginationOptions}
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *  pagination: { limit: 10, offset: 0 },
   * })
   * ```
   */
  pagination?: PaginationOptions

  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>

  /**
   * Опции сортировки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/workbook/#workbook-fil-traciq-listanie-poisk-i-sortirowka-sortirowka
   *
   * @example Одно поле
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   order: { field: "moment", direction: "asc" },
   * })
   * ```
   *
   * @example Несколько полей
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   order: [
   *     { field: "moment", direction: "asc" },
   *     { field: "created", direction: "desc" },
   *   ],
   * })
   * ```
   */
  order?: OrderOptions<ProductionTaskModel>

  /**
   * Контекстный поиск
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-kontextnyj-poisk
   */
  search?: string

  /**
   * Фильтры
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-fil-traciq-wyborki-s-pomosch-u-parametra-filter
   *
   * @example
   * ```ts
   * await moysklad.productionTask.list({
   *   filter: {
   *     name: {
   *       sw: "test",
   *     }
   *   }
   * });
   * ```
   */
  filter?: FilterOptions<ProductionTaskModel>
}

export type AllProductionTasksOptions = Omit<
  ListProductionTasksOptions,
  "pagination"
>

export type FirstProductionTaskOptions = Omit<
  ListProductionTasksOptions,
  "pagination"
>

export interface GetProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.get("123", {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>
}

export interface UpdateProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.update("123", {...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>
}

export interface CreateProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.create({...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>
}

import type {
  ArchivedFilter,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StringFilter,
  TaxSystem,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/**
 * Группа товаров
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow
 */
export interface ProductFolder extends Idable, Meta<Entity.ProductFolder> {
  /** ID учетной записи */
  readonly accountId: string

  /** Добавлена ли Группа товаров в архив */
  readonly archived: boolean

  /** Код Группы товаров */
  code?: string

  /** Описание Группы товаров */
  description?: string

  /** Реальный НДС % */
  readonly effectiveVat?: number

  /** Дополнительный признак для определения разграничения реального НДС = 0 или "без НДС". (effectiveVat = 0, effectiveVatEnabled = false) -> "без НДС", (effectiveVat = 0, effectiveVatEnabled = true) -> 0%. */
  readonly effectiveVatEnabled?: boolean

  /** Внешний код Группы товаров */
  externalCode: string

  /** Метаданные отдела сотрудника */
  group: Meta<Entity.Group>

  /** Наименование Группы товаров */
  name: string

  /** Метаданные владельца (Сотрудника) */
  owner?: Meta<Entity.Employee>

  /** Наименование Группы товаров, в которую входит данная Группа товаров */
  readonly pathName: string

  /** Ссылка на Группу товаров, в которую входит данная Группа товаров, в формате Метаданных */
  productFolder?: Meta<Entity.ProductFolder>

  /** Общий доступ */
  shared: boolean

  /** Код системы налогообложения */
  taxSystem?: TaxSystem

  /** Момент последнего обновления сущности */
  readonly updated: DateTime

  /** Используется ли ставка НДС родительской группы. Если true для единицы ассортимента будет применена ставка, установленная для родительской группы. */
  useParentVat: boolean

  /** НДС % */
  vat?: number

  /** Включен ли НДС для группы. С помощью этого флага для группы можно выставлять НДС = 0 или НДС = "без НДС". (vat = 0, vatEnabled = false) -> vat = "без НДС", (vat = 0, vatEnabled = true) -> vat = 0%. */
  vatEnabled?: boolean
}

export interface ProductFolderModel extends Model {
  /** Основная сущность группы товаров {@linkcode ProductFolder} */
  object: ProductFolder

  expandable: {
    owner: EmployeeModel
    group: GroupModel
    productFolder: ProductFolderModel
  }

  orderableFields:
    | "id"
    | "code"
    | "externalCode"
    | "name"
    | "updated"
    | "archived"
    | "pathName"

  requiredCreateFields: "name"

  filters: {
    accountId: IdFilter
    archived: ArchivedFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    id: IdFilter
    name: StringFilter
    owner: IdFilter
    pathName: StringFilter
    shared: BooleanFilter
    updated: DateTimeFilter
    updatedBy: IdFilter
  }
}

export interface ListProductFoldersOptions {
  /**
   * Опции пагинации
   *
   * {@linkcode PaginationOptions}
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.list({
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
   * const { rows } = await moysklad.productFolder.list({
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     productFolder: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductFolderModel>

  /**
   * Опции сортировки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/workbook/#workbook-fil-traciq-listanie-poisk-i-sortirowka-sortirowka
   *
   * @example Одно поле
   * ```ts
   * const { rows } = await moysklad.productFolder.list({
   *   order: { field: "name", direction: "asc" },
   * })
   * ```
   *
   * @example Несколько полей
   * ```ts
   * const { rows } = await moysklad.productFolder.list({
   *   order: [
   *     { field: "name", direction: "asc" },
   *     { field: "updated", direction: "desc" },
   *   ],
   * })
   * ```
   */
  order?: OrderOptions<ProductFolderModel>

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
   * await moysklad.productFolder.list({
   *   filter: {
   *     name: {
   *       sw: "test",
   *     }
   *   }
   * });
   * ```
   */
  filter?: FilterOptions<ProductFolderModel>
}

export type AllProductFoldersOptions = Omit<
  ListProductFoldersOptions,
  "pagination"
>

export type FirstProductFolderOptions = Omit<
  ListProductFoldersOptions,
  "pagination"
>

export interface GetProductFolderOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.get("123", {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     productFolder: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductFolderModel>
}

export interface UpdateProductFolderOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.update("123", {...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     productFolder: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductFolderModel>
}

export interface CreateProductFolderOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.create({...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     productFolder: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductFolderModel>
}

export interface UpsertProductFolderOptions {
  expand?: ExpandOptions<ProductFolderModel>
}

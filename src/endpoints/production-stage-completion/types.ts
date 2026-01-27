import type {
  AssortmentEntity,
  AssortmentModel,
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
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/**
 * Выполнение этапа производства
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa-vypolneniq-atapow-proizwodstwa
 */
export interface ProductionStageCompletion
  extends Idable,
    Meta<Entity.ProductionStageCompletion> {
  /** ID учетной записи */
  readonly accountId: string

  /** Дата создания */
  readonly created: DateTime

  /** Внешний код Выполнения этапа производства */
  externalCode: string

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Оплата труда за единицу объема производства */
  labourUnitCost: number

  /** Нормо-часы единицы объема производства */
  standardHourUnit: number

  /** Метаданные Материалов выполнения этапа производства */
  materials?: ListMeta<AssortmentEntity>

  /** Дата документа */
  moment: DateTime

  /** Наименование Выполнения этапа производства */
  name: string

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>

  /** Исполнитель (Сотрудник) */
  performer?: Meta<Entity.Employee>

  /** Затраты на единицу объема производства */
  processingUnitCost: number

  /** Производственный этап */
  readonly productionStage: Meta<Entity.ProductionStage>

  /** Объем производства */
  productionVolume: number

  /** Метаданные Продуктов выполнения этапа производства */
  products?: ListMeta<AssortmentEntity>

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления Выполнения этапа производства */
  readonly updated: DateTime
}

export interface ProductionStageCompletionModel extends Model {
  object: ProductionStageCompletion
  expandable: {
    group: GroupModel
    materials: AssortmentModel
    owner: EmployeeModel
    performer: EmployeeModel
    // productionStage: ProductionStageModel;
    products: AssortmentModel
  }
  filters: {
    id: IdFilter
    moment: DateTimeFilter
  }
  requiredCreateFields: "productionStage" | "productionVolume"
}

export interface ListProductionStageCompletionsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductionStageCompletionModel>
  order?: OrderOptions<ProductionStageCompletionModel>
  filter?: FilterOptions<ProductionStageCompletionModel>
}

export interface CreateProductionStageCompletionOptions {
  expand?: ExpandOptions<ProductionStageCompletionModel>
}

export interface UpdateProductionStageCompletionOptions {
  expand?: ExpandOptions<ProductionStageCompletionModel>
}

export interface GetProductionStageCompletionOptions {
  expand?: ExpandOptions<ProductionStageCompletionModel>
}

export type FirstProductionStageCompletionOptions = Omit<
  ListProductionStageCompletionsOptions,
  "pagination"
>
export type AllProductionStageCompletionOptions = Omit<
  ListProductionStageCompletionsOptions,
  "pagination"
>

/**
 * Материал выполнения этапа производства
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa-materialy-wypolneniq-atapa-proizwodstwa
 */
export interface ProductionStageCompletionMaterial
  extends Idable,
    Meta<Entity.ProductionStageCompletionMaterial> {
  /** ID учетной записи */
  readonly accountId: string

  /** Израсходованное количество */
  consumedQuantity: number

  /** Метаданные ассортимента */
  assortment: Meta<AssortmentEntity>

  /** Серийные номера (только для товаров с серийным учетом) */
  things?: string[]
}
export interface ProductionStageCompletionMaterialModel extends Model {
  object: ProductionStageCompletionMaterial
  expandable: {
    assortment: AssortmentModel
  }
  requiredCreateFields: "consumedQuantity" | "assortment"
}

export interface ListProductionStageCompletionMaterialsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductionStageCompletionMaterialModel>
}

export interface CreateProductionStageCompletionMaterialOptions {
  expand?: ExpandOptions<ProductionStageCompletionMaterialModel>
}

export interface UpdateProductionStageCompletionMaterialOptions {
  expand?: ExpandOptions<ProductionStageCompletionMaterialModel>
}

export type FirstProductionStageCompletionMaterialOptions = Omit<
  ListProductionStageCompletionMaterialsOptions,
  "pagination"
>
export type AllProductionStageCompletionMaterialOptions = Omit<
  ListProductionStageCompletionMaterialsOptions,
  "pagination"
>

/**
 * Продукт выполнения этапа производства
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa-produkty-wypolneniq-atapa-proizwodstwa
 */
export interface ProductionStageCompletionResult
  extends Idable,
    Meta<Entity.ProductionStageCompletionResult> {
  /** ID учетной записи */
  readonly accountId: string

  /** Произведённое количество */
  producedQuantity: number

  /** Метаданные ассортимента */
  readonly assortment: Meta<AssortmentEntity>

  /** Серийные номера (только для товаров с серийным учетом) */
  things?: string[]
}

export interface ProductionStageCompletionResultModel extends Model {
  object: ProductionStageCompletionResult
  expandable: {
    assortment: AssortmentModel
  }
}

export interface ListProductionStageCompletionResultsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductionStageCompletionResultModel>
}
export interface UpdateProductionStageCompletionResultOptions {
  expand?: ExpandOptions<ProductionStageCompletionResultModel>
}

export type FirstProductionStageCompletionResultOptions = Omit<
  ListProductionStageCompletionResultsOptions,
  "pagination"
>
export type AllProductionStageCompletionResultOptions = Omit<
  ListProductionStageCompletionResultsOptions,
  "pagination"
>

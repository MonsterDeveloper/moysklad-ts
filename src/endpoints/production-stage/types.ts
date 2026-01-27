import type { SetRequired } from "type-fest"
import type {
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
  StoreModel,
} from "../../types"
import type { ProcessingStageModel } from "../processing-stage"
import type { ProductionRowModel } from "../production-task"

/**
 * Производственные этапы
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy
 */
export interface ProductionStage extends Idable, Meta<Entity.ProductionStage> {
  /** ID учетной записи */
  readonly accountId: string

  /** Затраты на оплату труда за единицу объема производства */
  labourUnitCost?: number

  /** Метаданные Материалов производственного этапа */
  materials: {
    /** ID учетной записи */
    readonly accountId: string
    /** Метаданные товара/услуги/серии/модификации */
    assortment: Meta<Entity.Assortment>
    /** ID позиции */
    readonly id: string
    /** Количество товаров/модификаций данного вида в позиции */
    planQuantity: number
  }[]

  /** Метаданные склада материалов */
  readonly materialStore?: Meta<Entity.Store>

  /** Индекс Производственного этапа в Позиции производственного задания */
  readonly orderingPosition: number

  /** Метаданные Этапа производства */
  readonly stage: Meta<Entity.ProcessingStage>

  /** Метаданные Позиции производственного задания */
  readonly productionRow: Meta<Entity.ProductionRow>

  /** Объем Производственного этапа. Соответствует объему Позиции производственного задания */
  readonly totalQuantity?: number

  /** Выполненное количество */
  readonly completedQuantity?: number

  /** Количество, доступное к выполнению */
  readonly availableQuantity?: number

  /** Количество, которое на данный момент выполнять нельзя */
  readonly blockedQuantity?: number

  /** Количество, которое не будет выполнено */
  readonly skippedQuantity?: number

  /** Затраты на единицу объема производства */
  processingUnitCost?: number

  /** Нормо-часы единицы объема производства */
  standardHourUnit?: number
}

export interface ProductionStageModel extends Model {
  /** Основная сущность производственного этапа {@linkcode ProductionStage} */
  object: ProductionStage

  expandable: {
    stage: ProcessingStageModel
    productionRow: ProductionRowModel
    materialStore: StoreModel
  }

  orderableFields:
    | "id"
    | "accountId"
    | "labourUnitCost"
    | "orderingPosition"
    | "totalQuantity"
    | "completedQuantity"
    | "availableQuantity"
    | "blockedQuantity"
    | "skippedQuantity"
    | "processingUnitCost"
    | "standardHourUnit"

  requiredCreateFields: "stage" | "productionRow"

  filters: {
    accountId: IdFilter
    id: IdFilter
    productionTask: IdFilter
    labourUnitCost: NumberFilter
    materialStore: IdFilter
    orderingPosition: NumberFilter
    stage: IdFilter
    productionRow: IdFilter
    totalQuantity: NumberFilter
    completedQuantity: NumberFilter
    availableQuantity: NumberFilter
    blockedQuantity: NumberFilter
    skippedQuantity: NumberFilter
    processingUnitCost: NumberFilter
    standardHourUnit: NumberFilter
  }
}

export interface ListProductionStagesOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductionStageModel>
  order?: OrderOptions<ProductionStageModel>
  search?: string
  filter: SetRequired<FilterOptions<ProductionStageModel>, "productionTask">
}

export type AllProductionStagesOptions = Omit<
  ListProductionStagesOptions,
  "pagination"
>

export type FirstProductionStageOptions = Omit<
  ListProductionStagesOptions,
  "pagination"
>

export interface GetProductionStageOptions {
  expand?: ExpandOptions<ProductionStageModel>
}

export interface UpdateProductionStageOptions {
  expand?: ExpandOptions<ProductionStageModel>
}

/**
 * Материалы производственного этапа
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy
 */
export interface ProductionTaskMaterial
  extends Idable,
    Meta<Entity.ProductionTaskMaterial> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные товара/услуги/серии/модификации */
  assortment: Meta<Entity.Assortment>

  /** Количество товаров/модификаций данного вида в позиции */
  planQuantity: number
}

export interface ProductionTaskMaterialModel extends Model {
  object: ProductionTaskMaterial

  expandable: {
    assortment: Model
  }

  orderableFields: "id" | "accountId" | "planQuantity"

  requiredCreateFields: "assortment" | "planQuantity"

  filters: {
    accountId: IdFilter
    id: IdFilter
    planQuantity: NumberFilter
  }
}

export interface ListProductionTaskMaterialsOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProductionTaskMaterialModel>
  order?: OrderOptions<ProductionTaskMaterialModel>
  search?: string
  filter?: FilterOptions<ProductionTaskMaterialModel>
}

export type AllProductionTaskMaterialsOptions = Omit<
  ListProductionTaskMaterialsOptions,
  "pagination"
>

export type FirstProductionTaskMaterialOptions = Omit<
  ListProductionTaskMaterialsOptions,
  "pagination"
>

export interface GetProductionTaskMaterialOptions {
  expand?: ExpandOptions<ProductionTaskMaterialModel>
}

export interface UpdateProductionTaskMaterialOptions {
  expand?: ExpandOptions<ProductionTaskMaterialModel>
}

export interface CreateProductionTaskMaterialOptions {
  expand?: ExpandOptions<ProductionTaskMaterialModel>
}

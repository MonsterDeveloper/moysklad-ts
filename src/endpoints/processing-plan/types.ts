import type {
  AssortmentEntity,
  AssortmentModel,
  Attribute,
  DateTime,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  ListMeta,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { ProcessingPlanFolderModel } from "../processing-plan-folder"
import type { ProcessingProcessModel } from "../processing-process"
import type { ProductModel } from "../product"

/** Тип распределения себестоимости */
export enum ProcessingPlanCostDistributionType {
  ByPrice = "BY_PRICE",
  ByProduction = "BY_PRODUCTION",
}

/**
 * Этап техкарты
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-jetapy-tehkarty
 */
export interface ProcessingPlanStage
  extends Idable,
    Meta<Entity.ProcessingPlanStages> {
  /** Стоимость производства, на определенном этапе */
  cost: number

  /** Оплата труда, на определенном этапе */
  labourCost: number

  /** Нормо-часы, на определенном этапе */
  standardHour: number

  /** Метаданные позиции техпроцесса */
  processingProcessPosition: Meta<Entity.ProcessingProcessPosition>
}

export interface ProcessingPlanStageModel extends Model {
  object: ProcessingPlanStage
}

/**
 * Материал техкарты
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-materialy-tehkarty
 */
export interface ProcessingPlanMaterial
  extends Idable,
    Meta<Entity.ProcessingPlanMaterial> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные товара или модификации позиции */
  assortment: Meta<AssortmentEntity>

  /** Метаданные товара позиции.
   *
   * В случае, если в поле assortment указана модификация, то это поле содержит товар, к которому относится эта модификация
   */
  product: Meta<Entity.Product>

  /** Количество товаров данного вида в позиции */
  quantity: number

  /** Метаданные позиции Техпроцесса */
  processingProcessPosition: Meta<Entity.ProcessingProcessPosition>

  /** Метаданные техкарты материала  */
  readonly materialProcessingPlan?: Meta<Entity.ProcessingPlan>
}

export interface ProcessingPlanMaterialModel extends Model {
  object: ProcessingPlanMaterial
  expandable: {
    assortment: AssortmentModel
    product: ProductModel
  }
}

/**
 * Продукт техкарты
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-produkty-tehkarty
 */
export interface ProcessingPlanProduct
  extends Idable,
    Meta<Entity.ProcessingPlanResult> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные товара или модификации позиции */
  assortment: Meta<AssortmentEntity>

  /** Метаданные товара позиции.
   *
   * В случае, если в поле assortment указана модификация, то это поле содержит товар, к которому относится эта модификация
   */
  product: Meta<Entity.Product>

  /** Количество товаров данного вида в позиции */
  quantity: number
}

export interface ProcessingPlanProductModel extends Model {
  object: ProcessingPlanProduct
  expandable: {
    assortment: AssortmentModel
    product: ProductModel
  }
}

/**
 * Техкарта
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-tehkarty
 */
export interface ProcessingPlan extends Idable, Meta<Entity.ProcessingPlan> {
  /** ID учетной записи */
  readonly accountId: string

  /** Добавлена ли Техкарта в архив */
  archived: boolean

  /** Код Техкарты */
  code?: string

  /** Стоимость производства */
  cost?: number

  /** Тип распределения себестоимости */
  readonly costDistributionType: ProcessingPlanCostDistributionType

  /** Внешний код техкарты */
  externalCode: string

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Коллекция метаданных этапов Техкарты */
  stages: ListMeta<Entity.ProcessingPlanStages>

  /** Коллекция метаданных материалов Техкарты */
  materials: ListMeta<Entity.ProcessingPlanMaterial>

  /** Наименование техкарты */
  name: string

  /** Владелец (Сотрудник) */
  owner: Meta<Entity.Employee>

  /** Метаданные группы Техкарты */
  parent: Meta<Entity.ProcessingPlanFolder>

  /** Наименование группы, в которую входит Техкарта */
  readonly pathName: string

  /** Метаданные Техпроцесса */
  processingProcess: Meta<Entity.ProcessingProcess>

  /** Коллекция метаданных готовых продуктов Техкарты */
  products: ListMeta<Entity.ProcessingPlanResult>

  /** Общий доступ */
  shared: boolean

  /** Дополнительные поля */
  attributes?: Attribute[]

  /** Момент последнего обновления техкарты */
  readonly updated: DateTime
}

export interface ProcessingPlanModel extends Model {
  object: ProcessingPlan
  expandable: {
    group: GroupModel
    stages: ProcessingPlanStageModel
    materials: ProcessingPlanMaterialModel
    owner: EmployeeModel
    parent: ProcessingPlanFolderModel
    processingProcess: ProcessingProcessModel
    products: ProcessingPlanProductModel
  }
}

export interface ListProcessingPlansOptions {
  pagination?: PaginationOptions
  expand?: ExpandOptions<ProcessingPlanModel>
  order?: OrderOptions<ProcessingPlanModel>
  search?: string
  filter?: FilterOptions<ProcessingPlanModel>
}

export type AllProcessingPlansOptions = Omit<
  ListProcessingPlansOptions,
  "pagination"
>

export type FirstProcessingPlanOptions = Omit<
  ListProcessingPlansOptions,
  "pagination"
>

export interface GetProcessingPlanOptions {
  expand?: ExpandOptions<ProcessingPlanModel>
}

export interface UpdateProcessingPlanOptions {
  expand?: ExpandOptions<ProcessingPlanModel>
}

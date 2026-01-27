import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  Subset,
  UpdateMeta,
} from "../../types"
import type {
  AllProductionStageCompletionOptions,
  CreateProductionStageCompletionMaterialOptions,
  CreateProductionStageCompletionOptions,
  FirstProductionStageCompletionMaterialOptions,
  FirstProductionStageCompletionOptions,
  FirstProductionStageCompletionResultOptions,
  GetProductionStageCompletionOptions,
  ListProductionStageCompletionMaterialsOptions,
  ListProductionStageCompletionResultsOptions,
  ListProductionStageCompletionsOptions,
  ProductionStageCompletionMaterialModel,
  ProductionStageCompletionModel,
  ProductionStageCompletionResultModel,
  UpdateProductionStageCompletionMaterialOptions,
  UpdateProductionStageCompletionOptions,
  UpdateProductionStageCompletionResultOptions,
} from "./types"

interface ProductionStageComletionMethods {
  materials: {
    /**
     * Получить материалы выполнения этапа производства.
     *
     * @param options - Опции для получения материалов выполнения этапа производства {@linkcode ListProductionStageCompletionMaterialsOptions}
     * @returns Объект с массивом материалов выполнения этапа производства
     */
    list<
      T extends ListProductionStageCompletionMaterialsOptions = Record<
        string,
        unknown
      >,
    >(
      options?: Subset<T, ListProductionStageCompletionMaterialsOptions>,
    ): Promise<
      ListResponse<
        GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>,
        Entity.ProductionStageCompletionMaterial
      >
    >

    /**
     * Добавить материал выполнения этапа производства.
     *
     * @param data - данные для создания материала выполнения этапа производства
     * @param options - Опции для создания материала выполнения этапа производства {@linkcode CreateProductionStageCompletionMaterialOptions}
     * @returns Объект с созданным материалом выполнения этапа производства {@linkcode ProductionStageCompletionMaterialModel}
     */
    create<
      T extends CreateProductionStageCompletionMaterialOptions = Record<
        string,
        unknown
      >,
    >(
      data: GetModelCreatableFields<ProductionStageCompletionMaterialModel>,
      options?: Subset<T, CreateProductionStageCompletionMaterialOptions>,
    ): Promise<
      GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>
    >

    /**
     * Обновить материал выполнения этапа производства.
     *
     * @param id - id материала выполнения этапа производства
     * @param data - данные для обновления материала выполнения этапа производства
     * @param options - Опции для обновления материала выполнения этапа производства {@linkcode UpdateProductionStageCompletionMaterialOptions}
     * @returns Объект с обновленным материалом выполнения этапа производства {@linkcode ProductionStageCompletionMaterialModel}
     */
    update<
      T extends UpdateProductionStageCompletionMaterialOptions = Record<
        string,
        unknown
      >,
    >(
      id: string,
      data: GetModelUpdatableFields<ProductionStageCompletionMaterialModel>,
      options?: Subset<T, UpdateProductionStageCompletionMaterialOptions>,
    ): Promise<
      GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>
    >

    /**
     * Получить первый материал выполнения этапа производства.
     *
     * @param options - Опции для получения первого материала выполнения этапа производства {@linkcode FirstProductionStageCompletionMaterialOptions}
     * @returns Объект с первым материалом выполнения этапа производства
     */
    first<
      T extends FirstProductionStageCompletionMaterialOptions = Record<
        string,
        unknown
      >,
    >(
      options?: Subset<T, FirstProductionStageCompletionMaterialOptions>,
    ): Promise<
      ListResponse<
        GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>,
        Entity.ProductionStageCompletionMaterial
      >
    >

    /**
     * Получить общее количество материалов выполнения этапа производства.
     *
     * @returns Общее количество материалов выполнения этапа производства
     */
    size(
      options?: AllProductionStageCompletionOptions,
    ): Promise<ListMeta<Entity.ProductionStageCompletionMaterial>>
  }

  products: {
    /**
     * Получить продукты выполнения этапа производства.
     *
     * @param options - Опции для получения продуктов выполнения этапа производства {@linkcode ListProductionStageCompletionResultsOptions}
     * @returns Объект с массивом продуктов выполнения этапа производства
     */
    list<
      T extends ListProductionStageCompletionResultsOptions = Record<
        string,
        unknown
      >,
    >(
      options?: Subset<T, ListProductionStageCompletionResultsOptions>,
    ): Promise<
      ListResponse<
        GetFindResult<ProductionStageCompletionResultModel, T["expand"]>,
        Entity.ProductionStageCompletionResult
      >
    >

    /**
     * Обновить продукт выполнения этапа производства.
     *
     * @param id - id продукта выполнения этапа производства
     * @param data - данные для обновления продукта выполнения этапа производства
     * @param options - Опции для обновления продукта выполнения этапа производства {@linkcode UpdateProductionStageCompletionResultOptions}
     * @returns Объект с обновленным продуктом выполнения этапа производства {@linkcode ProductionStageCompletionResultModel}
     */
    update<
      T extends UpdateProductionStageCompletionResultOptions = Record<
        string,
        unknown
      >,
    >(
      id: string,
      data: GetModelUpdatableFields<ProductionStageCompletionResultModel>,
      options?: Subset<T, UpdateProductionStageCompletionResultOptions>,
    ): Promise<GetFindResult<ProductionStageCompletionResultModel, T["expand"]>>

    /**
     * Получить первый продукт выполнения этапа производства.
     *
     * @param options - Опции для получения первого продукта выполнения этапа производства {@linkcode FirstProductionStageCompletionResultOptions}
     * @returns Объект с первым продуктом выполнения этапа производства
     */
    first<
      T extends FirstProductionStageCompletionResultOptions = Record<
        string,
        unknown
      >,
    >(
      options?: Subset<T, FirstProductionStageCompletionResultOptions>,
    ): Promise<
      ListResponse<
        GetFindResult<ProductionStageCompletionResultModel, T["expand"]>,
        Entity.ProductionStageCompletionResult
      >
    >

    /**
     * Получить общее количество продуктов выполнения этапа производства.
     *
     * @returns Общее количество продуктов выполнения этапа производства
     */
    size(
      options?: AllProductionStageCompletionOptions,
    ): Promise<ListMeta<Entity.ProductionStageCompletionResult>>
  }
}

/**
 * Выполнения этапов производства
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa
 */
export type ProductionStageCompletionEndpoint = {
  /**
   * Получить массив выполнения этапов производства.
   *
   * @param options - Опции для получения выполнения этапов производства {@linkcode ListProductionStageCompletionsOptions}
   * @returns Объект с массивом выполнений этапов производства
   */
  list<
    T extends ListProductionStageCompletionsOptions = Record<string, unknown>,
  >(
    options?: Subset<T, ListProductionStageCompletionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
    >
  >

  /**
   * Получить все выполнения этапов производства.
   *
   * @param options - Опции для получения всех выполнений этапов производства {@linkcode AllProductionStageCompletionsOptions}
   * @returns Объект с массивом выполнений этапов производства
   */
  all<T extends AllProductionStageCompletionOptions = Record<string, unknown>>(
    options?: Subset<T, AllProductionStageCompletionOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
    >
  >

  /**
   * Получить выполнение этапа производства по id.
   *
   * @param id - id выполнения этапа производства
   * @param options - Опции для получения выполнения этапа производства {@linkcode GetProductionStageCompletionOptions}
   * @returns Объект с выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  get<T extends GetProductionStageCompletionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>>

  /**
   * Изменить выполнение этапа производства.
   *
   * @param id - id выполнения этапа производства
   * @param data - данные для изменения выполнения этапа производства
   * @param options - Опции для изменения выполнения этапа производства {@linkcode UpdateProductionStageCompletionOptions}
   * @returns Объект с обновленным выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  update<
    T extends UpdateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    id: string,
    data: GetModelUpdatableFields<ProductionStageCompletionModel>,
    options?: Subset<T, UpdateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>>

  /**
   * Создать выполнение этапа производства.
   *
   * @param data - данные для создания выполнения этапа производства
   * @param options - Опции для создания выполнения этапа производства {@linkcode CreateProductionStageCompletionOptions}
   * @returns Объект с созданным выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  create<
    T extends CreateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    data: GetModelCreatableFields<ProductionStageCompletionModel>,
    options?: Subset<T, CreateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>>

  /**
   * Массово создать и обновить выполнения этапов производства
   *
   * @param data - массив из объектов для создания и обновления выполнения этапов производства
   * @param options - Опции для создания и обновления выполнения этапов производства {@linkcode CreateProductionStageCompletionOptions}
   * @returns Массив с созданными и обновленными выполнения этапов производства {@linkcode ProductionStageCompletionModel}
   */
  upsert<
    T extends CreateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    data: (
      | GetModelCreatableFields<ProductionStageCompletionModel>
      | (GetModelUpdatableFields<ProductionStageCompletionModel> &
          UpdateMeta<Entity.ProductionStageCompletion>)
    )[],
    options?: Subset<T, CreateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>[]>

  /**
   * Получить первое выполнение этапа производства.
   *
   * @param options - Опции для получения первого выполнения этапа производства {@linkcode FirstProductionStageCompletionOptions}
   * @returns Объект с первым выполнением этапа производства
   */
  first<
    T extends FirstProductionStageCompletionOptions = Record<string, unknown>,
  >(
    options?: Subset<T, FirstProductionStageCompletionOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
    >
  >

  /**
   * Получить общее количество выполнений этапов производства.
   * @returns Общее количество выполнений этапов производства
   */
  size(
    options?: AllProductionStageCompletionOptions,
  ): Promise<ListMeta<Entity.ProductionStageCompletion>>

  /**
   * Удалить выполнение этапа производства по id.
   *
   * @param id - id выполнения этапа производства
   */
  delete(id: string): Promise<void>

  /**
   * Массово удалить выполнения этапов производства.
   *
   * @param ids - массив id выполнений этапов производства
   * @returns Массив с результатами удаления выполнений этапов производства
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>
} & {
  [key: string]: ProductionStageComletionMethods
}

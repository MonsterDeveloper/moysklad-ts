import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
} from "../../types"
import type {
  AllProductionStagesOptions,
  FirstProductionStageOptions,
  GetProductionStageOptions,
  ListProductionStagesOptions,
  ProductionStageModel,
  UpdateProductionStageOptions,
} from "./types"

/**
 * Производственные этапы
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy
 */
export interface ProductionStageEndpoint {
  /**
   * Получить массив производственных этапов.
   *
   * @param options - Опции для получения производственных этапов {@linkcode ListProductionStagesOptions}
   * @returns Объект с массивом производственных этапов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy-poluchit-proizwodstwennye-atapy
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * const { rows } = await moysklad.productionStage.list({
   *   filter: {
   *     productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583"
   *   },
   *   order: { field: "orderingPosition", direction: "asc" },
   *   pagination: {
   *     limit: 5,
   *     offset: 10
   *   }
   * });
   * ```
   */
  list<T extends ListProductionStagesOptions>(
    options: Subset<T, ListProductionStagesOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageModel, T["expand"]>,
      Entity.ProductionStage
    >
  >

  /**
   * Получить все производственные этапы.
   *
   * @param options - Опции для получения всех производственных этапов {@linkcode AllProductionStagesOptions}
   * @returns Объект с массивом производственных этапов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy-poluchit-proizwodstwennye-atapy
   *
   * @example С фильтром по производственному заданию
   * ```ts
   * const { rows } = await moysklad.productionStage.all({
   *   filter: {
   *     productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583"
   *   }
   * });
   * ```
   */
  all<T extends AllProductionStagesOptions>(
    options: Subset<T, AllProductionStagesOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductionStageModel, T["expand"]>,
      Entity.ProductionStage
    >
  >

  /**
   * Получить производственный этап по id.
   *
   * @param id - id производственного этапа
   * @param options - Опции для получения производственного этапа {@linkcode GetProductionStageOptions}
   * @returns Объект с производственным этапом {@linkcode ProductionStageModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy-poluchit-proizwodstwennyj-atap
   *
   * @example
   * ```ts
   * const stage = await moysklad.productionStage.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  get<T extends GetProductionStageOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductionStageOptions>,
  ): Promise<GetFindResult<ProductionStageModel, T["expand"]>>

  /**
   * Изменить производственный этап.
   *
   * @param id - id производственного этапа
   * @param data - данные для изменения производственного этапа
   * @param options - Опции для изменения производственного этапа {@linkcode UpdateProductionStageOptions}
   * @returns Объект с обновленным производственным этапом {@linkcode ProductionStageModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy-izmenit-proizwodstwennyj-atap
   *
   * @example
   * ```ts
   * await moysklad.productionStage.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   labourUnitCost: 100,
   *   processingUnitCost: 200
   * });
   * ```
   */
  update<T extends UpdateProductionStageOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductionStageModel>,
    options?: Subset<T, UpdateProductionStageOptions>,
  ): Promise<GetFindResult<ProductionStageModel, T["expand"]>>

  /**
   * Получить первый производственный этап.
   *
   * @param options - Опции для получения первого производственного этапа {@linkcode FirstProductionStageOptions}
   * @returns Объект с первым производственным этапом
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy-poluchit-proizwodstwennye-atapy
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionStage.first({
   *   filter: {
   *     productionTask: "5427bc76-b95f-11eb-0a80-04bb000cd583"
   *   }
   * });
   * ```
   */
  first<T extends FirstProductionStageOptions>(
    options: Subset<T, FirstProductionStageOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageModel, T["expand"]>,
      Entity.ProductionStage
    >
  >

  /**
   * Получить общее количество производственных этапов.
   *
   * @param options - Опции для получения количества производственных этапов {@linkcode FirstProductionStageOptions}
   * @returns Общее количество производственных этапов
   */
  size(options: FirstProductionStageOptions): Promise<number>
}

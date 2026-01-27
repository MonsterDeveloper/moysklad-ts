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
  AllInventoryOptions,
  CreateInventoryOptions,
  FirstInventoryOptions,
  GetInventoryOptions,
  InventoryModel,
  ListInventoryOptions,
  UpdateInventoryOptions,
} from "./types"

/**
 * Инвентаризации
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-inwentarizaciq
 */
export interface InventoryEndpoint {
  /**
   * Получить массив инвентаризаций.
   *
   * @param options - Опции для получения инвентаризаций {@linkcode ListInventoryOptions}
   * @returns Объект с массивом инвентаризаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-inwentarizaciq-poluchit-inwentarizacii
   */
  list<T extends ListInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, ListInventoryOptions>,
  ): Promise<
    ListResponse<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
  >

  /**
   * Получить все инвентаризации.
   *
   * @param options - Опции для получения всех инвентаризаций {@linkcode AllInventoryOptions}
   * @returns Объект с массивом инвентаризаций
   */
  all<T extends AllInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, AllInventoryOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
  >

  /**
   * Получить количество инвентаризаций.
   *
   * @param options - Опции для получения списка {@linkcode AllInventoryOptions}
   * @returns Количество инвентаризаций
   *
   * @example
   * ```ts
   * const count = await moysklad.inventory.size();
   * ```
   */
  size(options?: AllInventoryOptions): Promise<ListMeta<Entity.Inventory>>

  /**
   * Получить первую инвентаризацию.
   *
   * @param options - Опции для получения первой инвентаризации {@linkcode FirstInventoryOptions}
   * @returns Объект с первой инвентаризацией
   */
  first<T extends FirstInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, FirstInventoryOptions>,
  ): Promise<
    ListResponse<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
  >

  /**
   * Получить инвентаризацию по id.
   *
   * @param id - id инвентаризации
   * @param options - Опции для получения инвентаризации {@linkcode GetInventoryOptions}
   * @returns Объект с инвентаризацией {@linkcode InventoryModel}
   */
  get<T extends GetInventoryOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>>

  /**
   * Создать инвентаризацию.
   *
   * @param data - данные для создания инвентаризации
   * @param options - Опции для создания инвентаризации {@linkcode CreateInventoryOptions}
   * @returns Объект с созданной инвентаризацией {@linkcode InventoryModel}
   */
  create<T extends CreateInventoryOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<InventoryModel>,
    options?: Subset<T, CreateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>>

  /**
   * Обновить инвентаризацию.
   *
   * @param id - id инвентаризации
   * @param data - данные для обновления инвентаризации
   * @param options - Опции для обновления инвентаризации {@linkcode UpdateInventoryOptions}
   * @returns Объект с обновленной инвентаризацией {@linkcode InventoryModel}
   */
  update<T extends UpdateInventoryOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<InventoryModel>,
    options?: Subset<T, UpdateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>>

  /**
   * Массово создать или обновить инвентаризации.
   *
   * @param data - массив данных для создания или обновления инвентаризаций
   * @param options - Опции для создания инвентаризаций {@linkcode CreateInventoryOptions}
   * @returns Массив с созданными или обновленными инвентаризациями {@linkcode InventoryModel}
   */
  upsert<T extends CreateInventoryOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<InventoryModel>
      | (GetModelUpdatableFields<InventoryModel> & UpdateMeta<Entity.Inventory>)
    )[],
    options?: Subset<T, CreateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>[]>

  /**
   * Массово удалить инвентаризации.
   *
   * @param ids - массив id инвентаризаций
   * @returns Массив с результатами удаления инвентаризаций
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>
}

import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllSuppliesOptions,
  FirstSupplyOptions,
  GetSupplyOptions,
  ListSuppliesOptions,
  SupplyModel,
  SupplyTemplateData,
  UpdateSupplyOptions,
  UpsertSuppliesOptions,
} from "./types"

/**
 * Приёмки
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki
 */
export interface SupplyEndpoint {
  /**
   * Получить список приёмок
   *
   * @param options - Опции для получения списка {@linkcode ListSuppliesOptions}
   * @returns Объект с списком приёмок
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-poluchit-priemki
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.supply.list();
   * ```
   */
  list<T extends ListSuppliesOptions = Record<string, unknown>>(
    options?: Subset<T, ListSuppliesOptions>,
  ): Promise<
    ListResponse<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
  >

  /**
   * Получить все приёмки
   *
   * @param options - Опции для получения списка {@linkcode AllSuppliesOptions}
   * @returns Массив приёмок
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.supply.all();
   * ```
   */
  all<T extends AllSuppliesOptions = Record<string, unknown>>(
    options?: Subset<T, AllSuppliesOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
  >

  /**
   * Получить приёмку по ID
   *
   * @param id - ID приёмки
   * @param options - Опции для получения {@linkcode GetSupplyOptions}
   * @returns Приёмка
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-poluchit-priemku
   *
   * @example
   * ```ts
   * const supply = await moysklad.supply.get("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  get<T extends GetSupplyOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetSupplyOptions>,
  ): Promise<GetFindResult<SupplyModel, T["expand"]>>

  /**
   * Обновить приёмку
   *
   * @param id - ID приёмки
   * @param data - Данные для обновления
   * @param options - Опции для обновления {@linkcode UpdateSupplyOptions}
   * @returns Обновленная приёмка
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-izmenit-priemku
   *
   * @example
   * ```ts
   * const supply = await moysklad.supply.update(
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   { name: "Новое название" }
   * );
   * ```
   */
  update<T extends UpdateSupplyOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<SupplyModel>,
    options?: Subset<T, UpdateSupplyOptions>,
  ): Promise<GetFindResult<SupplyModel, T["expand"]>>

  /**
   * Создать или обновить приёмку
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для операции {@linkcode UpsertSuppliesOptions}
   * @returns Созданная или обновленная приёмка (или массив приёмок)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-sozdat-priemku
   *
   * @example
   * ```ts
   * const supply = await moysklad.supply.upsert({
   *   organization: { meta: { href: "..." } },
   *   agent: { meta: { href: "..." } },
   *   store: { meta: { href: "..." } }
   * });
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<SupplyModel>,
    TOptions extends UpsertSuppliesOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertSuppliesOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<SupplyModel, TOptions["expand"]>>
  >

  /**
   * Получить первую приёмку, соответствующую фильтру
   *
   * @param options - Опции для поиска {@linkcode FirstSupplyOptions}
   * @returns Приёмка
   *
   * @example
   * ```ts
   * const { rows: [supply] } = await moysklad.supply.first({ filter: { name: "Приёмка №1" } });
   * ```
   */
  first<T extends FirstSupplyOptions = Record<string, unknown>>(
    options?: Subset<T, FirstSupplyOptions>,
  ): Promise<
    ListResponse<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
  >

  /**
   * Получить количество приёмок
   *
   * @returns Количество приёмок
   *
   * @example
   * ```ts
   * const count = await moysklad.supply.size();
   * ```
   */
  size(options?: AllSuppliesOptions): Promise<ListMeta<Entity.Supply>>

  /**
   * Удалить приёмку
   *
   * @param id - ID приёмки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-udalit-priemku
   *
   * @example
   * ```ts
   * await moysklad.supply.delete("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько приёмок
   *
   * @param ids - Массив ID приёмок
   *
   * @example
   * ```ts
   * await moysklad.supply.batchDelete([
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   "b8515408-94b8-12fe-1b91-1f8811600e8f"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Создать шаблон приёмки на основе заказа поставщику
   *
   * @param data - Данные для создания шаблона
   * @returns Шаблон приёмки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-shablon-priemki-na-osnowe-zakaza-postawschiku
   *
   * @example
   * ```ts
   * const template = await moysklad.supply.template({
   *   purchaseOrder: { meta: { href: "..." } }
   * });
   * ```
   */
  template(
    data: SupplyTemplateData,
  ): Promise<GetFindResult<SupplyModel, { positions: true }>>
}

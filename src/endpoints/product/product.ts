import type {
  AuditEvent,
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetAuditByEntityOptions,
  GetFindResult,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllProductsOptions,
  FirstProductOptions,
  GetProductOptions,
  ListProductsOptions,
  ProductModel,
  UpdateProductOptions,
  UpsertProductsOptions,
} from "./types"

/**
 * Товары
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar
 */
export interface ProductEndpoint {
  /**
   * Получить список товаров.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-poluchit-spisok-towarow
   */
  list<T extends ListProductsOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductsOptions>,
  ): Promise<
    ListResponse<GetFindResult<ProductModel, T["expand"]>, Entity.Product>
  >

  /**
   * Получить все товары.
   *
   * @param options - Опции для получения списка
   * @returns Массив товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-poluchit-spisok-towarow
   */
  all<T extends AllProductsOptions = Record<string, unknown>>(
    options?: Subset<T, AllProductsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >

  /**
   * Получить первый товар из списка.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком товаров (с ограничением в 1 элемент)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-poluchit-spisok-towarow
   */
  first<T extends FirstProductOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProductOptions>,
  ): Promise<
    ListResponse<GetFindResult<ProductModel, T["expand"]>, Entity.Product>
  >

  /**
   * Получить товар по ID.
   *
   * @param id - ID товара
   * @param options - Опции для получения товара
   * @returns Товар
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-poluchit-towar
   */
  get<T extends GetProductOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductOptions>,
  ): Promise<GetFindResult<ProductModel, T["expand"]>>

  /**
   * Получить размер списка товаров.
   *
   * @returns Количество товаров
   */
  size(options?: AllProductsOptions): Promise<ListMeta<Entity.Product>>

  /**
   * Удалить товар.
   *
   * @param id - ID товара
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-udalit-towar
   */
  delete(id: string): Promise<void>

  /**
   * Обновить товар.
   *
   * @param id - ID товара
   * @param data - Данные для обновления
   * @param options - Опции для обновления
   * @returns Обновленный товар
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-izmenit-towar
   */
  update<T extends UpdateProductOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductModel>,
    options?: Subset<T, UpdateProductOptions>,
  ): Promise<GetFindResult<ProductModel, T["expand"]>>

  /**
   * Создать или обновить товар.
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для создания или обновления
   * @returns Созданный или обновленный товар
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-sozdat-towar
   */
  upsert<
    TData extends ModelCreateOrUpdateData<ProductModel>,
    TOptions extends UpsertProductsOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertProductsOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<ProductModel, TOptions["expand"]>>
  >

  /**
   * Массовое удаление товаров.
   *
   * @param ids - Массив ID товаров
   * @returns Результат удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-massowoe-udalenie-towarow
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить товар в корзину.
   *
   * @param id - ID товара
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-towar-w-korzinu
   */
  trash(id: string): Promise<void>

  /**
   * Получить события аудита для товара.
   *
   * {@linkcode AuditEvent}
   *
   * @param id - ID товара
   * @param options - Опции для получения событий аудита
   * @returns Список событий аудита
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-poluchit-sobytiq-po-suschnosti
   */
  audit(
    id: string,
    options?: GetAuditByEntityOptions,
  ): Promise<ListResponse<AuditEvent, Entity.AuditEvent>>
}

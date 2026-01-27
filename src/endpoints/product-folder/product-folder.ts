import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  CreateProductFolderOptions,
  FirstProductFolderOptions,
  GetProductFolderOptions,
  ListProductFoldersOptions,
  ProductFolderModel,
  UpdateProductFolderOptions,
  UpsertProductFolderOptions,
} from "./types"

/**
 * Группы товаров
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow
 */
export interface ProductFolderEndpoint {
  /**
   * Получить список групп товаров.
   *
   * @param options - Опции для получения списка {@linkcode ListProductFoldersOptions}
   * @returns Объект с списком групп товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow-poluchit-gruppy-towarow
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.list();
   * ```
   */
  list<T extends ListProductFoldersOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductFoldersOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductFolderModel, T["expand"]>,
      Entity.ProductFolder
    >
  >

  /**
   * Получить все группы товаров
   *
   * @param options - Опции для получения списка {@linkcode ListProductFoldersOptions}
   * @returns Массив групп товаров
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productFolder.all();
   * ```
   */
  all<T extends ListProductFoldersOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductFoldersOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductFolderModel, T["expand"]>,
      Entity.ProductFolder
    >
  >

  /**
   * Получить первую группу товаров, соответствующую фильтру
   *
   * @param options - Опции для поиска {@linkcode FirstProductFolderOptions}
   * @returns Группа товаров
   *
   * @example
   * ```ts
   * const { rows: [folder] } = await moysklad.productFolder.first({ filter: { name: { eq: "Овощи" } } });
   * ```
   */
  first<T extends FirstProductFolderOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProductFolderOptions>,
  ): Promise<GetFindResult<ProductFolderModel, T["expand"]>>

  /**
   * Получить группу товаров по ID
   *
   * @param id - ID группы товаров
   * @param options - Опции для получения {@linkcode GetProductFolderOptions}
   * @returns Группа товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow-poluchit-gruppu-towarow
   *
   * @example
   * ```ts
   * const folder = await moysklad.productFolder.get("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  get<T extends GetProductFolderOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductFolderOptions>,
  ): Promise<GetFindResult<ProductFolderModel, T["expand"]>>

  /**
   * Создать новую группу товаров
   *
   * @param data - Данные для создания группы товаров
   * @param options - Опции для создания {@linkcode CreateProductFolderOptions}
   * @returns Созданная группа товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow-sozdat-nowuu-gruppu-towarow
   *
   * @example
   * ```ts
   * const folder = await moysklad.productFolder.create({
   *   name: "Овощи",
   *   code: "vegetables",
   *   vat: 20
   * });
   * ```
   */
  create<T extends CreateProductFolderOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<ProductFolderModel>,
    options?: Subset<T, CreateProductFolderOptions>,
  ): Promise<GetFindResult<ProductFolderModel, T["expand"]>>

  /**
   * Обновить группу товаров
   *
   * @param id - ID группы товаров
   * @param data - Данные для обновления
   * @param options - Опции для обновления {@linkcode UpdateProductFolderOptions}
   * @returns Обновленная группа товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow-izmenit-gruppu-towarow
   *
   * @example
   * ```ts
   * const folder = await moysklad.productFolder.update(
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   { name: "Фрукты" }
   * );
   * ```
   */
  update<T extends UpdateProductFolderOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductFolderModel>,
    options?: Subset<T, UpdateProductFolderOptions>,
  ): Promise<GetFindResult<ProductFolderModel, T["expand"]>>

  /**
   * Создать или обновить группу товаров
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для операции {@linkcode UpsertProductFolderOptions}
   * @returns Созданная или обновленная группа товаров (или массив групп)
   *
   * @example
   * ```ts
   * const folder = await moysklad.productFolder.upsert({
   *   meta: {
   *     href: "https://api.moysklad.ru/api/remap/1.2/entity/productfolder/a7404397-83a7-11ed-0a80-0e9700500d7e",
   *     type: Entity.ProductFolder,
   *     mediaType: MediaType.Json,
   *   },
   *   name: "Фрукты"
   * });
   * ```
   *
   * @example
   * ```ts
   * const folders = await moysklad.productFolder.upsert([
   *   // Создание
   *   {
   *     name: "Овощи"
   *   },
   *   // Обновление
   *   {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/productfolder/b8515408-94b8-12fe-1b91-1f8811600e8f",
   *       type: Entity.ProductFolder,
   *       mediaType: MediaType.Json,
   *     },
   *     name: "Фрукты"
   *   }
   * ]);
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<ProductFolderModel>,
    TOptions extends UpsertProductFolderOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertProductFolderOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<ProductFolderModel, TOptions["expand"]>>
  >

  /**
   * Удалить группу товаров
   *
   * @param id - ID группы товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow-udalit-gruppu-towarow
   *
   * @example
   * ```ts
   * await moysklad.productFolder.delete("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько групп товаров
   *
   * @param ids - Массив ID групп товаров
   *
   * @example
   * ```ts
   * await moysklad.productFolder.batchDelete([
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   "b8515408-94b8-12fe-1b91-1f8811600e8f"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<void>
}

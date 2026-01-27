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
  AllVariantsOptions,
  CreateVariantOptions,
  FirstVariantOptions,
  GetVariantOptions,
  ListVariantsOptions,
  UpdateVariantOptions,
  VariantModel,
} from "./types"

/**
 * Модификации
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq
 */
export interface VariantEndpoint {
  /**
   * Получить список модификаций.
   *
   * @param options - Опции для получения списка модификаций {@linkcode ListVariantsOptions}
   * @returns Объект с массивом модификаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-poluchit-modifikacii
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.variant.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.variant.list({
   *   expand: ["product"],
   * });
   * ```
   */
  list<T extends ListVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, ListVariantsOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  >

  /**
   * Получить все модификации.
   *
   * @param options - Опции для получения всех модификаций {@linkcode AllVariantsOptions}
   * @returns Объект с массивом модификаций
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.variant.all({
   *   expand: ["product"],
   * });
   * ```
   */
  all<T extends AllVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, AllVariantsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  >

  /**
   * Получить первую модификацию.
   *
   * @param options - Опции для получения первой модификации {@linkcode FirstVariantOptions}
   * @returns Объект с первой модификацией
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.variant.first({
   *   expand: ["product"],
   * });
   * ```
   */
  first<T extends FirstVariantOptions = Record<string, unknown>>(
    options?: Subset<T, FirstVariantOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  >

  /**
   * Получить модификацию по id.
   *
   * @param id - id модификации
   * @param options - Опции для получения модификации {@linkcode GetVariantOptions}
   * @returns Объект модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-poluchit-modifikaciu
   *
   * @example
   * ```ts
   * const variant = await moysklad.variant.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  get<T extends GetVariantOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>>

  /**
   * Получить общее количество модификаций.
   *
   * @returns Общее количество модификаций
   */
  size(options?: AllVariantsOptions): Promise<ListMeta<Entity.Variant>>

  /**
   * Удалить модификацию по id.
   * @param id - id модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-udalit-modifikaciu
   */
  delete(id: string): Promise<void>

  /**
   * Изменить модификацию.
   *
   * @param id - id модификации
   * @param data - данные для изменения модификации
   * @param options - Опции для изменения модификации {@linkcode UpdateVariantOptions}
   * @returns Объект с обновленной модификацией {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-izmenit-modifikaciu
   */
  update<T extends UpdateVariantOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<VariantModel>,
    options?: Subset<T, UpdateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>>

  /**
   * Создать модификацию.
   *
   * @param data - данные для создания модификации
   * @param options - Опции для создания модификации {@linkcode CreateVariantOptions}
   * @returns Объект с созданной модификацией {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-sozdat-modifikaciu
   */
  create<T extends CreateVariantOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<VariantModel>,
    options?: Subset<T, CreateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>>

  /**
   * Массово удалить модификации.
   *
   * @param ids - массив id модификаций
   * @returns Массив с результатами удаления модификаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-massowoe-udalenie-modifikacij
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Массово создать и обновить модификации.
   *
   * @param data - массив из объектов для создания и обновления модификаций
   * @param options - Опции для создания и обновления модификаций {@linkcode CreateVariantOptions}
   * @returns Массив с созданными и обновленными модификациями {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-massowoe-sozdanie-i-obnowlenie-modifikacij
   */
  upsert<T extends CreateVariantOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<VariantModel>
      | (GetModelUpdatableFields<VariantModel> & UpdateMeta<Entity.Variant>)
    )[],
    options?: Subset<T, CreateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>[]>

  /**
   * Поместить модификацию в корзину.
   *
   * @param id - id модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-pomestit-modifikaciu-w-korzinu
   */
  trash(id: string): Promise<void>
}

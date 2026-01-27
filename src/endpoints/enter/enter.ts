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
  AllEntersOptions,
  CreateEnterOptions,
  EnterModel,
  FirstEnterOptions,
  GetEnterOptions,
  ListEntersOptions,
  UpdateEnterOptions,
} from "./types"

/**
 * Оприходования
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie
 */
export interface EnterEndpoint {
  /**
   * Получить список оприходований.
   *
   * @param options - Опции для получения списка {@linkcode ListEntersOptions}
   * @returns Объект с списком оприходований
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-poluchit-oprihodowaniq
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.enter.list();
   * ```
   */
  list<T extends ListEntersOptions = Record<string, unknown>>(
    options?: Subset<T, ListEntersOptions>,
  ): Promise<ListResponse<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>>

  /**
   * Получить все оприходования с пагинацией.
   *
   * @param options - Опции для получения списка {@linkcode AllEntersOptions}
   * @returns Массив всех оприходований
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-poluchit-oprihodowaniq
   *
   * @example
   * ```ts
   * const enters = await moysklad.enter.all();
   * ```
   */
  all<T extends AllEntersOptions = Record<string, unknown>>(
    options?: Subset<T, AllEntersOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>
  >

  /**
   * Получить оприходование по ID.
   *
   * @param id - ID оприходования
   * @param options - Опции для получения оприходования {@linkcode GetEnterOptions}
   * @returns Оприходование
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-poluchit-oprihodowanie
   *
   * @example
   * ```ts
   * const enter = await moysklad.enter.get("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  get<T extends GetEnterOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>>

  /**
   * Обновить оприходование.
   *
   * @param id - ID оприходования
   * @param data - Данные для обновления
   * @param options - Опции для обновления оприходования {@linkcode UpdateEnterOptions}
   * @returns Обновленное оприходование
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-izmenit-oprihodowanie
   *
   * @example
   * ```ts
   * const enter = await moysklad.enter.update(
   *   "a7404318-550f-11e8-56c0-000800000006",
   *   { name: "00002" }
   * );
   * ```
   */
  update<T extends UpdateEnterOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<EnterModel>,
    options?: Subset<T, UpdateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>>

  /**
   * Создать оприходование.
   *
   * @param data - Данные для создания
   * @param options - Опции для создания оприходования {@linkcode CreateEnterOptions}
   * @returns Созданное оприходование
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-sozdat-oprihodowanie
   *
   * @example
   * ```ts
   * const enter = await moysklad.enter.create({
   *   organization: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/a1331985-a1c8-11e6-5bed-427b00000084", type: "organization", mediaType: "application/json" } },
   *   store: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/store/a1321a08-a1c8-11e6-5bed-427b00000073", type: "store", mediaType: "application/json" } }
   * });
   * ```
   */
  create<T extends CreateEnterOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<EnterModel>,
    options?: Subset<T, CreateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>>

  /**
   * Создать или обновить оприходование.
   *
   * @param data - Массив данных для создания или обновления
   * @param options - Опции для создания оприходования {@linkcode CreateEnterOptions}
   * @returns Массив созданных или обновленных оприходований
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-sozdat-oprihodowanie
   *
   * @example
   * ```ts
   * const enters = await moysklad.enter.upsert([
   *   {
   *     organization: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/a1331985-a1c8-11e6-5bed-427b00000084", type: "organization", mediaType: "application/json" } },
   *     store: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/store/a1321a08-a1c8-11e6-5bed-427b00000073", type: "store", mediaType: "application/json" } }
   *   }
   * ]);
   * ```
   */
  upsert<T extends CreateEnterOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<EnterModel>
      | (GetModelUpdatableFields<EnterModel> & UpdateMeta<Entity.Enter>)
    )[],
    options?: Subset<T, CreateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>[]>

  /**
   * Получить первое оприходование из списка.
   *
   * @param options - Опции для получения списка {@linkcode FirstEnterOptions}
   * @returns Объект с списком оприходований (максимум 1)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-poluchit-oprihodowaniq
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.enter.first();
   * const enter = rows[0];
   * ```
   */
  first<T extends FirstEnterOptions = Record<string, unknown>>(
    options?: Subset<T, FirstEnterOptions>,
  ): Promise<ListResponse<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>>

  /**
   * Получить размер списка оприходований.
   *
   * @returns Размер списка
   *
   * @example
   * ```ts
   * const size = await moysklad.enter.size();
   * ```
   */
  size(options?: AllEntersOptions): Promise<ListMeta<Entity.Enter>>

  /**
   * Удалить оприходование.
   *
   * @param id - ID оприходования
   * @returns Promise, который разрешается после успешного удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-udalit-oprihodowanie
   *
   * @example
   * ```ts
   * await moysklad.enter.delete("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Массовое удаление оприходований.
   *
   * @param ids - Массив ID оприходований
   * @returns Результат удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie-massowoe-udalenie-oprihodowanij
   *
   * @example
   * ```ts
   * const result = await moysklad.enter.batchDelete([
   *   "a7404318-550f-11e8-56c0-000800000006",
   *   "a7404318-550f-11e8-56c0-000800000007"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>
}

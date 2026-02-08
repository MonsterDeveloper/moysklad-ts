import type {
  AccountModel,
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllOrganizationsOptions,
  FirstOrganizationOptions,
  GetOrganizationOptions,
  ListOrganizationsOptions,
  OrganizationModel,
  UpdateOrganizationOptions,
  UpsertOrganizationOptions,
} from "./types"

/**
 * Юрлица
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico
 */
export interface OrganizationEndpoint {
  /**
   * Получить список юрлиц.
   *
   * @param options - Опции для получения списка {@linkcode ListOrganizationsOptions}
   * @returns Объект с списком юрлиц
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-spisok-jurlits
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.list();
   * ```
   */
  list<T extends ListOrganizationsOptions = Record<string, unknown>>(
    options?: Subset<T, ListOrganizationsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<OrganizationModel, T["expand"]>,
      Entity.Organization
    >
  >

  /**
   * Получить все юрлица.
   *
   * @param options - Опции для получения всех юрлиц {@linkcode AllOrganizationsOptions}
   * @returns Объект с массивом юрлиц
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-spisok-jurlits
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.all();
   * ```
   */
  all<T extends AllOrganizationsOptions = Record<string, unknown>>(
    options?: Subset<T, AllOrganizationsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<OrganizationModel, T["expand"]>,
      Entity.Organization
    >
  >

  /**
   * Получить юрлицо по id.
   *
   * @param id - id юрлица
   * @param options - Опции для получения юрлица {@linkcode GetOrganizationOptions}
   * @returns Объект с юрлицом {@linkcode OrganizationModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-jurlico
   *
   * @example
   * ```ts
   * const organization = await moysklad.organization.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  get<T extends GetOrganizationOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetOrganizationOptions>,
  ): Promise<GetFindResult<OrganizationModel, T["expand"]>>

  /**
   * Изменить юрлицо.
   *
   * @param id - id юрлица
   * @param data - данные для изменения юрлица
   * @param options - Опции для изменения юрлица {@linkcode UpdateOrganizationOptions}
   * @returns Объект с обновленным юрлицом {@linkcode OrganizationModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-izmenit-jurlico
   *
   * @example
   * ```ts
   * await moysklad.organization.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   name: "ООО Ромашка",
   * });
   * ```
   */
  update<T extends UpdateOrganizationOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<OrganizationModel>,
    options?: Subset<T, UpdateOrganizationOptions>,
  ): Promise<GetFindResult<OrganizationModel, T["expand"]>>

  /**
   * Получить первое юрлицо из списка.
   *
   * @param options - Опции для получения первого юрлица {@linkcode FirstOrganizationOptions}
   * @returns Объект с первым юрлицом
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-spisok-jurlits
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.first();
   * const firstOrganization = rows[0];
   * ```
   */
  first<T extends FirstOrganizationOptions = Record<string, unknown>>(
    options?: Subset<T, FirstOrganizationOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<OrganizationModel, T["expand"]>,
      Entity.Organization
    >
  >

  /**
   * Получить количество юрлиц.
   *
   * @returns Количество юрлиц
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-spisok-jurlits
   *
   * @example
   * ```ts
   * const count = await moysklad.organization.size();
   * ```
   */
  size(
    options?: AllOrganizationsOptions,
  ): Promise<ListMeta<Entity.Organization>>

  /**
   * Удалить юрлицо по id.
   *
   * @param id - id юрлица
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-udalit-jurlico
   */
  delete(id: string): Promise<void>

  /**
   * Массово удалить юрлица.
   *
   * @param ids - массив id юрлиц
   * @returns Массив с результатами удаления юрлиц
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-massowoe-udalenie-jurlits
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Создать или обновить юрлицо.
   *
   * @param data - Данные для создания или обновления юрлица
   * @param options - Опции для создания или обновления юрлица {@linkcode UpsertOrganizationOptions}
   * @returns Созданное или обновленное юрлицо (или массив юрлиц)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-sozdat-jurlico
   *
   * @example
   * ```ts
   * const organization = await moysklad.organization.upsert({
   *   name: "ООО Ромашка",
   * });
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<OrganizationModel>,
    TOptions extends UpsertOrganizationOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertOrganizationOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<OrganizationModel, TOptions["expand"]>>
  >

  /**
   * Получить список счетов юрлица.
   *
   * @param id - id юрлица
   * @param options - Опции для получения списка счетов
   * @returns Объект с списком счетов юрлица
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-poluchit-scheta-jurlica
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.listAccounts("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  listAccounts(
    id: string,
    options?: ListOrganizationsOptions,
  ): Promise<ListResponse<AccountModel["object"], Entity.Account>>

  /**
   * Изменить счета юрлица.
   *
   * @param id - id юрлица
   * @param data - массив счетов для обновления
   * @returns Объект с обновленными счетами юрлица
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-izmenit-scheta-jurlica
   *
   * @example
   * ```ts
   * await moysklad.organization.updateAccounts("5427bc76-b95f-11eb-0a80-04bb000cd583", [
   *   { accountNumber: "40702810001234567890", isDefault: true },
   * ]);
   * ```
   */
  updateAccounts(
    id: string,
    data: GetModelCreatableFields<AccountModel>[],
  ): Promise<ListResponse<AccountModel["object"], Entity.Account>>
}

import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  FilesMethods,
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
  AllServicesOptions,
  CreateServiceOptions,
  FirstServiceOptions,
  GetServiceOptions,
  ListServicesOptions,
  ServiceModel,
  UpdateServiceOptions,
  UpsertServicesOptions,
} from "./types"

/**
 * Услуги.
 *
 * Метаданные дополнительных полей услуг общие с Товарами. Для их получения
 * используйте `moysklad.product.metadata()`.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga
 */
export interface ServiceEndpoint extends FilesMethods {
  /**
   * Получить список услуг.
   *
   * @param options - Опции списка
   * @returns Страница услуг
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-poluchit-uslugi
   */
  list<T extends ListServicesOptions = Record<string, unknown>>(
    options?: Subset<T, ListServicesOptions>,
  ): Promise<
    ListResponse<GetFindResult<ServiceModel, T["expand"]>, Entity.Service>
  >

  /**
   * Получить все услуги с автоматической пагинацией.
   *
   * @param options - Опции списка
   * @returns Все услуги
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-poluchit-uslugi
   */
  all<T extends AllServicesOptions = Record<string, unknown>>(
    options?: Subset<T, AllServicesOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<ServiceModel, T["expand"]>, Entity.Service>
  >

  /**
   * Получить первую услугу из списка.
   *
   * @param options - Опции списка
   * @returns Страница не более чем с одной услугой
   */
  first<T extends FirstServiceOptions = Record<string, unknown>>(
    options?: Subset<T, FirstServiceOptions>,
  ): Promise<
    ListResponse<GetFindResult<ServiceModel, T["expand"]>, Entity.Service>
  >

  /**
   * Получить количество услуг.
   *
   * @param options - Опции фильтрации
   * @returns Метаданные списка с количеством услуг
   */
  size(options?: AllServicesOptions): Promise<ListMeta<Entity.Service>>

  /**
   * Получить услугу по ID.
   *
   * @param id - ID услуги
   * @param options - Опции получения
   * @returns Услуга
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-poluchit-uslugu
   */
  get<T extends GetServiceOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetServiceOptions>,
  ): Promise<GetFindResult<ServiceModel, T["expand"]>>

  /**
   * Создать услугу.
   *
   * `syncId` можно задать только при создании.
   *
   * @param data - Данные новой услуги
   * @param options - Опции создания
   * @returns Созданная услуга
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-sozdat-uslugu
   */
  create<T extends CreateServiceOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<ServiceModel> & { syncId?: string },
    options?: Subset<T, CreateServiceOptions>,
  ): Promise<GetFindResult<ServiceModel, T["expand"]>>

  /**
   * Создать или обновить услуги.
   *
   * @param data - Одна услуга или массив услуг
   * @param options - Опции запроса
   * @returns Созданные или обновлённые услуги
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-massowoe-sozdanie-i-obnowlenie-uslug
   */
  upsert<
    TData extends ModelCreateOrUpdateData<ServiceModel, { syncId?: string }>,
    TOptions extends UpsertServicesOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertServicesOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<ServiceModel, TOptions["expand"]>>
  >

  /**
   * Обновить услугу.
   *
   * @param id - ID услуги
   * @param data - Изменяемые поля
   * @param options - Опции обновления
   * @returns Обновлённая услуга
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-izmenit-uslugu
   */
  update<T extends UpdateServiceOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ServiceModel>,
    options?: Subset<T, UpdateServiceOptions>,
  ): Promise<GetFindResult<ServiceModel, T["expand"]>>

  /**
   * Удалить услугу.
   *
   * @param id - ID услуги
   * @returns Пустой результат после удаления
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-udalit-uslugu
   */
  delete(id: string): Promise<void>

  /**
   * Массово удалить услуги.
   *
   * @param ids - ID услуг
   * @returns Результаты удаления
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-massowoe-udalenie-uslug
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>
}

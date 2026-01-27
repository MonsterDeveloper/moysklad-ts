import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  ListMeta,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllSalesReturnsOptions,
  FirstSalesReturnOptions,
  GetSalesReturnOptions,
  ListSalesReturnsOptions,
  SalesReturnModel,
  SalesReturnTemplateData,
  UpsertSalesReturnsOptions,
} from "./types"

/**
 * Возвраты покупателей
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq
 */
export interface SalesReturnEndpoint {
  /**
   * Получить список возвратов покупателей.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком возвратов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-poluchit-vozwraty-pokupatelej
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.salesReturn.list();
   * ```
   */
  list<T extends ListSalesReturnsOptions = Record<string, unknown>>(
    options?: Subset<T, ListSalesReturnsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<SalesReturnModel, T["expand"], T["fields"]>,
      Entity.SalesReturn
    >
  >

  /**
   * Получить все возвраты покупателей с учетом пагинации.
   *
   * @param options - Опции для получения списка
   * @returns Массив возвратов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-poluchit-vozwraty-pokupatelej
   *
   * @example
   * ```ts
   * const salesReturns = await moysklad.salesReturn.all();
   * ```
   */
  all<T extends AllSalesReturnsOptions = Record<string, unknown>>(
    options?: Subset<T, AllSalesReturnsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<SalesReturnModel, T["expand"], T["fields"]>,
      Entity.SalesReturn
    >
  >

  /**
   * Получить возврат покупателя по ID.
   *
   * @param id - ID возврата покупателя
   * @param options - Опции для получения возврата покупателя
   * @returns Возврат покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-poluchit-vozwrat-pokupatelq
   *
   * @example
   * ```ts
   * const salesReturn = await moysklad.salesReturn.get("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  get<T extends GetSalesReturnOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetSalesReturnOptions>,
  ): Promise<GetFindResult<SalesReturnModel, T["expand"], T["fields"]>>

  /**
   * Получить первый возврат покупателя из списка.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком возвратов покупателей (с одним элементом)
   *
   * @example
   * ```ts
   * const { rows: [salesReturn] } = await moysklad.salesReturn.first();
   * ```
   */
  first<T extends FirstSalesReturnOptions = Record<string, unknown>>(
    options?: Subset<T, FirstSalesReturnOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<SalesReturnModel, T["expand"], T["fields"]>,
      Entity.SalesReturn
    >
  >

  /**
   * Получить количество возвратов покупателей.
   *
   * @returns Количество возвратов покупателей
   *
   * @example
   * ```ts
   * const count = await moysklad.salesReturn.size();
   * ```
   */
  size(options?: AllSalesReturnsOptions): Promise<ListMeta<Entity.SalesReturn>>

  /**
   * Удалить возврат покупателя.
   *
   * @param id - ID возврата покупателя
   * @returns Promise, который разрешается, когда возврат покупателя удален
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-udalit-vozwrat-pokupatelq
   *
   * @example
   * ```ts
   * await moysklad.salesReturn.delete("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько возвратов покупателей.
   *
   * @param ids - Массив ID возвратов покупателей
   * @returns Результат удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-massowoe-udalenie-vozwratow-pokupatelej
   *
   * @example
   * ```ts
   * await moysklad.salesReturn.batchDelete(["a7404318-550f-11e8-56c0-000800000006", "a7404318-550f-11e8-56c0-000800000007"]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить возврат покупателя в корзину.
   *
   * @param id - ID возврата покупателя
   * @returns Promise, который разрешается, когда возврат покупателя перемещен в корзину
   *
   * @example
   * ```ts
   * await moysklad.salesReturn.trash("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  trash(id: string): Promise<void>

  /**
   * Создать или обновить возврат покупателя.
   *
   * @param data - Данные для создания или обновления возврата покупателя
   * @param options - Опции для создания или обновления возврата покупателя
   * @returns Созданный или обновленный возврат покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-sozdat-vozwrat-pokupatelq
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-izmenit-vozwrat-pokupatelq
   *
   * @example
   * ```ts
   * const salesReturn = await moysklad.salesReturn.upsert({
   *   organization: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/fae3561a-2e58-11e6-8a84-bae50000004e", type: "organization", mediaType: "application/json" } },
   *   agent: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/147c1f1b-32ca-11e6-8a84-bae500000004", type: "counterparty", mediaType: "application/json" } },
   *   store: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/store/faf3ff5b-2e58-11e6-8a84-bae500000050", type: "store", mediaType: "application/json" } },
   * });
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<SalesReturnModel>,
    TOptions extends UpsertSalesReturnsOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertSalesReturnsOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<SalesReturnModel, TOptions["expand"]>>
  >

  /**
   * Получить шаблон возврата покупателя на основе отгрузки.
   *
   * @param data - Данные для создания шаблона
   * @returns Шаблон возврата покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq-shablon-vozwrata-pokupatelq-na-osnowe-otgruzki
   *
   * @example
   * ```ts
   * const template = await moysklad.salesReturn.template({
   *   demand: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/demand/a7404318-550f-11e8-56c0-000800000001", type: "demand", mediaType: "application/json" } },
   * });
   * ```
   */
  template(
    data: SalesReturnTemplateData,
  ): Promise<GetFindResult<SalesReturnModel, { positions: true }>>
}

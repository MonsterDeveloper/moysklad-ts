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
  AllFactureOutsOptions,
  FactureOutModel,
  FactureOutTemplateData,
  FirstFactureOutOptions,
  GetFactureOutOptions,
  ListFactureOutsOptions,
  UpsertFactureOutsOptions,
} from "./types"

/**
 * Счета-фактуры выданные
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj
 */
export interface FactureOutEndpoint {
  /**
   * Получить список счетов-фактур выданных.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком счетов-фактур выданных
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-poluchit-wydannye-scheta-faktury
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.factureOut.list();
   * ```
   */
  list<T extends ListFactureOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListFactureOutsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<FactureOutModel, T["expand"], T["fields"]>,
      Entity.FactureOut
    >
  >

  /**
   * Получить все счета-фактуры выданные с учетом пагинации.
   *
   * @param options - Опции для получения списка
   * @returns Массив счетов-фактур выданных
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-poluchit-wydannye-scheta-faktury
   *
   * @example
   * ```ts
   * const factureOuts = await moysklad.factureOut.all();
   * ```
   */
  all<T extends AllFactureOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllFactureOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<FactureOutModel, T["expand"], T["fields"]>,
      Entity.FactureOut
    >
  >

  /**
   * Получить счет-фактуру выданный по ID.
   *
   * @param id - ID счета-фактуры выданного
   * @param options - Опции для получения счета-фактуры выданного
   * @returns Счет-фактура выданный
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-poluchit-schet-fakturu-wydannyj
   *
   * @example
   * ```ts
   * const factureOut = await moysklad.factureOut.get("99d41b01-aa8a-11e6-8af5-581e0000007e");
   * ```
   */
  get<T extends GetFactureOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetFactureOutOptions>,
  ): Promise<GetFindResult<FactureOutModel, T["expand"], T["fields"]>>

  /**
   * Получить первый счет-фактуру выданный из списка.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком счетов-фактур выданных (с одним элементом)
   *
   * @example
   * ```ts
   * const { rows: [factureOut] } = await moysklad.factureOut.first();
   * ```
   */
  first<T extends FirstFactureOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstFactureOutOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<FactureOutModel, T["expand"], T["fields"]>,
      Entity.FactureOut
    >
  >

  /**
   * Получить количество счетов-фактур выданных.
   *
   * @returns Количество счетов-фактур выданных
   *
   * @example
   * ```ts
   * const count = await moysklad.factureOut.size();
   * ```
   */
  size(options?: AllFactureOutsOptions): Promise<ListMeta<Entity.FactureOut>>

  /**
   * Удалить счет-фактуру выданный.
   *
   * @param id - ID счета-фактуры выданного
   * @returns Promise, который разрешается, когда счет-фактура выданный удален
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-udalit-schet-fakturu-wydannyj
   *
   * @example
   * ```ts
   * await moysklad.factureOut.delete("99d41b01-aa8a-11e6-8af5-581e0000007e");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько счетов-фактур выданных.
   *
   * @param ids - Массив ID счетов-фактур выданных
   * @returns Результат удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-massowoe-udalenie-schetow-faktur-wydannyh
   *
   * @example
   * ```ts
   * await moysklad.factureOut.batchDelete(["99d41b01-aa8a-11e6-8af5-581e0000007e", "99d41b01-aa8a-11e6-8af5-581e0000007f"]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить счет-фактуру выданный в корзину.
   *
   * @param id - ID счета-фактуры выданного
   * @returns Promise, который разрешается, когда счет-фактура выданный перемещен в корзину
   *
   * @example
   * ```ts
   * await moysklad.factureOut.trash("99d41b01-aa8a-11e6-8af5-581e0000007e");
   * ```
   */
  trash(id: string): Promise<void>

  /**
   * Создать или обновить счет-фактуру выданный.
   *
   * @param data - Данные для создания или обновления счета-фактуры выданного
   * @param options - Опции для создания или обновления счета-фактуры выданного
   * @returns Созданный или обновленный счет-фактура выданный
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-sozdat-schet-fakturu
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-izmenit-schet-fakturu-wydannyj
   *
   * @example
   * ```ts
   * const factureOut = await moysklad.factureOut.upsert({
   *   demands: [
   *     {
   *       meta: {
   *         href: "https://api.moysklad.ru/api/remap/1.2/entity/demand/a95dbc95-24e0-11e7-1542-821d00000001",
   *         type: "demand",
   *         mediaType: "application/json"
   *       }
   *     }
   *   ]
   * });
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<FactureOutModel>,
    TOptions extends UpsertFactureOutsOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertFactureOutsOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<FactureOutModel, TOptions["expand"]>>
  >

  /**
   * Получить шаблон счета-фактуры выданного на основе отгрузки, возврата поставщику или входящего платежа.
   *
   * @param data - Данные для создания шаблона
   * @returns Шаблон счета-фактуры выданного
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj-shablon-scheta-faktury-wydannogo
   *
   * @example
   * ```ts
   * const template = await moysklad.factureOut.template({
   *   demands: [
   *     {
   *       meta: {
   *         href: "https://api.moysklad.ru/api/remap/1.2/entity/demand/fb3e5ec6-66cc-11e7-6adb-ede5000000be",
   *         type: "demand",
   *         mediaType: "application/json"
   *       }
   *     }
   *   ]
   * });
   * ```
   */
  template(
    data: FactureOutTemplateData,
  ): Promise<GetFindResult<FactureOutModel, undefined>>
}

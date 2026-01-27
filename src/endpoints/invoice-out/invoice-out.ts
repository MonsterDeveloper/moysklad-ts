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
  AllInvoiceOutsOptions,
  CreateInvoiceOutOptions,
  FirstInvoiceOutOptions,
  GetInvoiceOutOptions,
  InvoiceOutModel,
  ListInvoiceOutsOptions,
  UpdateInvoiceOutOptions,
} from "./types"

/**
 * Счета покупателям
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-scheta-pokupatelqm
 */
export interface InvoiceOutEndpoint {
  /**
   * Получить список счетов покупателям.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком счетов покупателям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-poluchit-scheta-pokupatelqm
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.invoiceOut.list();
   * ```
   */
  list<T extends ListInvoiceOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListInvoiceOutsOptions>,
  ): Promise<
    ListResponse<GetFindResult<InvoiceOutModel, T["expand"]>, Entity.InvoiceOut>
  >

  /**
   * Получить все счета покупателям с пагинацией.
   *
   * @param options - Опции для получения списка
   * @returns Массив счетов покупателям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-poluchit-scheta-pokupatelqm
   *
   * @example
   * ```ts
   * const invoices = await moysklad.invoiceOut.all();
   * ```
   */
  all<T extends AllInvoiceOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllInvoiceOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<InvoiceOutModel, T["expand"]>,
      Entity.InvoiceOut
    >
  >

  /**
   * Получить счет покупателю по ID.
   *
   * @param id - ID счета покупателю
   * @param options - Опции для получения счета покупателю
   * @returns Счет покупателю
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-poluchit-schet-pokupatelu
   *
   * @example
   * ```ts
   * const invoice = await moysklad.invoiceOut.get("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  get<T extends GetInvoiceOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>>

  /**
   * Обновить счет покупателю.
   *
   * @param id - ID счета покупателю
   * @param data - Данные для обновления счета покупателю
   * @param options - Опции для обновления счета покупателю
   * @returns Обновленный счет покупателю
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-izmenit-schet-pokupatelu
   *
   * @example
   * ```ts
   * const updatedInvoice = await moysklad.invoiceOut.update(
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   { name: "Новое название" }
   * );
   * ```
   */
  update<T extends UpdateInvoiceOutOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<InvoiceOutModel>,
    options?: Subset<T, UpdateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>>

  /**
   * Создать счет покупателю.
   *
   * @param data - Данные для создания счета покупателю
   * @param options - Опции для создания счета покупателю
   * @returns Созданный счет покупателю
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-sozdat-schet-pokupatelu
   *
   * @example
   * ```ts
   * const newInvoice = await moysklad.invoiceOut.create({
   *   organization: { meta: { href: "...", type: "organization" } },
   *   agent: { meta: { href: "...", type: "counterparty" } },
   *   name: "Счет покупателю"
   * });
   * ```
   */
  create<T extends CreateInvoiceOutOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<InvoiceOutModel>,
    options?: Subset<T, CreateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>>

  /**
   * Создать или обновить несколько счетов покупателям.
   *
   * @param data - Массив данных для создания или обновления счетов покупателям
   * @param options - Опции для создания или обновления счетов покупателям
   * @returns Массив созданных или обновленных счетов покупателям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-sozdat-neskolxko-schetow-pokupatelqm
   *
   * @example
   * ```ts
   * const invoices = await moysklad.invoiceOut.upsert([
   *   {
   *     organization: { meta: { href: "...", type: "organization" } },
   *     agent: { meta: { href: "...", type: "counterparty" } },
   *     name: "Счет покупателю 1"
   *   },
   *   {
   *     meta: { href: "...", type: "invoiceout" },
   *     name: "Обновленный счет покупателю"
   *   }
   * ]);
   * ```
   */
  upsert<T extends CreateInvoiceOutOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<InvoiceOutModel>
      | (GetModelUpdatableFields<InvoiceOutModel> &
          UpdateMeta<Entity.InvoiceOut>)
    )[],
    options?: Subset<T, CreateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>[]>

  /**
   * Получить первый счет покупателю из списка.
   *
   * @param options - Опции для получения счета покупателю
   * @returns Объект с списком счетов покупателям (с ограничением в 1 элемент)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-poluchit-scheta-pokupatelqm
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.invoiceOut.first({ filter: { name: "Счет" } });
   * const invoice = rows[0];
   * ```
   */
  first<T extends FirstInvoiceOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstInvoiceOutOptions>,
  ): Promise<
    ListResponse<GetFindResult<InvoiceOutModel, T["expand"]>, Entity.InvoiceOut>
  >

  /**
   * Получить размер списка счетов покупателям.
   *
   * @returns Количество счетов покупателям
   *
   * @example
   * ```ts
   * const count = await moysklad.invoiceOut.size();
   * ```
   */
  size(options?: AllInvoiceOutsOptions): Promise<ListMeta<Entity.InvoiceOut>>

  /**
   * Удалить счет покупателю.
   *
   * @param id - ID счета покупателю
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-udalit-schet-pokupatelu
   *
   * @example
   * ```ts
   * await moysklad.invoiceOut.delete("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько счетов покупателям.
   *
   * @param ids - Массив ID счетов покупателям
   * @returns Результат массового удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-udalit-neskolxko-schetow-pokupatelqm
   *
   * @example
   * ```ts
   * const result = await moysklad.invoiceOut.batchDelete([
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   "a7404318-550f-11e8-56c0-001b21c78cd8"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>
}

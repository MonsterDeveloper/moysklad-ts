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
  AllInvoiceInsOptions,
  CreateInvoiceInOptions,
  FirstInvoiceInOptions,
  GetInvoiceInOptions,
  InvoiceInModel,
  InvoiceInTemplateData,
  ListInvoiceInsOptions,
  UpdateInvoiceInOptions,
} from "./types"

/**
 * Счета поставщиков
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
 */
export interface InvoiceInEndpoint {
  /**
   * Получить список счетов поставщиков.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком счетов поставщиков
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.invoiceIn.list();
   * ```
   */
  list<T extends ListInvoiceInsOptions = Record<string, unknown>>(
    options?: Subset<T, ListInvoiceInsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<InvoiceInModel, T["expand"], T["fields"]>,
      Entity.InvoiceIn
    >
  >

  /**
   * Получить все счета поставщиков с пагинацией.
   *
   * @param options - Опции для получения списка
   * @returns Массив счетов поставщиков
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const invoices = await moysklad.invoiceIn.all();
   * ```
   */
  all<T extends AllInvoiceInsOptions = Record<string, unknown>>(
    options?: Subset<T, AllInvoiceInsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<InvoiceInModel, T["expand"], T["fields"]>,
      Entity.InvoiceIn
    >
  >

  /**
   * Получить счет поставщика по ID.
   *
   * @param id - ID счета поставщика
   * @param options - Опции для получения счета поставщика
   * @returns Счет поставщика
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const invoice = await moysklad.invoiceIn.get("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  get<T extends GetInvoiceInOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetInvoiceInOptions>,
  ): Promise<GetFindResult<InvoiceInModel, T["expand"], T["fields"]>>

  /**
   * Обновить счет поставщика.
   *
   * @param id - ID счета поставщика
   * @param data - Данные для обновления счета поставщика
   * @param options - Опции для обновления счета поставщика
   * @returns Обновленный счет поставщика
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const updatedInvoice = await moysklad.invoiceIn.update(
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   { name: "Новое название" }
   * );
   * ```
   */
  update<T extends UpdateInvoiceInOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<InvoiceInModel>,
    options?: Subset<T, UpdateInvoiceInOptions>,
  ): Promise<GetFindResult<InvoiceInModel, T["expand"]>>

  /**
   * Создать счет поставщика.
   *
   * @param data - Данные для создания счета поставщика
   * @param options - Опции для создания счета поставщика
   * @returns Созданный счет поставщика
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const newInvoice = await moysklad.invoiceIn.create({
   *   organization: { meta: { href: "...", type: "organization" } },
   *   agent: { meta: { href: "...", type: "counterparty" } },
   *   name: "Счет поставщика"
   * });
   * ```
   */
  create<T extends CreateInvoiceInOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<InvoiceInModel>,
    options?: Subset<T, CreateInvoiceInOptions>,
  ): Promise<GetFindResult<InvoiceInModel, T["expand"]>>

  /**
   * Создать или обновить несколько счетов поставщиков.
   *
   * @param data - Массив данных для создания или обновления счетов поставщиков
   * @param options - Опции для создания или обновления счетов поставщиков
   * @returns Массив созданных или обновленных счетов поставщиков
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const invoices = await moysklad.invoiceIn.upsert([
   *   {
   *     organization: { meta: { href: "...", type: "organization" } },
   *     agent: { meta: { href: "...", type: "counterparty" } },
   *     name: "Счет поставщика 1"
   *   },
   *   {
   *     meta: { href: "...", type: "invoicein" },
   *     name: "Обновленный счет поставщика"
   *   }
   * ]);
   * ```
   */
  upsert<T extends CreateInvoiceInOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<InvoiceInModel>
      | (GetModelUpdatableFields<InvoiceInModel> & UpdateMeta<Entity.InvoiceIn>)
    )[],
    options?: Subset<T, CreateInvoiceInOptions>,
  ): Promise<GetFindResult<InvoiceInModel, T["expand"]>[]>

  /**
   * Получить первый счет поставщика из списка.
   *
   * @param options - Опции для получения счета поставщика
   * @returns Объект с списком счетов поставщиков (с ограничением в 1 элемент)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.invoiceIn.first({ filter: { name: "Счет" } });
   * const invoice = rows[0];
   * ```
   */
  first<T extends FirstInvoiceInOptions = Record<string, unknown>>(
    options?: Subset<T, FirstInvoiceInOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<InvoiceInModel, T["expand"], T["fields"]>,
      Entity.InvoiceIn
    >
  >

  /**
   * Получить размер списка счетов поставщиков.
   *
   * @returns Количество счетов поставщиков
   *
   * @example
   * ```ts
   * const count = await moysklad.invoiceIn.size();
   * ```
   */
  size(options?: AllInvoiceInsOptions): Promise<ListMeta<Entity.InvoiceIn>>

  /**
   * Удалить счет поставщика.
   *
   * @param id - ID счета поставщика
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * await moysklad.invoiceIn.delete("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько счетов поставщиков.
   *
   * @param ids - Массив ID счетов поставщиков
   * @returns Результат массового удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const result = await moysklad.invoiceIn.batchDelete([
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   "a7404318-550f-11e8-56c0-001b21c78cd8"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Получить шаблон счёта поставщика с данными по умолчанию или на основе документа.
   *
   * @param data - Заказ поставщику или приёмки для заполнения шаблона
   * @returns Предзаполненный счёт поставщика
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#/documents/invoice-in%233-scheta-postavshikov
   *
   * @example
   * ```ts
   * const template = await moysklad.invoiceIn.template();
   * ```
   */
  template(
    data?: InvoiceInTemplateData,
  ): Promise<GetFindResult<InvoiceInModel, { positions: true }>>
}

import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllPaymentOutsOptions,
  CreatePaymentOutOptions,
  FirstPaymentOutOptions,
  GetPaymentOutOptions,
  ListPaymentOutsOptions,
  PaymentOutModel,
  UpdatePaymentOutOptions,
} from "./types"

/**
 * Исходящие платежи
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
 */
export interface PaymentOutEndpoint {
  /**
   * Получить список исходящих платежей.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком исходящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.paymentOut.list();
   * ```
   */
  list<T extends ListPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentOutsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  >

  /**
   * Получить все исходящие платежи с пагинацией.
   *
   * @param options - Опции для получения списка
   * @returns Массив исходящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const paymentOuts = await moysklad.paymentOut.all();
   * ```
   */
  all<T extends AllPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<PaymentOutModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >

  /**
   * Получить первый исходящий платеж.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком исходящих платежей (лимит 1)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschie-platezhi
   *
   * @example
   * ```ts
   * const { rows: [paymentOut] } = await moysklad.paymentOut.first();
   * ```
   */
  first<T extends FirstPaymentOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentOutOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  >

  /**
   * Получить исходящий платеж по ID.
   *
   * @param id - ID исходящего платежа
   * @param options - Опции для получения
   * @returns Исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-poluchit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const paymentOut = await moysklad.paymentOut.get("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  get<T extends GetPaymentOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>

  /**
   * Получить размер списка исходящих платежей.
   *
   * @returns Размер списка исходящих платежей
   *
   * @example
   * ```ts
   * const size = await moysklad.paymentOut.size();
   * ```
   */
  size(options?: AllPaymentOutsOptions): Promise<ListMeta<Entity.PaymentOut>>

  /**
   * Удалить исходящий платеж.
   *
   * @param id - ID исходящего платежа
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-udalit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * await moysklad.paymentOut.delete("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Обновить исходящий платеж.
   *
   * @param id - ID исходящего платежа
   * @param data - Данные для обновления
   * @param options - Опции для обновления
   * @returns Обновленный исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-izmenit-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const updatedPaymentOut = await moysklad.paymentOut.update(
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   { name: "00002" }
   * );
   * ```
   */
  update<T extends UpdatePaymentOutOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentOutModel>,
    options?: Subset<T, UpdatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>

  /**
   * Создать исходящий платеж.
   *
   * @param data - Данные для создания
   * @param options - Опции для создания
   * @returns Созданный исходящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-sozdat-ishodqschij-platezh
   *
   * @example
   * ```ts
   * const newPaymentOut = await moysklad.paymentOut.create({
   *   organization: {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/a7404318-550f-11e8-56c0-001b21c78cd9",
   *       type: "organization",
   *       mediaType: "application/json"
   *     }
   *   },
   *   agent: {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404318-550f-11e8-56c0-001b21c78cd9",
   *       type: "counterparty",
   *       mediaType: "application/json"
   *     }
   *   },
   *   sum: 100000
   * });
   * ```
   */
  create<T extends CreatePaymentOutOptions = Record<string, unknown>>(
    data: ModelCreateOrUpdateData<PaymentOutModel>,
    options?: Subset<T, CreatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>>

  /**
   * Массовое удаление исходящих платежей.
   *
   * @param ids - Массив ID исходящих платежей
   * @returns Результат массового удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-massowoe-udalenie-ishodqschih-platezhej
   *
   * @example
   * ```ts
   * const result = await moysklad.paymentOut.batchDelete([
   *   "a7404318-550f-11e8-56c0-001b21c78cd9",
   *   "a7404318-550f-11e8-56c0-001b21c78cd8"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить исходящий платеж в корзину.
   *
   * @param id - ID исходящего платежа
   * @returns Void
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschij-platezh-peremestit-w-korzinu
   *
   * @example
   * ```ts
   * await moysklad.paymentOut.trash("a7404318-550f-11e8-56c0-001b21c78cd9");
   * ```
   */
  trash(id: string): Promise<void>
}

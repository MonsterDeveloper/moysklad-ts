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
  AllPaymentInsOptions,
  CreatePaymentInOptions,
  FirstPaymentInOptions,
  GetPaymentInOptions,
  ListPaymentInsOptions,
  PaymentInModel,
  UpdatePaymentInOptions,
} from "./types"

/**
 * Входящие платежи
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh
 */
export interface PaymentInEndpoint {
  /**
   * Получить список входящих платежей
   *
   * @param options - Опции для получения списка
   * @returns Список входящих платежей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-poluchit-vhodqschie-platezhi
   */
  list<T extends ListPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentInsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >

  /**
   * Получить все входящие платежи
   *
   * @param options - Опции для получения списка
   * @returns Список всех входящих платежей
   */
  all<T extends AllPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentInsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >

  /**
   * Получить входящий платеж по ID
   *
   * @param id - ID входящего платежа
   * @param options - Опции для получения входящего платежа
   * @returns Входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-poluchit-vhodqschij-platezh
   */
  get<T extends GetPaymentInOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>

  /**
   * Обновить входящий платеж
   *
   * @param id - ID входящего платежа
   * @param data - Данные для обновления
   * @param options - Опции для обновления
   * @returns Обновленный входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-izmenit-vhodqschij-platezh
   */
  update<T extends UpdatePaymentInOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentInModel>,
    options?: Subset<T, UpdatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>

  /**
   * Создать входящий платеж
   *
   * @param data - Данные для создания
   * @param options - Опции для создания
   * @returns Созданный входящий платеж
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-sozdat-vhodqschij-platezh
   */
  create<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<PaymentInModel>,
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>>

  /**
   * Создать или обновить входящие платежи
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для создания или обновления
   * @returns Созданные или обновленные входящие платежи
   */
  upsert<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<PaymentInModel>
      | (GetModelUpdatableFields<PaymentInModel> & UpdateMeta<Entity.PaymentIn>)
    )[],
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>[]>

  /**
   * Получить первый входящий платеж из списка
   *
   * @param options - Опции для получения
   * @returns Первый входящий платеж
   */
  first<T extends FirstPaymentInOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentInOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  >

  /**
   * Получить количество входящих платежей
   *
   * @returns Количество входящих платежей
   */
  size(options?: AllPaymentInsOptions): Promise<ListMeta<Entity.PaymentIn>>

  /**
   * Удалить входящий платеж
   *
   * @param id - ID входящего платежа
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh-udalit-vhodqschij-platezh
   */
  delete(id: string): Promise<void>

  /**
   * Массовое удаление входящих платежей
   *
   * @param ids - Массив ID входящих платежей
   * @returns Результат удаления
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить входящий платеж в корзину
   *
   * @param id - ID входящего платежа
   */
  trash(id: string): Promise<void>
}

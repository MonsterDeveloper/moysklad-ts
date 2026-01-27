import type {
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
  AllBonusTransactionsOptions,
  BonusTransactionModel,
  CreateBonusTransactionOptions,
  FirstBonusTransactionOptions,
  GetBonusTransactionOptions,
  ListBonusTransactionsOptions,
  UpdateBonusTransactionOptions,
  UpsertBonusTransactionOptions,
} from "./types"

/**
 * Бонусные операции
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-bonusnye-operacii
 */
export interface BonusTransactionEndpoint {
  /**
   * Получить список бонусных операций.
   *
   * @param options - Опции для получения списка {@linkcode ListBonusTransactionsOptions}
   * @returns Объект с списком бонусных операций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnye-operacii
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.list();
   * ```
   */
  list<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >

  /**
   * Получить все бонусные операции
   *
   * @param options - Опции для получения списка {@linkcode ListBonusTransactionsOptions}
   * @returns Массив бонусных операций
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.all();
   * ```
   */
  all<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >

  /**
   * Получить количество бонусных операций.
   *
   * @param options - Опции для получения списка {@linkcode AllBonusTransactionsOptions}
   * @returns Количество бонусных операций
   *
   * @example
   * ```ts
   * const count = await moysklad.bonusTransaction.size();
   * ```
   */
  size(
    options?: AllBonusTransactionsOptions,
  ): Promise<ListMeta<Entity.BonusTransaction>>

  /**
   * Получить первую бонусную операцию, соответствующую фильтру
   *
   * @param options - Опции для поиска {@linkcode FirstBonusTransactionOptions}
   * @returns Бонусная операция
   *
   * @example
   * ```ts
   * const { rows: [transaction] } = await moysklad.bonusTransaction.first({ filter: { bonusValue: 100 } });
   * ```
   */
  first<T extends FirstBonusTransactionOptions = Record<string, unknown>>(
    options?: Subset<T, FirstBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>>

  /**
   * Получить бонусную операцию по ID
   *
   * @param id - ID бонусной операции
   * @param options - Опции для получения {@linkcode GetBonusTransactionOptions}
   * @returns Бонусная операция
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * const transaction = await moysklad.bonusTransaction.get("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  get<T extends GetBonusTransactionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>>

  /**
   * Создать новую бонусную операцию
   *
   * @param data - Данные для создания бонусной операции
   * @param options - Опции для создания {@linkcode CreateBonusTransactionOptions}
   * @returns Созданная бонусная операция
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-sozdat-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * const transaction = await moysklad.bonusTransaction.create({
   *   agent: { meta: { href: "..." } },
   *   bonusValue: 100
   * });
   * ```
   */
  create<T extends CreateBonusTransactionOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<BonusTransactionModel>,
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>>

  /**
   * Обновить бонусную операцию
   *
   * @param id - ID бонусной операции
   * @param data - Данные для обновления
   * @param options - Опции для обновления {@linkcode UpdateBonusTransactionOptions}
   * @returns Обновленная бонусная операция
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-izmenit-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * const transaction = await moysklad.bonusTransaction.update(
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   { bonusValue: 200 }
   * );
   * ```
   */
  update<T extends UpdateBonusTransactionOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<BonusTransactionModel>,
    options?: Subset<T, UpdateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>>

  /**
   * Создать или обновить бонусную операцию
   *
   * @param data - Данные для создания или обновления
   * @param options - Опции для операции {@linkcode UpsertBonusTransactionOptions}
   * @returns Созданная или обновленная бонусная операция (или массив операций)
   *
   * @example
   * ```ts
   * const transaction = await moysklad.bonusTransaction.upsert({
   *   meta: {
   *     href: "https://api.moysklad.ru/api/remap/1.2/entity/bonustransaction/a7404397-83a7-11ed-0a80-0e9700500d7e",
   *     type: Entity.BonusTransaction,
   *     mediaType: MediaType.Json,
   *   },
   *   bonusValue: 300
   * });
   * ```
   *
   * @example
   * ```ts
   * const transactions = await moysklad.bonusTransaction.upsert([
   *   // Создание
   *   {
   *     bonusValue: 100
   *   },
   *   // Обновление
   *   {
   *     meta: {
   *       href: "https://api.moysklad.ru/api/remap/1.2/entity/bonustransaction/b8515408-94b8-12fe-1b91-1f8811600e8f",
   *       type: Entity.BonusTransaction,
   *       mediaType: MediaType.Json,
   *     },
   *     bonusValue: 200
   *   }
   * ]);
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<BonusTransactionModel>,
    TOptions extends UpsertBonusTransactionOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertBonusTransactionOptions>,
  ): Promise<
    MatchArrayType<
      TData,
      GetFindResult<BonusTransactionModel, TOptions["expand"]>
    >
  >

  /**
   * Удалить бонусную операцию
   *
   * @param id - ID бонусной операции
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-udalit-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * await moysklad.bonusTransaction.delete("a7404397-83a7-11ed-0a80-0e9700500d7e");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько бонусных операций
   *
   * @param ids - Массив ID бонусных операций
   *
   * @example
   * ```ts
   * await moysklad.bonusTransaction.batchDelete([
   *   "a7404397-83a7-11ed-0a80-0e9700500d7e",
   *   "b8515408-94b8-12fe-1b91-1f8811600e8f"
   * ]);
   * ```
   */
  batchDelete(ids: string[]): Promise<void>
}

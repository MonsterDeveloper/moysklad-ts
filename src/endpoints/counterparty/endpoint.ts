import type {
  AllCounterpartiesOptions,
  CounterpartyModel,
  FirstCounterpartyOptions,
  GetCounterpartyOptions,
  ListCounterpartiesOptions,
  UpdateCounterpartyOptions,
} from "./types";
import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
} from "../../types";

/**
 * Контрагенты
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent
 */
export interface CounterpartyEndpoint {
  /**
   * Получить список контрагентов.
   *
   * @param options - Опции для получения списка {@linkcode ListCounterpartiesOptions}
   * @returns Объект с списком контрагентов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-poluchit-kontragentow
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.counterparty.list();
   * ```
   */
  list<T extends ListCounterpartiesOptions = Record<string, unknown>>(
    options?: Subset<T, ListCounterpartiesOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CounterpartyModel, T["expand"]>,
      Entity.Counterparty
    >
  >;

  /**
   * Получить все контрагенты.
   *
   * @param options - Опции для получения всех контрагентов {@linkcode AllCounterpartiesOptions}
   * @returns Объект с массивом контрагентов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-poluchit-kontragentow
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.counterparty.all();
   * ```
   */
  all<T extends AllCounterpartiesOptions = Record<string, unknown>>(
    options?: Subset<T, AllCounterpartiesOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<CounterpartyModel, T["expand"]>,
      Entity.Counterparty
    >
  >;

  /**
   * Получить контрагента по id.
   *
   * @param id - id контрагента
   * @param options - Опции для получения контрагента {@linkcode GetCounterpartyOptions}
   * @returns Объект с контрагентом {@linkcode CounterpartyModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-poluchit-kontragenta
   *
   * @example
   * ```ts
   * const counterparty = await moysklad.counterparty.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  get<T extends GetCounterpartyOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetCounterpartyOptions>,
  ): Promise<GetFindResult<CounterpartyModel, T["expand"]>>;

  /**
   * Изменить контрагента.
   *
   * @param id - id контрагента
   * @param data - данные для изменения контрагента
   * @param options - Опции для изменения контрагента {@linkcode UpdateCounterpartyOptions}
   * @returns Объект с обновленным контрагентом {@linkcode CounterpartyModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-izmenit-kontragenta
   *
   * @example
   * ```ts
   * await moysklad.counterparty.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   name: "ООО Ромашка",
   * });
   * ```
   */
  update<T extends UpdateCounterpartyOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<CounterpartyModel>,
    options?: Subset<T, UpdateCounterpartyOptions>,
  ): Promise<GetFindResult<CounterpartyModel, T["expand"]>>;

  /**
   * Получить первого контрагента из списка.
   *
   * @param options - Опции для получения первого контрагента {@linkcode FirstCounterpartyOptions}
   * @returns Объект с первым контрагентом
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-poluchit-kontragentow
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.counterparty.first();
   * const firstCounterparty = rows[0];
   * ```
   */
  first<T extends FirstCounterpartyOptions = Record<string, unknown>>(
    options?: Subset<T, FirstCounterpartyOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CounterpartyModel, T["expand"]>,
      Entity.Counterparty
    >
  >;

  /**
   * Получить количество контрагентов.
   *
   * @returns Количество контрагентов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent-poluchit-kontragentow
   *
   * @example
   * ```ts
   * const count = await moysklad.counterparty.size();
   * ```
   */
  size(): Promise<number>;
}

import type {
  BatchGetResult,
  Entity,
  ListMeta,
  ListResponse,
  Subset,
} from "../../types"
import type {
  AllCurrenciesOptions,
  Currency,
  FirstCurrencyOptions,
  GetCurrencyOptions,
  ListCurrenciesOptions,
} from "./types"

/**
 * Валюты. Справочник доступен для чтения через этот endpoint.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-valuta
 */
export interface CurrencyEndpoint {
  /** Получить страницу валют. */
  list<T extends ListCurrenciesOptions = Record<string, unknown>>(
    options?: Subset<T, ListCurrenciesOptions>,
  ): Promise<ListResponse<Currency, Entity.Currency>>

  /** Получить все валюты с автоматической пагинацией. */
  all<T extends AllCurrenciesOptions = Record<string, unknown>>(
    options?: Subset<T, AllCurrenciesOptions>,
  ): Promise<BatchGetResult<Currency, Entity.Currency>>

  /** Получить первую валюту из списка. */
  first<T extends FirstCurrencyOptions = Record<string, unknown>>(
    options?: Subset<T, FirstCurrencyOptions>,
  ): Promise<ListResponse<Currency, Entity.Currency>>

  /** Получить количество валют с учётом фильтров. */
  size(options?: AllCurrenciesOptions): Promise<ListMeta<Entity.Currency>>

  /**
   * Получить валюту по ID.
   *
   * @param id - ID валюты
   * @param options - Опции получения
   * @returns Валюта
   */
  get<T extends GetCurrencyOptions = Record<string, never>>(
    id: string,
    options?: Subset<T, GetCurrencyOptions>,
  ): Promise<Currency>
}

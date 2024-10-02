import { composeSearchParameters } from "../../api-client";
import type {
  AssortmentModel,
  BatchGetResult,
  Entity,
  ListResponse,
  Subset,
} from "../../types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  AllAssortmentOptions,
  FirstAssortmentOptions,
  ListAssortmentOptions,
} from "./types";

const ENDPOINT_URL = "/entity/assortment";

export class AssortmentEndpoint extends BaseEndpoint {
  /**
   * Получить список товаров, комплектов, услуг и модификаций в виде списка.
   *
   * @param options - Опции для получения списка {@linkcode ListAssortmentOptions}
   * @returns Объект с списком
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment-poluchit-assortiment
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.assortment.list();
   * ```
   */
  async list<T extends ListAssortmentOptions = Record<string, unknown>>(
    options?: Subset<T, ListAssortmentOptions>,
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все товары, комплекты, услуги и модификации.
   *
   * @param options - Опции для получения всех позиций {@linkcode AllAssortmentOptions}
   * @returns Объект с всеми позициями
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment-poluchit-assortiment
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.assortment.all();
   * ```
   */
  async all<T extends AllAssortmentOptions = Record<string, unknown>>(
    options?: Subset<T, AllAssortmentOptions>,
  ): Promise<BatchGetResult<AssortmentModel["object"], Entity.Assortment>> {
    return this.client.batchGet(
      async (limit, offset) =>
        this.list({
          ...options,
          pagination: { limit, offset },
        }),
      false,
    );
  }

  /**
   * Получить первую позицию в списке.
   *
   * @param options - Опции для получения первой позиции {@linkcode FirstAssortmentOptions}
   * @returns Объект с первой позицией
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment-poluchit-assortiment
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.assortment.first();
   * ```
   */
  async first<T extends FirstAssortmentOptions = Record<string, unknown>>(
    options?: Subset<T, FirstAssortmentOptions>,
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>> {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить общее количество ассортимента.
   *
   * @returns Общее количество ассортимента
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }
}

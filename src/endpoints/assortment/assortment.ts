import type {
  EqualityFilter,
  PaginationOptions,
  AssortmentModel,
  BatchGetResult,
  Entity,
  ListResponse,
  Subset,
  ListMeta,
  AssortmentEntity,
} from "../../types";

export interface ListAssortmentOptions {
  /** Получить вместе с сериями. */
  groupBy?: "consignment";

  filter?: {
    barcode?: EqualityFilter<string> | string | string[];
  };

  pagination?: PaginationOptions;
}

export type AllAssortmentOptions = Omit<ListAssortmentOptions, "pagination">;
export type FirstAssortmentOptions = Omit<ListAssortmentOptions, "pagination">;

/**
 * Ассортимент
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment
 */
export interface AssortmentEndpoint {
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
  list<T extends ListAssortmentOptions>(
    options?: Subset<T, ListAssortmentOptions>,
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>>;

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
  all<T extends AllAssortmentOptions>(
    options?: Subset<T, AllAssortmentOptions>,
  ): Promise<BatchGetResult<AssortmentModel["object"], Entity.Assortment>>;

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
  first<T extends FirstAssortmentOptions>(
    options?: Subset<T, FirstAssortmentOptions>,
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>>;

  /**
   * Получить общее количество ассортимента.
   *
   * @returns Общее количество ассортимента
   */
  size(): Promise<ListMeta<AssortmentEntity>>;
}

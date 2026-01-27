import type {
  ArchivedFilter,
  AssortmentEntity,
  AssortmentModel,
  BatchGetResult,
  BooleanFilter,
  DateTimeFilter,
  Entity,
  EqualityFilter,
  IdFilter,
  ListMeta,
  ListResponse,
  NumberFilter,
  PaginationOptions,
  StringFilter,
  Subset,
} from "../../types"

/**
 * Режим фильтрации по остаткам
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment-atributy-dostupnye-dlq-fil-tracii-dostupnye-znacheniq-dlq-stockmode
 */
export enum StockMode {
  /** Любое значение остатка */
  All = "all",
  /** Положительный остаток */
  PositiveOnly = "positiveOnly",
  /** Отрицательный остаток */
  NegativeOnly = "negativeOnly",
  /** Нулевой остаток */
  Empty = "empty",
  /** Ненулевой остаток */
  NonEmpty = "nonEmpty",
  /** Остаток ниже неснижаемого остатка */
  UnderMinimum = "underMinimum",
}

/**
 * Режим фильтрации по доступности
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment-atributy-dostupnye-dlq-fil-tracii-dostupnye-znacheniq-dlq-quantitymode
 */
export enum QuantityMode {
  /** Любое значение остатка */
  All = "all",
  /** Положительный остаток */
  PositiveOnly = "positiveOnly",
  /** Отрицательный остаток */
  NegativeOnly = "negativeOnly",
  /** Нулевой остаток */
  Empty = "empty",
  /** Ненулевой остаток */
  NonEmpty = "nonEmpty",
  /** Остаток ниже неснижаемого остатка */
  UnderMinimum = "underMinimum",
}

/**
 * Тип сущности для фильтрации ассортимента
 */
export enum AssortmentEntityType {
  /** Товар */
  Product = "product",
  /** Услуга */
  Service = "service",
  /** Комплект */
  Bundle = "bundle",
  /** Модификация */
  Variant = "variant",
  /** Серия */
  Consignment = "consignment",
}

export interface ListAssortmentOptions {
  /** Получить вместе с сериями. */
  groupBy?: "consignment"

  filter?: {
    /** Фильтрация по коду вида алкогольной продукции */
    "alcoholic.type"?: NumberFilter

    /** Фильтрация по признаку архивности товаров */
    archived?: ArchivedFilter

    /** Фильтрация по артикулам товаров и комплектов */
    article?: StringFilter

    /** Фильтрация по штрихкодам сущностей */
    barcode?: EqualityFilter<string> | string | string[]

    /** Фильтрация по кодам сущностей */
    code?: StringFilter

    /** Фильтрация по описаниям сущностей */
    description?: StringFilter

    /** Фильтрация по внешним кодам сущностей */
    externalCode?: StringFilter

    /** Фильтрация по владельцу-отделу */
    group?: EqualityFilter<string> | string | string[]

    /** Фильтрация по идентификаторам сущностей */
    id?: IdFilter

    /** Фильтрация по использованию серийных номеров */
    isSerialTrackable?: BooleanFilter

    /** Фильтрация по наименованиям сущностей */
    name?: StringFilter

    /** Фильтрация по владельцу-сотруднику */
    owner?: EqualityFilter<string> | string | string[]

    /** Фильтрация по наименованию групп товаров */
    pathname?: StringFilter

    /** Фильтрация по группам товаров */
    productFolder?: EqualityFilter<string> | string | string[]

    /** Фильтрация по значению доступно */
    quantityMode?: QuantityMode

    /** Префиксный поиск по строковым полям */
    search?: EqualityFilter<string> | string

    /** Фильтрация по признаку общего доступа */
    shared?: BooleanFilter

    /** Фильтрация по значению остатка */
    stockMode?: StockMode

    /** Момент времени, на который нужно вывести остатки */
    stockMoment?: DateTimeFilter

    /** Фильтрация по складам */
    stockStore?: EqualityFilter<string> | string | string[]

    /** Фильтрация по поставщикам */
    supplier?: EqualityFilter<string> | string | string[]

    /** Фильтрация по типу сущности */
    type?:
      | EqualityFilter<AssortmentEntityType>
      | AssortmentEntityType
      | AssortmentEntityType[]

    /** Фильтрация по времени последнего обновления */
    updated?: DateTimeFilter

    /** Фильтрация по автору последнего обновления */
    updatedBy?: EqualityFilter<string> | string | string[]

    /** Фильтрация по признаку весового товара */
    weighed?: BooleanFilter

    /** Параметр учета вложенных подгрупп */
    withSubFolders?: boolean
  }

  pagination?: PaginationOptions
}

export type AllAssortmentOptions = Omit<ListAssortmentOptions, "pagination">
export type FirstAssortmentOptions = Omit<ListAssortmentOptions, "pagination">

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
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>>

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
  ): Promise<BatchGetResult<AssortmentModel["object"], Entity.Assortment>>

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
  ): Promise<ListResponse<AssortmentModel["object"], Entity.Assortment>>

  /**
   * Получить общее количество ассортимента.
   *
   * @returns Общее количество ассортимента
   */
  size(options?: AllAssortmentOptions): Promise<ListMeta<AssortmentEntity>>
}

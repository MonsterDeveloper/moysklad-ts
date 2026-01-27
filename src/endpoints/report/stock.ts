import type {
  ArchivedFilter,
  AssortmentEntity,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  EnumFilter,
  FilterOptions,
  IdFilter,
  ListResponse,
  Meta,
  Model,
  NumberFilter,
  OrderOption,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"
import type { Entity } from "../../types/entity"

/**
 * Атрибуты объекта отчёта
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-atributy-ob-ekta-otcheta
 */
export interface StockAll extends Meta<AssortmentEntity> {
  /** Артикул */
  readonly article?: string
  /** Код */
  readonly code: string
  /** Внешний код сущности, по которой выводится остаток */
  readonly externalCode: string
  /**
   * Группа Товара/Модификации/Cерии
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-gruppa
   */
  readonly folder: Meta<Entity.ProductFolder> & {
    /** Наименование группы */
    readonly name: string
    /** Наименование родительской группы */
    readonly pathName: string
  }
  /** Метаданные изображения Товара/Модификации/Серии */
  readonly image?: Meta<Entity.Image>
  /** Ожидание */
  readonly inTransit: number
  /** Наименование */
  readonly name: string
  /** Себестоимость в копейках */
  readonly price?: number
  /** Доступно */
  readonly quantity: number
  /** Резерв */
  readonly reserve: number
  /** Цена продажи */
  readonly salePrice?: number
  /** Остаток */
  readonly stock: number
  /** Количество дней на складе */
  readonly stockDays: number
  /**
   * Единица измерения
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-edinica-izmereniq
   */
  readonly uom: Meta<Entity.Uom> & {
    /** Наименование единицы измерений */
    readonly name: string
  }
}

export interface StockAllModel extends Model {
  object: StockAll
  filters: {
    /** параметр для фильтрации по архивности товаров. Возможные значения: `true`, `false`. Для выдачи как архивных, так и не архивных товаров нужно передать сразу два значения true и false. */
    archived: ArchivedFilter
    /** параметр для фильтрации по нескольким сериям. Значение параметра - ссылка на серию, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `product` и `variant`. */
    consignment: IdFilter
    /** параметр для фильтрации по значению ожидания. Если передать `true`, в выборку попадут только товары с ожиданием. */
    inTransitOnly: BooleanFilter
    /** момент времени, на который нужно вывести остатки. Передается в виде строки в формате дата-время */
    moment: DateTimeFilter
    /** параметр для фильтрации по нескольким товарам. Значение параметра - ссылка на товар, который должен быть включен в выборку или исключен из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `consignment` и `variant`. */
    product: IdFilter
    /** параметр для фильтрации по нескольким группам товаров. Значение параметра - ссылка на группу товаров, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. */
    productFolder: IdFilter
    /** параметр учета вложенных подгрупп. Работает только при наличии фильтра по `productFolder`. По умолчанию `true`, выводятся товары из дочерних подгрупп фильтруемой группы / групп товаров. При передаче `false` выводятся только товары из фильтруемой группы / групп, без учета подгрупп. */
    withSubFolders: BooleanFilter
    /**
     * Параметр для фильтрации по значению доступно
     *
     * Возможные значения:
     * - `nonEmpty` - только ненулевые остатки
     * - `all` - все остатки
     * - `positiveOnly` - только положительные остатки
     * - `negativeOnly` - только отрицательные остатки
     * - `empty` - только нулевые остатки
     * - `underMinimum` - только остатки ниже неснижаемого
     *
     * @default `nonEmpty`
     */
    quantityMode: EnumFilter<
      | "nonEmpty"
      | "all"
      | "positiveOnly"
      | "negativeOnly"
      | "empty"
      | "underMinimum"
    >
    /** параметр для фильтрации по значению резерва. Если передать `true`, в выборку попадут только товары с резервом. */
    reserveOnly: BooleanFilter
    /** специальный параметр текстового поиска. Поиск осуществляется по вхождению подстроки в названия товаров, модификаций, серий. */
    search: StringFilter
    /** параметр для фильтрации по признаку весового товара */
    soldByWeight: BooleanFilter
    /** параметр для фильтрации по количеству дней на складе. Передавать нужно целое число. В выборку попадут товары, у которых количество дней на складе больше или равно указанному. Данный параметр фильтрации можно комбинировать с параметром `stockDaysTo`. */
    stockDaysFrom: NumberFilter
    /** параметр для фильтрации по количеству дней на складе. Передавать нужно целое число. В выборку попадут товары, у которых количество дней на складе меньше или равно указанному. Данный параметр фильтрации можно комбинировать с параметром `stockDaysFrom`. */
    stockDaysTo: NumberFilter
    /**
     * Параметр для фильтрации по значению остатка
     *
     * Возможные значения:
     * - `all` - все остатки
     * - `positiveOnly` - только положительные остатки
     * - `negativeOnly` - только отрицательные остатки
     * - `empty` - только нулевые остатки
     * - `nonEmpty` - только ненулевые остатки
     * - `underMinimum` - только остатки ниже неснижаемого
     *
     * @default `all`
     */
    stockMode: EnumFilter<
      | "all"
      | "positiveOnly"
      | "negativeOnly"
      | "empty"
      | "nonEmpty"
      | "underMinimum"
    >

    /** параметр для фильтрации по нескольким складам. Значение параметра - ссылка на склад, который должен быть учтен в выборке или исключен из нее. Можно передать несколько значений. */
    store: IdFilter
    /** параметр для фильтрации по нескольким поставщикам. Значение параметра - ссылка на контрагента или организацию. В выборку будут включены или исключены товары с указанными поставщиками. Можно передать пустое значение, тогда в выборку попадут товары с незаполненным или заполненным поставщиком. */
    supplier: IdFilter
    /** параметр для фильтрации по нескольким модификациям. Значение параметра - ссылка на модификацию, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `product` и `consignment`. */
    variant: IdFilter
  }
  /**
   * Поля, по которым можно сортировать
   *
   * Возможные значения:
   * - `avgStockDays` - по количеству дней на складе
   * - `code` - по коду
   * - `inTransit` - по значению ожидания
   * - `minimumBalance` - по неснижаемому остатку
   * - `name` - по наименованию
   * - `pathName` - по группе товаров
   * - `price` - по себестоимости
   * - `productCode` - по артикулу
   * - `quantity` - по остатку
   * - `reserve` - по резерву
   * - `salePrice` - по цене продажи
   * - `stock` - по остатку
   * - `sumTotal` - по сумме себестоимости
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-atributy-dostupnye-dlq-sortirowki
   */
  orderableFields:
    | "avgStockDays"
    | "code"
    | "inTransit"
    | "minimumBalance"
    | "name"
    | "pathName"
    | "price"
    | "productCode"
    | "quantity"
    | "reserve"
    | "salePrice"
    | "stock"
    | "sumTotal"
}

export interface StockAllOptions {
  pagination?: PaginationOptions
  order?: OrderOptions<StockAllModel>
  filter?: FilterOptions<StockAllModel>
  /**
   * Тип, по которому нужно сгруппировать выдачу.
   *
   * Возможные значения:
   * - `product` - выдает только товары
   * - `variant` - выдает товары и модификации
   * - `consignment` - выдает товары, модификации, серии
   */
  groupBy?: "product" | "variant" | "consignment"
  /**
   * Вывод остатков по модификациям и сериям товаров. Параметр позволяет включить в выборку остатки по модификациям и сериям для товаров. Необходимым условием для применения параметра является обязательное наличие фильтрации по товарам или модификациям или их комбинации. При выбранном значении `includeRelated=true` будут включены все остатки для товаров, модификаций и серий, указанных в параметрах фильтрации.
     При использовании параметра устанавливается параметр группировки `groupBy=consignment`, переданные значения для groupBy будут проигнорированы.
   */
  includeRelated?: boolean
}

/** Тип остатка, резерва, ожидания, которые необходимо рассчитать в кратком отчёте об остатках. */
export enum StockAllCurrentStockType {
  /** Физический остаток на складах, без учёта резерва и ожидания */
  Stock = "stock",

  /** Остаток на складах за вычетом резерва */
  FreeStock = "freeStock",

  /** Доступно. Учитывает резерв и ожидания */
  Quantity = "quantity",

  /** Резерв */
  Reserve = "reserve",

  /** Ожидание */
  InTransit = "inTransit",
}

export type StockAllCurrentRow<T extends StockAllCurrentStockType> = {
  /** ID ассортимента */
  assortmentId: string
} & {
  /** Расчитанный тип остатка */
  [K in T]: number
}

/**
 * Краткий отчёт об остатках
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-kratkij-otchet-ob-ostatkah
 */
export type StockAllCurrent<T extends StockAllCurrentStockType> =
  StockAllCurrentRow<T>[]

export interface StockAllCurrentOptions<T extends StockAllCurrentStockType> {
  /** Фильтры отчёта Текущие Остатки */
  filter?: {
    /** Выдать в отчёте только указанные товары, модификации и серии */
    assortmentId?: IdFilter

    /** Выдать в отчёте только указанные склады */
    storeId?: IdFilter
  }

  /**
   * Вывод нулевых остатков.
   *
   * Укажите `include: "zeroLines"`, чтобы вывести нулевые остатки. По умолчанию выводятся только результаты с ненулевым значением остатка.
   */
  include?: "zeroLines"

  /**
   * Получить остатки, которые изменились в интервале между временем указанным в параметре `changedSince` и текущим моментом.
   *
   * По умолчанию выводятся остатки на текущий момент. Остатки в ответе это фактический остаток на текущий момент времени на всех складах и с разбивкой по складам соответственно, не дельта за период, не остаток на момент времени changedSince, а фактический остаток по номенклатуре, у которой изменился остаток за интервал.
   *
   * Ограничения и рекомендации, накладываемые на параметр:
   * - При использовании параметра `changedSince` всегда включен вывод нулевых остатков.
   * - Максимальное значение параметра `changedSince` в прошлое от текущего момента не должно превышать 24 часа.
   * - Минимальное значение параметра `changedSince` в прошлое от текущего момента не ограничено.
   * - Параметр `changedSince` не может превышать текущий момент.
   * - Небольшое перекрытие интервалов запросов поможет исключить потерю обновления остатков на границах интервалов (пример: запрос остатков каждые 30 минут за прошедшие 35 минут).
   * - Рекомендуется проводить полную синхронизацию остатков без параметра `changedSince` раз в сутки и чаще, в зависимости от частоты изменения остатков.
   *
   * **Важно**: если за запрашиваемый интервал был удален или архивирован товар или склад, то будет выведен остаток равный 0. Стоит учитывать, что по `id` запросить этот товар или склад уже не получится.
   */
  changedSince?: DateTime

  /**
   * Тип остатка, резерва, ожидания, которые необходимо рассчитать.
   *
   * На данный момент возможно получить только один тип.
   *
   * @default StockAllCurrentStockType.Stock
   * {@linkcode StockAllCurrentStockType}
   */
  stockType?: T
}

export interface ReportStockEndpoint {
  all(options?: StockAllOptions): Promise<ListResponse<StockAll, Entity.Stock>>

  /**
   * Получить краткий отчёт об остатках.
   *
   * Эндпоинт предназначен для частого и быстрого обновления остатков, резервов и ожиданий для большого количества товаров.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-poluchit-kratkij-otchet-ob-ostatkah
   *
   * @param options Параметры запроса
   * @returns Краткий отчёт об остатках
   */
  allCurrent<
    T extends StockAllCurrentStockType = StockAllCurrentStockType.Stock,
  >(options?: StockAllCurrentOptions<T>): Promise<StockAllCurrent<T>>

  /**
   * Получить отчёт Остатки по складам.
   *
   * Эндпоинт предназначен для получения остатков по складам для товаров.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-ostatki-po-skladam
   *
   * @param options Параметры запроса
   * @returns Отчёт Остатки по складам
   */
  byStore(
    options?: StockByStoreOptions,
  ): Promise<ListResponse<StockByStore, Entity.StockByStore>>
}

/**
 * Атрибуты объекта отчёта Остатки по складам
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-ostatki-po-skladam-atributy-ob-ekta-otcheta
 */
export interface StockByStore extends Meta<AssortmentEntity> {
  /** Остатки по складам */
  readonly stockByStore: Array<{
    /** Метаданные склада, по которому выводится Остаток */
    readonly meta: Meta<Entity.Store>
    /** Наименование склада */
    readonly name: string
    /** Остаток */
    readonly stock: number
    /** Ожидание */
    readonly inTransit: number
    /** Резерв */
    readonly reserve: number
  }>
}

export interface StockByStoreOptions {
  pagination?: PaginationOptions
  filter?: {
    /** ссылка на серию, по которой нужно произвести фильтрацию */
    consignment?: IdFilter
    /** момент времени, на который нужно вывести остатки */
    moment?: DateTimeFilter
    /** ссылка на товар, по которому нужно произвести фильтрацию */
    product?: IdFilter
    /** ссылка на группу товаров, по которой нужно произвести фильтрацию */
    productFolder?: IdFilter
    /** специальный параметр текстового поиска */
    search?: StringFilter
    /** параметр для фильтрации по признаку весового товара */
    soldByWeight?: BooleanFilter
    /** параметр для фильтрации по значению остатка */
    stockMode?: EnumFilter<
      | "all"
      | "positiveOnly"
      | "negativeOnly"
      | "empty"
      | "nonEmpty"
      | "underMinimum"
    >
    /** ссылка на склад, для которого нужно построить отчет */
    store?: IdFilter
    /** параметр для фильтрации по поставщику */
    supplier?: IdFilter
    /** ссылка на модификация, по которой нужно произвести фильтрацию */
    variant?: IdFilter
  }
  order?: OrderOption<
    "pathName" | "name" | "code" | "productCode" | "stockOnAllStores"
  >
  /**
   * Тип, по которому нужно сгруппировать выдачу.
   *
   * По умолчанию параметр groupBy имеет значение variant. Если вы хотите увидеть объекты типа consignment, или только объекты типа product, необходимо выставить соответствующее значение параметра.
   *
   * @default "variant"
   */
  groupBy?: "product" | "variant" | "consignment"
}

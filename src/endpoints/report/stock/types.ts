import type {
  AssortmentEntity,
  BooleanFilter,
  DateTimeFilter,
  Entity,
  EnumFilter,
  FilterOptions,
  IdFilter,
  Meta,
  Model,
  NumberFilter,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../../types";

/**
 * Атрибуты объекта отчёта
 *
 * @link https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-atributy-ob-ekta-otcheta
 */
export interface StockAll extends Meta<AssortmentEntity> {
  /** Артикул */
  readonly article?: string;
  /** Код */
  readonly code: string;
  /** Внешний код сущности, по которой выводится остаток */
  readonly externalCode: string;
  /**
   * Группа Товара/Модификации/Cерии
   *
   * @link https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-gruppa
   */
  readonly folder: Meta<Entity.ProductFolder> & {
    /** Наименование группы */
    readonly name: string;
    /** Наименование родительской группы */
    readonly pathName: string;
  };
  /** Метаданные изображения Товара/Модификации/Серии */
  readonly image?: Meta<Entity.Image>;
  /** Ожидание */
  readonly inTransit: number;
  /** Наименование */
  readonly name: string;
  /** Себестоимость в копейках */
  readonly price?: number;
  /** Доступно */
  readonly quantity: number;
  /** Резерв */
  readonly reserve: number;
  /** Цена продажи */
  readonly salePrice?: number;
  /** Остаток */
  readonly stock: number;
  /** Количество дней на складе */
  readonly stockDays: number;
  /**
   * Единица измерения
   *
   * @link https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-edinica-izmereniq
   */
  readonly uom: Meta<Entity.Uom> & {
    /** Наименование единицы измерений */
    readonly name: string;
  };
}

export interface StockAllModel extends Model {
  object: StockAll;
  filters: {
    /** параметр для фильтрации по архивности товаров. Возможные значения: `true`, `false`. Для выдачи как архивных, так и не архивных товаров нужно передать сразу два значения true и false. */
    archived: BooleanFilter;
    /** параметр для фильтрации по нескольким сериям. Значение параметра - ссылка на серию, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `product` и `variant`. */
    consignment: IdFilter;
    /** параметр для фильтрации по значению ожидания. Если передать `true`, в выборку попадут только товары с ожиданием. */
    inTransitOnly: BooleanFilter;
    /** момент времени, на который нужно вывести остатки. Передается в виде строки в формате дата-время */
    moment: DateTimeFilter;
    /** параметр для фильтрации по нескольким товарам. Значение параметра - ссылка на товар, который должен быть включен в выборку или исключен из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `consignment` и `variant`. */
    product: IdFilter;
    /** параметр для фильтрации по нескольким группам товаров. Значение параметра - ссылка на группу товаров, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. */
    productFolder: IdFilter;
    /** параметр учета вложенных подгрупп. Работает только при наличии фильтра по `productFolder`. По умолчанию `true`, выводятся товары из дочерних подгрупп фильтруемой группы / групп товаров. При передаче `false` выводятся только товары из фильтруемой группы / групп, без учета подгрупп. */
    withSubFolders: BooleanFilter;
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
    >;
    /** параметр для фильтрации по значению резерва. Если передать `true`, в выборку попадут только товары с резервом. */
    reserveOnly: BooleanFilter;
    /** специальный параметр текстового поиска. Поиск осуществляется по вхождению подстроки в названия товаров, модификаций, серий. */
    search: StringFilter;
    /** параметр для фильтрации по признаку весового товара */
    soldByWeight: BooleanFilter;
    /** параметр для фильтрации по количеству дней на складе. Передавать нужно целое число. В выборку попадут товары, у которых количество дней на складе больше или равно указанному. Данный параметр фильтрации можно комбинировать с параметром `stockDaysTo`. */
    stockDaysFrom: NumberFilter;
    /** параметр для фильтрации по количеству дней на складе. Передавать нужно целое число. В выборку попадут товары, у которых количество дней на складе меньше или равно указанному. Данный параметр фильтрации можно комбинировать с параметром `stockDaysFrom`. */
    stockDaysTo: NumberFilter;
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
    >;

    /** параметр для фильтрации по нескольким складам. Значение параметра - ссылка на склад, который должен быть учтен в выборке или исключен из нее. Можно передать несколько значений. */
    store: IdFilter;
    /** параметр для фильтрации по нескольким поставщикам. Значение параметра - ссылка на контрагента или организацию. В выборку будут включены или исключены товары с указанными поставщиками. Можно передать пустое значение, тогда в выборку попадут товары с незаполненным или заполненным поставщиком. */
    supplier: IdFilter;
    /** параметр для фильтрации по нескольким модификациям. Значение параметра - ссылка на модификацию, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. Данный параметр фильтрации можно комбинировать с параметрами `product` и `consignment`. */
    variant: IdFilter;
  };
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
   * @link https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-ostatki-rasshirennyj-otchet-ob-ostatkah-atributy-dostupnye-dlq-sortirowki
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
    | "sumTotal";
}

export interface StockAllOptions {
  pagination?: PaginationOptions;
  order?: OrderOptions<StockAllModel>;
  filter?: FilterOptions<StockAllModel>;
  /**
   * Тип, по которому нужно сгруппировать выдачу.
   *
   * Возможные значения:
   * - `product` - выдает только товары
   * - `variant` - выдает товары и модификации
   * - `consignment` - выдает товары, модификации, серии
   */
  groupBy?: "product" | "variant" | "consignment";
  /**
   * Вывод остатков по модификациям и сериям товаров. Параметр позволяет включить в выборку остатки по модификациям и сериям для товаров. Необходимым условием для применения параметра является обязательное наличие фильтрации по товарам или модификациям или их комбинации. При выбранном значении `includeRelated=true` будут включены все остатки для товаров, модификаций и серий, указанных в параметрах фильтрации.
     При использовании параметра устанавливается параметр группировки `groupBy=consignment`, переданные значения для groupBy будут проигнорированы.
   */
  includeRelated?: boolean;
}

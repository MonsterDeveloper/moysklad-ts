import type {
  AssortmentEntity,
  BooleanFilter,
  DateTime,
  Entity,
  EqualityFilter,
  FilterOptions,
  IdFilter,
  ListResponse,
  Metadata,
  Model,
  PaginationOptions,
} from "../../types"

/**
 * Прибыльность по модификациям
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-pribyl-nost-poluchit-pribyl-nost-po-modifikaciqm
 */
export interface ByVariantProfitReport {
  /** Краткое представление Модификации, Услуги или Комплекта в отчете. */
  assortment: {
    /** Метаданные Модификации, Услуги или Комплекта */
    meta: Metadata<AssortmentEntity>
    /** Наименование сущности */
    name: string
    /** Код сущности */
    code: string
    /** Артикул Модификации или Комплекта */
    article?: string
    /** Изображение Модификации */
    image?: unknown // TODO add image type
    /** Единица измерения */
    uom: {
      meta: Metadata<Entity.Uom>
      name: string
    }
  }
  /** Рентабельность */
  margin: number
  /** Прибыль */
  profit: number
  /** Себестоимость возвратов в копейках */
  returnCost: number
  /** Сумма себестоимостей возвратов в копейках */
  returnCostSum: number
  /** Цена возвратов */
  returnPrice: number
  /** Возвращенное количество */
  returnQuantity: number
  /** Сумма возвратов */
  returnSum: number
  /** Себестоимость в копейках */
  sellCost: number
  /** Сумма себестоимостей продаж в копейках */
  sellCostSum: number
  /** Цена продаж (средняя) */
  sellPrice: number
  /** Проданное количество */
  sellQuantity: number
  /** Сумма продаж */
  sellSum: number
}

export interface ByVariantProfitReportModel extends Model {
  object: ByVariantProfitReport
  filters: {
    /** ссылка на товар, услугу, комплект, модификацию или серию, по которой нужно произвести фильтрацию. Можно передать несколько значений. Одновременная фильтрация по `product` и `productFolder` не поддерживается. */
    product: IdFilter
    /** параметр для фильтрации по нескольким группам товаров. Значение параметра - ссылка на группу товаров, которая должна быть включена в выборку или исключена из нее. Можно передать несколько значений. Одновременная фильтрация по `product` и `productFolder` не поддерживается. */
    productFolder: IdFilter
    /** параметр учета вложенных подгрупп. Работает только при наличии фильтра по `productFolder`. По умолчанию `true`, выводятся товары из дочерних подгрупп фильтруемой группы / групп товаров. При передаче `false` выводятся только товары из фильтруемой группы / групп, без учета подгрупп. */
    withSubFolders: BooleanFilter
    /** строка с названием группы контрагентов, по которой нужно произвести фильтрацию. */
    agentTag: EqualityFilter<string>
    /** ссылка на контрагента, по которому нужно произвести фильтрацию. */
    counterparty: IdFilter
    /** ссылка на юрлицо, по которому нужно произвести фильтрацию. */
    organization: IdFilter
    /** ссылка на склад, по которому нужно произвести фильтрацию. */
    store: IdFilter
    /** ссылка на проект, по которому нужно произвести фильтрацию. */
    project: IdFilter
    /** ссылка на точку продаж, по которой нужно произвести фильтрацию. */
    retailStore: IdFilter
    /** параметр для фильтрации по поставщику. Значение параметра - ссылка на контрагента или организацию. В выборку будут включены товары с указанным поставщиком. */
    supplier: IdFilter
    /** ссылка на канал продаж, по которому нужно провести фильтрацию. Допустимо повторное использование фильтра, когда требуется фильтрация по нескольким каналам продаж. */
    salesChannel: IdFilter
  }
}

export interface ByVariantProfitReportListOptions {
  pagination?: PaginationOptions
  filter?: FilterOptions<ByVariantProfitReportModel>
  /**
   * При отсутствии параметров `momentFrom` и `momentTo` отображаются отчеты за последний месяц.
   *
   * При отсутствии параметра `momentFrom` и указании параметра `momentTo` отображаются отчеты с начала текущего года по `momentTo`.
   *
   * При отсутствии параметра `momentTo` и указании параметра `momentFrom` отображаются отчеты с `momentFrom` по текущий день.
   */
  momentFrom?: DateTime
  /**
   * При отсутствии параметров `momentFrom` и `momentTo` отображаются отчеты за последний месяц.
   *
   * При отсутствии параметра `momentFrom` и указании параметра `momentTo` отображаются отчеты с начала текущего года по `momentTo`.
   *
   * При отсутствии параметра `momentTo` и указании параметра `momentFrom` отображаются отчеты с `momentFrom` по текущий день.
   */
  momentTo?: DateTime
}

export interface ReportProfitEndpoint {
  byVariant: (
    options?: ByVariantProfitReportListOptions,
  ) => Promise<ListResponse<ByVariantProfitReport, Entity.SalesByVariant>>
}

import type {
  ArchivedFilter,
  AssortmentEntity,
  BooleanFilter,
  DateTime,
  Entity,
  FilterOptions,
  IdFilter,
  ListResponse,
  Metadata,
  Model,
  PaginationOptions,
} from "../../types"

/**
 * Показатели оборотов (начало/конец периода, приход/расход)
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-oboroty-oboroty-po-towaram-struktura-ob-ekta-pokazateli-onperiodstart-onperiodend-income-outcome
 */
export interface TurnoverMetrics {
  /** Сумма себестоимости в копейках */
  sum: number
  /** Количество единиц товара */
  quantity: number
}

/**
 * Краткое представление Товара или Модификации в отчете
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-oboroty-oboroty-po-towaram-struktura-ob-ekta-assortment
 */
export interface TurnoverAssortment {
  /** Метаданные Товара или Модификации */
  meta: Metadata<AssortmentEntity>
  /** Наименование Товара или Модификации */
  name: string
  /** Код Товара */
  code?: string
  /** Артикул Товара */
  article?: string
  /** Изображение Товара или Модификации */
  image?: unknown // TODO add image type
  /** Группа Товара или Модификации */
  productFolder?: {
    meta: Metadata<Entity.ProductFolder>
    name: string
  }
  /** Единица измерения */
  uom?: {
    meta: Metadata<Entity.Uom>
    name: string
  }
}

/**
 * Обороты по товарам
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-oboroty-oboroty-po-towaram
 */
export interface TurnoverReport {
  /** Краткое представление Товара или Модификации в отчете */
  assortment: TurnoverAssortment
  /** Показатели на начало периода */
  onPeriodStart: TurnoverMetrics
  /** Показатели на конец периода */
  onPeriodEnd: TurnoverMetrics
  /** Показатели прихода в течение периода отчета */
  income: TurnoverMetrics
  /** Показатели расхода в течение периода отчета */
  outcome: TurnoverMetrics
}

/**
 * Детализация оборотов по складам
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-oboroty-oboroty-po-towaru-s-detalizaciej-po-skladam-struktura-ob-ekta-detalizaciq-oborotow-po-skladam
 */
export interface TurnoverByStoreReport {
  /** Краткое представление Товара или Модификации в отчете */
  assortment: TurnoverAssortment
  /** Детализация оборотов по складам */
  stockByStore: Array<{
    /** Склад */
    store: {
      meta: Metadata<Entity.Store>
      name: string
    }
    /** Показатели на начало периода */
    onPeriodStart: TurnoverMetrics
    /** Показатели на конец периода */
    onPeriodEnd: TurnoverMetrics
    /** Показатели прихода в течение периода отчета */
    income: TurnoverMetrics
    /** Показатели расхода в течение периода отчета */
    outcome: TurnoverMetrics
  }>
}

/**
 * Обороты по товару с детализацией по документам
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-oboroty-oboroty-po-towaru-s-detalizaciej-po-dokumentam
 */
export interface TurnoverByOperationReport {
  /** Краткое представление Товара или Модификации в отчете */
  assortment: TurnoverAssortment
  /** Склад */
  store: {
    meta: Metadata<Entity.Store>
    name: string
  }
  /** Документ, связанный с Товаром */
  operation: {
    meta: Metadata<Entity>
    name: string
    description?: string
    moment: DateTime
    agent?: {
      meta: Metadata<Entity.Counterparty>
      name: string
    }
  }
  /** Количество товара в документе */
  quantity: number
  /** Себестоимость товара в копейках в документе */
  cost: number
  /** Сумма себестоимостей в копейках */
  sum: number
}

export interface TurnoverReportModel extends Model {
  object: TurnoverReport
  filters: {
    /** ссылка на контрагента, по которому нужно произвести фильтрацию */
    agent: IdFilter
    /** строка с названием группы контрагентов, по которой нужно произвести фильтрацию */
    agentTag: IdFilter
    /** ссылка на договор, по которому нужно произвести фильтрацию */
    contract: IdFilter
    /** ссылка на юрлицо, по которому нужно произвести фильтрацию */
    organization: IdFilter
    /** ссылка на товар, по которому нужно произвести фильтрацию */
    product: IdFilter
    /** ссылка на проект, по которому нужно произвести фильтрацию */
    project: IdFilter
    /** ссылка на точку продаж, по которой нужно произвести фильтрацию */
    retailStore: IdFilter
    /** ссылка на склад, по которому нужно произвести фильтрацию */
    store: IdFilter
    /** параметр для фильтрации по поставщику */
    supplier: IdFilter
    /** тип документа */
    type:
      | "supply"
      | "purchasereturn"
      | "demand"
      | "salesreturn"
      | "loss"
      | "enter"
      | "move"
      | "processing"
      | "retaildemand"
      | "retailsalesreturn"
      | "productionstagecompletion"

    /** ссылка на модификацию, по которой нужно произвести фильтрацию */
    variant: IdFilter
    /** параметр для фильтрации "Показывать товары без движения" */
    withoutturnover: BooleanFilter
    /** параметр для фильтрации "Показывать архивные" */
    archived: ArchivedFilter
  }
}

export interface TurnoverReportListOptions {
  pagination?: PaginationOptions
  filter?: FilterOptions<TurnoverReportModel>
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
  /**
   * Тип, по которому нужно сгруппировать выдачу.
   * По умолчанию параметр groupBy имеет значение product.
   */
  groupBy?: "product" | "variant"
}

export interface TurnoverByStoreReportListOptions {
  filter?: FilterOptions<TurnoverReportModel>
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

export interface TurnoverByOperationReportListOptions {
  filter?: FilterOptions<TurnoverReportModel>
  /**
   * Начало периода отчета
   */
  momentFrom: DateTime
  /**
   * Конец периода отчета
   */
  momentTo: DateTime
}

export interface ReportTurnoverEndpoint {
  /** Обороты по товарам */
  all: (
    options?: TurnoverReportListOptions,
  ) => Promise<ListResponse<TurnoverReport, Entity.TurnoverAll>>

  /** Обороты по товару с детализацией по складам */
  byStore: (
    options?: TurnoverByStoreReportListOptions,
  ) => Promise<ListResponse<TurnoverByStoreReport, Entity.TurnoverByStore>>

  /** Обороты по товару с детализацией по документам */
  byOperation: (
    options: TurnoverByOperationReportListOptions,
  ) => Promise<
    ListResponse<TurnoverByOperationReport, Entity.TurnoverByOperation>
  >
}

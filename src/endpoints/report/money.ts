import type { DateTime, Entity, EqualsFilter, Meta } from "../../types"

export interface GetCashFlowOptions {
  filter?: {
    /** ссылка на юр. лицо */
    organization?: EqualsFilter<string>

    /** ссылка на проект */
    project?: EqualsFilter<string>
  }

  /** Начало периода отчета */
  momentFrom: DateTime

  /** Конец периода отчета */
  momentTo: DateTime

  /** Интервал, с которым будет построен отчет.
   *
   * Может принимать значения `hour`, `day`, `month` для разбиения указанного периода по часам, дням и месяцам соответственно */
  interval: "hour" | "day" | "month"
}

export interface GetCashFlowResponse extends Meta<Entity.MoneyPlotSeries> {
  /** Доход */
  credit: number

  /** Расход */
  debit: number

  /** Массив показателей */
  series: {
    /** Дата */
    date: DateTime

    /** Доход за период */
    credit: number

    /** Расход за период */
    debit: number

    /** Баланс (доход - расход) */
    balance: number
  }[]
}

/**
 * Отчёт Остатки денежных средств
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-den-gi-ostatki-denezhnyh-sredstw
 * */
export interface GetCashBalanceResponse extends Meta<Entity.MoneyReport> {
  rows: {
    /** Юрлицо */
    organization: Meta<Entity.Organization> & {
      /** Наименование */
      name: string
    }

    /**
     * Счёт организации
     *
     * Не выводится для остатка кассы, так как касса одна на организацию.
     */
    account?: Meta<Entity.Account> & {
      /** Номер счёта */
      name: string
    }

    /** Текущий остаток */
    balance: number
  }[]
}

export interface ReportMoneyEndpoint {
  /**
   * Отчёт о движении денежных средств.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-den-gi-dwizhenie-denezhnyh-sredstw
   *
   * @param options Параметры запроса {@linkcode GetCashFlowOptions}
   * @returns Отчёт о движении денежных средств {@linkcode GetCashFlowResponse}
   */
  plotSeries: (options: GetCashFlowOptions) => Promise<GetCashFlowResponse>

  /**
   * Получить отчёт Остатки денежных средств.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-den-gi-ostatki-denezhnyh-sredstw
   *
   * @returns Отчёт о движении денежных средств {@linkcode GetCashBalanceResponse}
   */
  byAccount: () => Promise<GetCashBalanceResponse>
}

import { composeSearchParameters } from "../../../api-client";
import { BaseEndpoint } from "../../base-endpoint";
import type {
  GetCashBalanceResponse,
  GetCashFlowOptions,
  GetCashFlowResponse,
} from "./types";

const ENDPOINT_URL = "/report/money";

export class MoneyEndpoint extends BaseEndpoint {
  /**
   * Отчёт о движении денежных средств.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-den-gi-dwizhenie-denezhnyh-sredstw
   *
   * @param options Параметры запроса {@linkcode GetCashFlowOptions}
   * @returns Отчёт о движении денежных средств {@linkcode GetCashFlowResponse}
   */
  async getCashFlow(options: GetCashFlowOptions): Promise<GetCashFlowResponse> {
    const searchParameters =
      composeSearchParameters({
        filter: options.filter,
      }) ?? new URLSearchParams();

    searchParameters.append("momentFrom", options.momentFrom);
    searchParameters.append("momentTo", options.momentTo);
    searchParameters.append("interval", options.interval);

    const response = await this.client.get(`${ENDPOINT_URL}/plotseries`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить отчёт Остатки денежных средств.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety-otchet-den-gi-ostatki-denezhnyh-sredstw
   *
   * @param options Параметры запроса {@linkcode GetCashBalanceOptions}
   * @returns Отчёт о движении денежных средств {@linkcode GetCashBalanceResponse}
   */
  async getCashBalance(): Promise<GetCashBalanceResponse> {
    const response = await this.client.get(`${ENDPOINT_URL}/byaccount`);

    return response.json();
  }
}

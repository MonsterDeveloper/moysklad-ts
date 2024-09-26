import { BaseEndpoint } from "../../base-endpoint";
import type {
  StockAll,
  StockAllCurrent,
  StockAllCurrentOptions,
  StockAllCurrentStockType,
  StockAllOptions,
} from "./types";
import type { Entity, ListResponse } from "../../../types";
import { composeSearchParameters } from "../../../api-client";

const ENDPOINT_URL = "/report/stock";

export class StockEndpoint extends BaseEndpoint {
  async all(
    options?: StockAllOptions,
  ): Promise<ListResponse<StockAll, Entity.Stock>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/all`, {
      searchParameters,
    });
    return response.json();
  }

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
  async allCurrent<
    T extends StockAllCurrentStockType = StockAllCurrentStockType.Stock,
  >(options?: StockAllCurrentOptions<T>): Promise<StockAllCurrent<T>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/all/current`, {
      searchParameters,
    });
    return response.json();
  }
}

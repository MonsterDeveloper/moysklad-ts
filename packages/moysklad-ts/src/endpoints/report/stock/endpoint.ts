import { BaseEndpoint } from "@/endpoints/base-endpoint";
import type { StockAll, StockAllOptions } from "./types";
import type { Entity, ListResponse } from "@/types";
import { composeSearchParameters } from "@/api-client";

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
}

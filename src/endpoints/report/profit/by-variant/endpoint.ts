import { BaseEndpoint } from "../../../base-endpoint";
import type {
  ByVariantProfitReport,
  ByVariantProfitReportListOptions,
} from "./types";
import type { Entity, ListResponse } from "../../../../types";
import { composeSearchParameters } from "../../../../api-client";

const ENDPOINT_URL = "/report/profit/byvariant";

export class ByVariantEndpoint extends BaseEndpoint {
  async list(
    options?: ByVariantProfitReportListOptions,
  ): Promise<ListResponse<ByVariantProfitReport, Entity.SalesByVariant>> {
    const searchParameters =
      composeSearchParameters({
        filter: options?.filter,
        pagination: options?.pagination,
      }) || new URLSearchParams();

    if (options?.momentFrom)
      searchParameters.append("momentFrom", options.momentFrom);
    if (options?.momentTo)
      searchParameters.append("momentTo", options.momentTo);

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }
}

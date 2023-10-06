import type { Entity, GetFindResult, ListResponse, Subset } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type { DemandModel, ListDemandsOptions } from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/demand";

export class DemandEndpoint extends BaseEndpoint {
  async list<T extends ListDemandsOptions = Record<string, unknown>>(
    options?: Subset<T, ListDemandsOptions>,
  ): Promise<
    ListResponse<GetFindResult<DemandModel, T["expand"]>, Entity.Demand>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }
}

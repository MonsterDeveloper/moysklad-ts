import {
  MediaType,
  type BatchDeleteResult,
  type Entity,
  type GetFindResult,
  type ListResponse,
  type Subset,
  type BatchGetResult,
} from "../../types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  AllDemandsOptions,
  DemandModel,
  FirstDemandOptions,
  GetDemandOptions,
  ListDemandsOptions,
} from "./types";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/demand";

export class DemandEndpoint extends BaseEndpoint {
  async list<T extends ListDemandsOptions = Record<string, unknown>>(
    options?: Subset<T, ListDemandsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.Demand
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllDemandsOptions = Record<string, unknown>>(
    options?: Subset<T, AllDemandsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.BonusTransaction
    >
  > {
    return this.client.batchGet(
      async (limit, offset) =>
        this.list({
          ...options,
          pagination: { limit, offset },
        }),
      Boolean(options?.expand),
    );
  }

  async get<T extends GetDemandOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetDemandOptions>,
  ): Promise<GetFindResult<DemandModel, T["expand"], T["fields"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstDemandOptions = Record<string, unknown>>(
    options?: Subset<T, FirstDemandOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.Demand
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }

  async trash(id: string): Promise<void> {
    await this.client.post(`${ENDPOINT_URL}/${id}/trash`);
  }
}

import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";
import {
  Entity,
  MediaType,
  type BatchDeleteResult,
  type GetFindResult,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type BatchGetResult,
  type ModelCreateOrUpdateData,
  type MatchArrayType,
} from "../../types";
import type {
  AllSuppliesOptions,
  SupplyModel,
  FirstSupplyOptions,
  GetSupplyOptions,
  ListSuppliesOptions,
  UpsertSuppliesOptions,
  UpdateSupplyOptions,
  SupplyTemplateData,
} from "./types";

const ENDPOINT_URL = "/entity/supply";

export class SupplyEndpoint extends BaseEndpoint {
  async list<T extends ListSuppliesOptions = Record<string, unknown>>(
    options?: Subset<T, ListSuppliesOptions>,
  ): Promise<
    ListResponse<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllSuppliesOptions = Record<string, unknown>>(
    options?: Subset<T, AllSuppliesOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
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

  async get<T extends GetSupplyOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetSupplyOptions>,
  ): Promise<GetFindResult<SupplyModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<T extends UpdateSupplyOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<SupplyModel>,
    options?: Subset<T, UpdateSupplyOptions>,
  ): Promise<GetFindResult<SupplyModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async upsert<
    TData extends ModelCreateOrUpdateData<SupplyModel>,
    TOptions extends UpsertSuppliesOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertSuppliesOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<SupplyModel, TOptions["expand"]>>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstSupplyOptions = Record<string, unknown>>(
    options?: Subset<T, FirstSupplyOptions>,
  ): Promise<
    ListResponse<GetFindResult<SupplyModel, T["expand"]>, Entity.Supply>
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
          type: Entity.Supply,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }

  async template(data: SupplyTemplateData): Promise<SupplyModel["object"]> {
    const response = await this.client.put(`${ENDPOINT_URL}/new`, {
      body: data,
    });

    return response.json();
  }
}

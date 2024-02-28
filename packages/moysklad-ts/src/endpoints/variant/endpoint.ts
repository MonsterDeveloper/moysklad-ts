import {
  Entity,
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  MediaType,
  type BatchDeleteResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
} from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  ListVariantsOptions,
  CreateVariantOptions,
  VariantModel,
  AllVariantsOptions,
  FirstVariantOptions,
  GetVariantOptions,
  UpdateVariantOptions,
} from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/variant";

export class VariantEndpoint extends BaseEndpoint {
  async list<T extends ListVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, ListVariantsOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, AllVariantsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<VariantModel, T["expand"]>,
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

  async first<T extends FirstVariantOptions = Record<string, unknown>>(
    options?: Subset<T, FirstVariantOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async get<T extends GetVariantOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  async update<T extends UpdateVariantOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<VariantModel>,
    options?: Subset<T, UpdateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreateVariantOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<VariantModel>,
    options?: Subset<T, CreateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
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

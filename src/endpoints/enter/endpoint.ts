import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";
import {
  Entity,
  MediaType,
  type BatchDeleteResult,
  type GetFindResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type UpdateMeta,
  type BatchGetResult,
} from "../../types";
import type {
  EnterModel,
  ListEntersOptions,
  CreateEnterOptions,
  UpdateEnterOptions,
  FirstEnterOptions,
  GetEnterOptions,
  AllEntersOptions,
} from "./types";

const ENDPOINT_URL = "/entity/enter";

export class EnterEndpoint extends BaseEndpoint {
  async list<T extends ListEntersOptions = Record<string, unknown>>(
    options?: Subset<T, ListEntersOptions>,
  ): Promise<
    ListResponse<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllEntersOptions = Record<string, unknown>>(
    options?: Subset<T, AllEntersOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>
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

  async get<T extends GetEnterOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<T extends UpdateEnterOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<EnterModel>,
    options?: Subset<T, UpdateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreateEnterOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<EnterModel>,
    options?: Subset<T, CreateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async upsert<T extends CreateEnterOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<EnterModel>
      | (GetModelUpdatableFields<EnterModel> & UpdateMeta<Entity.Enter>)
    )[],
    options?: Subset<T, CreateEnterOptions>,
  ): Promise<GetFindResult<EnterModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstEnterOptions = Record<string, unknown>>(
    options?: Subset<T, FirstEnterOptions>,
  ): Promise<
    ListResponse<GetFindResult<EnterModel, T["expand"]>, Entity.Enter>
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
          type: Entity.Enter,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

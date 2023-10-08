import {
  MediaType,
  type BatchDeleteResult,
  type Entity,
  type GetFindResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type UpdateMeta,
  type BatchGetResult,
} from "@/types";
import type {
  AllBonusTransactionsOptions,
  BonusTransactionModel,
  CreateBonusTransactionOptions,
  FirstBonusTransactionOptions,
  GetBonusTransactionOptions,
  ListBonusTransactionsOptions,
  UpdateBonusTransactionOptions,
} from "./types";
import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/bonustransaction";

export class BonusTransactionEndpoint extends BaseEndpoint {
  async list<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, AllBonusTransactionsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<BonusTransactionModel, T["expand"]>,
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

  async get<T extends GetBonusTransactionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<
    T extends UpdateBonusTransactionOptions = Record<string, unknown>,
  >(
    id: string,
    data: GetModelUpdatableFields<BonusTransactionModel>,
    options?: Subset<T, UpdateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<
    T extends CreateBonusTransactionOptions = Record<string, unknown>,
  >(
    data: GetModelCreatableFields<BonusTransactionModel>,
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async upsert<
    T extends CreateBonusTransactionOptions = Record<string, unknown>,
  >(
    data: (
      | GetModelCreatableFields<BonusTransactionModel>
      | (GetModelUpdatableFields<BonusTransactionModel> & UpdateMeta)
    )[],
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstBonusTransactionOptions = Record<string, unknown>>(
    options?: Subset<T, FirstBonusTransactionOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
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
}

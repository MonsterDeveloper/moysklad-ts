import {
  Entity,
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  MediaType,
  type BatchDeleteResult,
  type GetModelUpdatableFields,
  type ModelCreateOrUpdateData,
} from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  ListProductsOptions,
  CreateProductOptions,
  ProductModel,
  AllProductsOptions,
  FirstProductOptions,
  GetProductOptions,
  UpdateProductOptions,
} from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/product";

export class ProductEndpoint extends BaseEndpoint {
  async list<T extends ListProductsOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductsOptions>,
  ): Promise<
    ListResponse<GetFindResult<ProductModel, T["expand"]>, Entity.Product>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllProductsOptions = Record<string, unknown>>(
    options?: Subset<T, AllProductsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductModel, T["expand"]>,
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

  async first<T extends FirstProductOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProductOptions>,
  ): Promise<
    ListResponse<GetFindResult<ProductModel, T["expand"]>, Entity.Product>
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async get<T extends GetProductOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductOptions>,
  ): Promise<GetFindResult<ProductModel, T["expand"]>> {
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

  async update<T extends UpdateProductOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductModel>,
    options?: Subset<T, UpdateProductOptions>,
  ): Promise<GetFindResult<ProductModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreateProductOptions = Record<string, unknown>>(
    data: ModelCreateOrUpdateData<ProductModel>,
    options?: Subset<T, CreateProductOptions>,
  ): Promise<GetFindResult<ProductModel, T["expand"]>> {
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

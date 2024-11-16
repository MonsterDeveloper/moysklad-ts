import {
  Entity,
  MediaType,
  type BatchDeleteResult,
  type BatchGetResult,
  type GetFindResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type UpdateMeta,
} from "../../types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  AllPaymentInsOptions,
  CreatePaymentInOptions,
  FirstPaymentInOptions,
  GetPaymentInOptions,
  ListPaymentInsOptions,
  PaymentInModel,
  UpdatePaymentInOptions,
} from "./types";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/paymentin";

export class PaymentInEndpoint extends BaseEndpoint {
  async list<T extends ListPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentInsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllPaymentInsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentInsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
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

  async get<T extends GetPaymentInOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<T extends UpdatePaymentInOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentInModel>,
    options?: Subset<T, UpdatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<PaymentInModel>,
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async upsert<T extends CreatePaymentInOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<PaymentInModel>
      | (GetModelUpdatableFields<PaymentInModel> & UpdateMeta<Entity.PaymentIn>)
    )[],
    options?: Subset<T, CreatePaymentInOptions>,
  ): Promise<GetFindResult<PaymentInModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstPaymentInOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentInOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentInModel, T["expand"]>, Entity.PaymentIn>
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
          type: Entity.PaymentIn,
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

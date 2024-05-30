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
  ListPaymentOutsOptions,
  GetPaymentOutOptions,
  PaymentOutModel,
  AllPaymentOutsOptions,
  FirstPaymentOutOptions,
  UpdatePaymentOutOptions,
  CreatePaymentOutOptions,
} from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/paymentout";

export class PaymentOutEndpoint extends BaseEndpoint {
  async list<T extends ListPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListPaymentOutsOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllPaymentOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllPaymentOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<PaymentOutModel, T["expand"]>,
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

  async first<T extends FirstPaymentOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPaymentOutOptions>,
  ): Promise<
    ListResponse<GetFindResult<PaymentOutModel, T["expand"]>, Entity.Product>
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async get<T extends GetPaymentOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>> {
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

  async update<T extends UpdatePaymentOutOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PaymentOutModel>,
    options?: Subset<T, UpdatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreatePaymentOutOptions = Record<string, unknown>>(
    data: ModelCreateOrUpdateData<PaymentOutModel>,
    options?: Subset<T, CreatePaymentOutOptions>,
  ): Promise<GetFindResult<PaymentOutModel, T["expand"]>> {
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

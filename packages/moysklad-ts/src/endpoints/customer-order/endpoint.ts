import {
  Entity,
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  MediaType,
  type BatchDeleteResult,
} from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  AllCustomerOrdersOptions,
  CustomerOrderModel,
  FirstCustomerOrderOptions,
  GetCustomerOrderOptions,
  ListCustomerOrdersOptions,
} from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/customerorder";

export class CustomerOrderEndpoint extends BaseEndpoint {
  async list<T extends ListCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, ListCustomerOrdersOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, AllCustomerOrdersOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<CustomerOrderModel, T["expand"]>,
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

  async first<T extends FirstCustomerOrderOptions = Record<string, unknown>>(
    options?: Subset<T, FirstCustomerOrderOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async get<T extends GetCustomerOrderOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>> {
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

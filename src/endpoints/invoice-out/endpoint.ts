import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";
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
} from "../../types";
import type {
  AllInvoiceOutsOptions,
  InvoiceOutModel,
  CreateInvoiceOutOptions,
  FirstInvoiceOutOptions,
  GetInvoiceOutOptions,
  ListInvoiceOutsOptions,
  UpdateInvoiceOutOptions,
} from "./types";

const ENDPOINT_URL = "/entity/invoiceout";

export class InvoiceOutEndpoint extends BaseEndpoint {
  async list<T extends ListInvoiceOutsOptions = Record<string, unknown>>(
    options?: Subset<T, ListInvoiceOutsOptions>,
  ): Promise<
    ListResponse<GetFindResult<InvoiceOutModel, T["expand"]>, Entity.InvoiceOut>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllInvoiceOutsOptions = Record<string, unknown>>(
    options?: Subset<T, AllInvoiceOutsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<InvoiceOutModel, T["expand"]>,
      Entity.InvoiceOut
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

  async get<T extends GetInvoiceOutOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<T extends UpdateInvoiceOutOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<InvoiceOutModel>,
    options?: Subset<T, UpdateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<T extends CreateInvoiceOutOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<InvoiceOutModel>,
    options?: Subset<T, CreateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async upsert<T extends CreateInvoiceOutOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<InvoiceOutModel>
      | (GetModelUpdatableFields<InvoiceOutModel> &
          UpdateMeta<Entity.InvoiceOut>)
    )[],
    options?: Subset<T, CreateInvoiceOutOptions>,
  ): Promise<GetFindResult<InvoiceOutModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstInvoiceOutOptions = Record<string, unknown>>(
    options?: Subset<T, FirstInvoiceOutOptions>,
  ): Promise<
    ListResponse<GetFindResult<InvoiceOutModel, T["expand"]>, Entity.InvoiceOut>
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

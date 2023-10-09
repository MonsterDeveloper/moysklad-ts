import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "@/api-client";
import type {
  AllCounterpartiesOptions,
  CounterpartyModel,
  GetCounterpartyOptions,
  ListCounterpartiesOptions,
  UpdateCounterpartyOptions,
} from "./types";
import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
} from "@/types";

const ENDPOINT_URL = "/entity/counterparty";

export class CounterpartyEndpoint extends BaseEndpoint {
  async list<T extends ListCounterpartiesOptions = Record<string, unknown>>(
    options?: Subset<T, ListCounterpartiesOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CounterpartyModel, T["expand"]>,
      Entity.BonusTransaction
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllCounterpartiesOptions = Record<string, unknown>>(
    options?: Subset<T, AllCounterpartiesOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<CounterpartyModel, T["expand"]>,
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

  async get<T extends GetCounterpartyOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetCounterpartyOptions>,
  ): Promise<GetFindResult<CounterpartyModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }
  async update<T extends UpdateCounterpartyOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<CounterpartyModel>,
    options?: Subset<T, UpdateCounterpartyOptions>,
  ): Promise<GetFindResult<CounterpartyModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }
}

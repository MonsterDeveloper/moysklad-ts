import type {
  Entity,
  GetFindResult,
  GetPayloadCreatableFields,
  GetPayloadUpdatableFields,
  ListResponse,
  Subset,
  UpdateMeta,
} from "@/types";
import type {
  BonusTransactionPayload,
  CreateBonusTransactionOptions,
  GetBonusTransactionOptions,
  ListBonusTransactionsOptions,
  UpdateBonusTransactionOptions,
} from "./types";
import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "@/api-client";

export class BonusTransactionEndpoint extends BaseEndpoint {
  async list<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionPayload, T["expand"]>,
      Entity.BonusTransaction
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get("/entity/bonustransaction", {
      searchParameters,
    });
    return response.json();
  }

  async get<T extends GetBonusTransactionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionPayload, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`/entity/bonustransaction/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<
    T extends UpdateBonusTransactionOptions = Record<string, unknown>,
  >(
    id: string,
    data: GetPayloadUpdatableFields<BonusTransactionPayload>,
    options?: Subset<T, UpdateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionPayload, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`/entity/bonustransaction/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async create<
    T extends CreateBonusTransactionOptions = Record<string, unknown>,
  >(
    data:
      | GetPayloadCreatableFields<BonusTransactionPayload>
      | (
          | GetPayloadCreatableFields<BonusTransactionPayload>
          | (GetPayloadUpdatableFields<BonusTransactionPayload> & UpdateMeta)
        )[],
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionPayload, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post("/entity/bonustransaction", {
      body: data,
      searchParameters,
    });

    return response.json();
  }
}

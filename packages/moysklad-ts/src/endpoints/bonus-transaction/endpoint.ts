import type {
  Entity,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
  UpdateMeta,
} from "@/types";
import type {
  BonusTransactionModel,
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
      GetFindResult<BonusTransactionModel, T["expand"]>,
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
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
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
    data: GetModelUpdatableFields<BonusTransactionModel>,
    options?: Subset<T, UpdateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
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
      | GetModelCreatableFields<BonusTransactionModel>
      | (
          | GetModelCreatableFields<BonusTransactionModel>
          | (GetModelUpdatableFields<BonusTransactionModel> & UpdateMeta)
        )[],
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post("/entity/bonustransaction", {
      body: data,
      searchParameters,
    });

    return response.json();
  }
}

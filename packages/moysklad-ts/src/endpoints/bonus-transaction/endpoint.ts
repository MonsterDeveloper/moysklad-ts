import type { Entity, GetFindResult, ListResponse, Subset } from "@/types";
import type {
  BonusTransaction,
  BonusTransactionPayload,
  ListBonusTransactionsOptions,
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

  async get(id: string): Promise<BonusTransaction> {
    const response = await this.client.get(`/entity/bonustransaction/${id}`);

    return response.json();
  }
}

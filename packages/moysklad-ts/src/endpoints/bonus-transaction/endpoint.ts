import { ApiClient } from "@/api-client";
import type { Entity, GetFindResult, ListResponse, Subset } from "@/types";
import type {
  BonusTransaction,
  BonusTransactionPayload,
  ListBonusTransactionsOptions,
} from "./types";

export class BonusTransactionEndpoint {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async list<T extends ListBonusTransactionsOptions>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionPayload, T["expand"]>[],
      Entity.BonusTransaction
    >
  > {
    const searchParameters = new URLSearchParams();

    if (options?.pagination?.limit)
      searchParameters.append("limit", options.pagination.limit.toString());
    if (options?.pagination?.offset)
      searchParameters.append("offset", options.pagination.offset.toString());

    const response = await this.client.get("/entity/bonustransaction", {
      searchParams: searchParameters,
    });
    return response.json();
  }

  async get(id: string): Promise<BonusTransaction> {
    const response = await this.client.get(`/entity/bonustransaction/${id}`);

    return response.json();
  }
}

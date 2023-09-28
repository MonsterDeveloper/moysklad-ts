import { ApiClient, type ApiClientOptions } from "@/api-client";
import { BonusTransactionEndpoint } from "@/endpoints";

export class Moysklad {
  public client: ApiClient;
  public bonusTransaction: BonusTransactionEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
  }
}

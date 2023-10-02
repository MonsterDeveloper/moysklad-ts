import { ApiClient, type ApiClientOptions } from "@/api-client";
import { BonusTransactionEndpoint, SecurityEndpoint } from "@/endpoints";

export class Moysklad {
  public client: ApiClient;
  public bonusTransaction: BonusTransactionEndpoint;
  public security: SecurityEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
    this.security = new SecurityEndpoint(this.client);
  }
}

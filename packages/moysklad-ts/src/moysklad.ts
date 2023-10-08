/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "@/api-client";
import {
  BonusTransactionEndpoint,
  DemandEndpoint,
  SecurityEndpoint,
} from "@/endpoints";

export class Moysklad {
  public client: ApiClient;
  public bonusTransaction: BonusTransactionEndpoint;
  public security: SecurityEndpoint;
  public demand: DemandEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
    this.security = new SecurityEndpoint(this.client);
    this.demand = new DemandEndpoint(this.client);
  }
}

/* c8 ignore stop */

/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "@/api-client";
import {
  BonusTransactionEndpoint,
  CounterpartyEndpoint,
  CustomerOrderEndpoint,
  DemandEndpoint,
  SecurityEndpoint,
} from "@/endpoints";

export class Moysklad {
  public client: ApiClient;
  public bonusTransaction: BonusTransactionEndpoint;
  public security: SecurityEndpoint;
  public demand: DemandEndpoint;
  public counterparty: CounterpartyEndpoint;
  public customerOrder: CustomerOrderEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
    this.security = new SecurityEndpoint(this.client);
    this.demand = new DemandEndpoint(this.client);
    this.counterparty = new CounterpartyEndpoint(this.client);
    this.customerOrder = new CustomerOrderEndpoint(this.client);
  }
}

/* c8 ignore stop */

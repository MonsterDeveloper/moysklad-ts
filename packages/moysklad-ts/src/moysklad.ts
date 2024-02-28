/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "@/api-client";
import {
  BonusTransactionEndpoint,
  CounterpartyEndpoint,
  CustomerOrderEndpoint,
  DemandEndpoint,
  SecurityEndpoint,
  CustomEntityEndpoint,
  ProductEndpoint,
  VariantEndpoint,
} from "@/endpoints";

export class Moysklad {
  public client: ApiClient;
  public bonusTransaction: BonusTransactionEndpoint;
  public security: SecurityEndpoint;
  public demand: DemandEndpoint;
  public counterparty: CounterpartyEndpoint;
  public customerOrder: CustomerOrderEndpoint;
  public customEntity: CustomEntityEndpoint;
  public product: ProductEndpoint;
  public variant: VariantEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
    this.security = new SecurityEndpoint(this.client);
    this.demand = new DemandEndpoint(this.client);
    this.counterparty = new CounterpartyEndpoint(this.client);
    this.customerOrder = new CustomerOrderEndpoint(this.client);
    this.customEntity = new CustomEntityEndpoint(this.client);
    this.product = new ProductEndpoint(this.client);
    this.variant = new VariantEndpoint(this.client);
  }
}

/* c8 ignore stop */

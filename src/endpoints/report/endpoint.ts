/* c8 ignore start */
import type { ApiClient } from "../../api-client";
import { BaseEndpoint } from "../base-endpoint";
import { StockEndpoint } from "./stock";
import { ProfitEndpoint } from "./profit";

export class ReportEndpoint extends BaseEndpoint {
  public stock: StockEndpoint;
  public profit: ProfitEndpoint;

  constructor(client: ApiClient) {
    super(client);

    this.stock = new StockEndpoint(client);
    this.profit = new ProfitEndpoint(client);
  }
}

/* c8 ignore stop */

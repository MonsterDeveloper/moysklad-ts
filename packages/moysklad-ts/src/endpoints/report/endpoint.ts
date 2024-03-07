/* c8 ignore start */
import type { ApiClient } from "@/api-client";
import { BaseEndpoint } from "../base-endpoint";
import { StockEndpoint } from "./stock";

export class ReportEndpoint extends BaseEndpoint {
  public stock: StockEndpoint;

  constructor(client: ApiClient) {
    super(client);

    this.stock = new StockEndpoint(client);
  }
}

/* c8 ignore stop */

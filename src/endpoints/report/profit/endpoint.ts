/* c8 ignore start */
import type { ApiClient } from "../../../api-client";
import { BaseEndpoint } from "../../base-endpoint";
import { ByVariantEndpoint } from "./by-variant";

export class ProfitEndpoint extends BaseEndpoint {
  public byVariant: ByVariantEndpoint;

  constructor(client: ApiClient) {
    super(client);

    this.byVariant = new ByVariantEndpoint(client);
  }
}

/* c8 ignore stop */

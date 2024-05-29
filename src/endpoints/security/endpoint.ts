/* c8 ignore start */
import type { ApiClient } from "@/api-client";
import { BaseEndpoint } from "../base-endpoint";
import { TokenEndpoint } from "./token";

export class SecurityEndpoint extends BaseEndpoint {
  public token: TokenEndpoint;

  constructor(client: ApiClient) {
    super(client);

    this.token = new TokenEndpoint(client);
  }
}

/* c8 ignore stop */

import type { ApiClient } from "@/api-client";

export class BaseEndpoint {
  protected client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }
}

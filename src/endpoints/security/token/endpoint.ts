import { BaseEndpoint } from "../../base-endpoint";

export class TokenEndpoint extends BaseEndpoint {
  async create(): Promise<{ access_token: string }> {
    const response = await this.client.post("/security/token");

    return response.json();
  }
}

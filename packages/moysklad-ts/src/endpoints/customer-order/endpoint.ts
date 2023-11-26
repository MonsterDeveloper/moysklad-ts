import { type GetFindResult, type Subset } from "@/types";
import { BaseEndpoint } from "../base-endpoint";
import type { CustomerOrderModel, GetCustomerOrderOptions } from "./types";
import { composeSearchParameters } from "@/api-client";

const ENDPOINT_URL = "/entity/customerorder";

export class CustomerOrderEndpoint extends BaseEndpoint {
  async get<T extends GetCustomerOrderOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async trash(id: string): Promise<void> {
    await this.client.post(`${ENDPOINT_URL}/${id}/trash`);
  }
}

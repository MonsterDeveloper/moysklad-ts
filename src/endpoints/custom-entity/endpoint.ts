import { BaseEndpoint } from "../base-endpoint";
import type { CustomEntityModel } from "./types";
import type { Entity, GetFindResult, ListResponse } from "../../types";

const ENDPOINT_URL = "/entity/customentity";

export class CustomEntityEndpoint extends BaseEndpoint {
  async get(
    id: string,
  ): Promise<
    ListResponse<GetFindResult<CustomEntityModel, false>, Entity.CustomEntity>
  > {
    const response = await this.client.get(`${ENDPOINT_URL}/${id}`);

    return response.json();
  }
}

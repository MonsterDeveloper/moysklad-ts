import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";
import type {
  AllProcessingPlansOptions,
  ProcessingPlanModel,
  FirstProcessingPlanOptions,
  GetProcessingPlanOptions,
  ListProcessingPlansOptions,
  UpdateProcessingPlanOptions,
} from "./types";
import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelUpdatableFields,
  ListResponse,
  Subset,
} from "../../types";

const ENDPOINT_URL = "/entity/processingplan";

export class ProcessingPlanEndpoint extends BaseEndpoint {
  async list<T extends ListProcessingPlansOptions = Record<string, unknown>>(
    options?: Subset<T, ListProcessingPlansOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProcessingPlanModel, T["expand"]>,
      Entity.ProcessingPlan
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  async all<T extends AllProcessingPlansOptions = Record<string, unknown>>(
    options?: Subset<T, AllProcessingPlansOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProcessingPlanModel, T["expand"]>,
      Entity.ProcessingPlan
    >
  > {
    return this.client.batchGet(
      async (limit, offset) =>
        this.list({
          ...options,
          pagination: { limit, offset },
        }),
      Boolean(options?.expand),
    );
  }

  async get<T extends GetProcessingPlanOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProcessingPlanOptions>,
  ): Promise<GetFindResult<ProcessingPlanModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  async update<T extends UpdateProcessingPlanOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProcessingPlanModel>,
    options?: Subset<T, UpdateProcessingPlanOptions>,
  ): Promise<GetFindResult<ProcessingPlanModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  async first<T extends FirstProcessingPlanOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProcessingPlanOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProcessingPlanModel, T["expand"]>,
      Entity.ProcessingPlan
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }
}

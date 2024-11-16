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
import {
  MediaType,
  type BatchDeleteResult,
  type BatchGetResult,
  type Entity,
  type GetFindResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type UpdateMeta,
} from "../../types";

const ENDPOINT_URL = "/entity/processingplan";

export class ProcessingPlanEndpoint extends BaseEndpoint {
  /**
   * Получить массив техкарт.
   *
   * @param options - Опции для получения техкарт {@linkcode ListProcessingPlansOptions}
   * @returns Объект с массивом техкарт
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-poluchit-tehkarty
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.processingPlan.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.processingPlan.list({
   *  expand: ["group", "owner"],
   * });
   * ```
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * moysklad.processingPlan.list({
   *   filter: {
   *     archived: false,
   *   },
   *   order: { field: "name", direction: "desc" },
   *   pagination: {
   *     limit: 5,
   *     offset: 100,
   *   },
   * });
   * ```
   */
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

  /**
   * Получить все техкарты.
   *
   * @param options - Опции для получения всех техкарт {@linkcode AllProcessingPlansOptions}
   * @returns Объект с массивом техкарт
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-poluchit-tehkarty
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.processingPlan.all({ expand: ["group", "owner"] });
   * ```
   */
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

  /**
   * Получить техкарту по id.
   *
   * @param id - id техкарты
   * @param options - Опции для получения техкарты {@linkcode GetProcessingPlanOptions}
   * @returns Объект с техкартой {@linkcode ProcessingPlanModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-poluchit-tehkartu
   *
   * @example
   * ```ts
   * const processingPlan = await moysklad.processingPlan.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
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

  /**
   * Изменить техкарту.
   *
   * @param id - id техкарты
   * @param data - данные для изменения техкарты
   * @param options - Опции для изменения техкарты {@linkcode UpdateProcessingPlanOptions}
   * @returns Объект с обновленной техкартой {@linkcode ProcessingPlanModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-izmenit-tehkartu
   */
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

  /**
   * Получить первую техкарту.
   *
   * @param options - Опции для получения первой техкарты {@linkcode FirstProcessingPlanOptions}
   * @returns Объект с первой техкартой
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-poluchit-tehkarty
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.processingPlan.first({
   *  expand: ["group", "owner"],
   *  search: "123"
   * });
   * ```
   */
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

  /**
   * Получить общее количество техкарт.
   *
   * @returns Общее количество техкарт
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Создать техкарту.
   *
   * @param data - данные для создания техкарты
   * @param options - Опции для создания техкарты {@linkcode UpdateProcessingPlanOptions}
   * @returns Объект с созданной техкартой {@linkcode ProcessingPlanModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-sozdat-tehkartu
   */
  async create<T extends UpdateProcessingPlanOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<ProcessingPlanModel>,
    options?: Subset<T, UpdateProcessingPlanOptions>,
  ): Promise<GetFindResult<ProcessingPlanModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать и обновить техкарты.
   *
   * @param data - массив из объектов для создания и обновления техкарт
   * @param options - Опции для создания и обновления техкарт {@linkcode UpdateProcessingPlanOptions}
   * @returns Массив с созданными и обновленными техкартами {@linkcode ProcessingPlanModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-massowoe-sozdanie-i-obnowlenie-tehkart
   */
  async upsert<T extends UpdateProcessingPlanOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<ProcessingPlanModel>
      | (GetModelUpdatableFields<ProcessingPlanModel> &
          UpdateMeta<Entity.ProcessingPlan>)
    )[],
    options?: Subset<T, UpdateProcessingPlanOptions>,
  ): Promise<GetFindResult<ProcessingPlanModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Удалить техкарту по id.
   * @param id - id техкарты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-udalit-tehkartu
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Массово удалить техкарты.
   *
   * @param ids - массив id техкарт
   * @returns Массив с результатами удаления техкарт
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-massowoe-udalenie-tehkart
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

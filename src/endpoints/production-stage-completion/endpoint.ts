import {
  Entity,
  MediaType,
  type BatchDeleteResult,
  type GetFindResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type ListResponse,
  type Subset,
  type UpdateMeta,
  type BatchGetResult,
} from "../../types";
import type {
  AllProductionStageCompletionOptions,
  CreateProductionStageCompletionOptions,
  FirstProductionStageCompletionOptions,
  GetProductionStageCompletionOptions,
  ListProductionStageCompletionsOptions,
  UpdateProductionStageCompletionOptions,
  ProductionStageCompletionModel,
  ProductionStageCompletionMaterialModel,
  ListProductionStageCompletionMaterialsOptions,
  CreateProductionStageCompletionMaterialOptions,
  UpdateProductionStageCompletionMaterialOptions,
  ProductionStageCompletionResultModel,
  ListProductionStageCompletionResultsOptions,
  UpdateProductionStageCompletionResultOptions,
  FirstProductionStageCompletionMaterialOptions,
  FirstProductionStageCompletionResultOptions,
} from "./types";
import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/productionstagecompletion";

export class ProductionStageCompletionEndpoint extends BaseEndpoint {
  /**
   * Получить массив выполнения этапов производства.
   *
   * @param options - Опции для получения выполнения этапов производства {@linkcode ListProductionStageCompletionsOptions}
   * @returns Объект с массивом выполнений этапов производства
   */
  async list<
    T extends ListProductionStageCompletionsOptions = Record<string, unknown>,
  >(
    options?: Subset<T, ListProductionStageCompletionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все выполнения этапов производства.
   *
   * @param options - Опции для получения всех выполнений этапов производства {@linkcode AllProductionStageCompletionsOptions}
   * @returns Объект с массивом выполнений этапов производства
   */
  async all<
    T extends AllProductionStageCompletionOptions = Record<string, unknown>,
  >(
    options?: Subset<T, AllProductionStageCompletionOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
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
   * Получить выполнение этапа производства по id.
   *
   * @param id - id выполнения этапа производства
   * @param options - Опции для получения выполнения этапа производства {@linkcode GetProductionStageCompletionOptions}
   * @returns Объект с выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  async get<
    T extends GetProductionStageCompletionOptions = Record<string, unknown>,
  >(
    id: string,
    options?: Subset<T, GetProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Изменить выполнение этапа производства.
   *
   * @param id - id выполнения этапа производства
   * @param data - данные для изменения выполнения этапа производства
   * @param options - Опции для изменения выполнения этапа производства {@linkcode UpdateProductionStageCompletionOptions}
   * @returns Объект с обновленным выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  async update<
    T extends UpdateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    id: string,
    data: GetModelUpdatableFields<ProductionStageCompletionModel>,
    options?: Subset<T, UpdateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать выполнение этапа производства.
   *
   * @param data - данные для создания выполнения этапа производства
   * @param options - Опции для создания выполнения этапа производства {@linkcode CreateProductionStageCompletionOptions}
   * @returns Объект с созданным выполнением этапа производства {@linkcode ProductionStageCompletionModel}
   */
  async create<
    T extends CreateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    data: GetModelCreatableFields<ProductionStageCompletionModel>,
    options?: Subset<T, CreateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать и обновить выполнения этапов производства
   *
   * @param data - массив из объектов для создания и обновления выполнения этапов производства
   * @param options - Опции для создания и обновления выполнения этапов производства {@linkcode CreateProductionStageCompletionOptions}
   * @returns Массив с созданными и обновленными выполнения этапов производства {@linkcode ProductionStageCompletionModel}
   */
  async upsert<
    T extends CreateProductionStageCompletionOptions = Record<string, unknown>,
  >(
    data: (
      | GetModelCreatableFields<ProductionStageCompletionModel>
      | (GetModelUpdatableFields<ProductionStageCompletionModel> &
          UpdateMeta<Entity.ProductionStageCompletion>)
    )[],
    options?: Subset<T, CreateProductionStageCompletionOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить первое выполнение этапа производства.
   *
   * @param options - Опции для получения первого выполнения этапа производства {@linkcode FirstProductionStageCompletionOptions}
   * @returns Объект с первым выполнением этапа производства
   */
  async first<
    T extends FirstProductionStageCompletionOptions = Record<string, unknown>,
  >(
    options?: Subset<T, FirstProductionStageCompletionOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionModel, T["expand"]>,
      Entity.ProductionStageCompletion
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить общее количество выполнений этапов производства.
   * @returns Общее количество выполнений этапов производства
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Удалить выполнение этапа производства по id.
   *
   * @param id - id выполнения этапа производства
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Массово удалить выполнения этапов производства.
   *
   * @param ids - массив id выполнений этапов производства
   * @returns Массив с результатами удаления выполнений этапов производства
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          type: Entity.ProductionStageCompletion,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }

  /**
   * Получить материалы выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param options - Опции для получения материалов выполнения этапа производства {@linkcode ListProductionStageCompletionMaterialsOptions}
   * @returns Объект с массивом материалов выполнения этапа производства
   */
  async listMaterials<
    T extends ListProductionStageCompletionMaterialsOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    options?: Subset<T, ListProductionStageCompletionMaterialsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>,
      Entity.ProductionStageCompletionMaterial
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(
      `${ENDPOINT_URL}/${completionId}/materials`,
      {
        searchParameters,
      },
    );
    return response.json();
  }

  /**
   * Добавить материал выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param data - данные для создания материала выполнения этапа производства
   * @param options - Опции для создания материала выполнения этапа производства {@linkcode CreateProductionStageCompletionMaterialOptions}
   * @returns Объект с созданным материалом выполнения этапа производства {@linkcode ProductionStageCompletionMaterialModel}
   */
  async addMaterial<
    T extends CreateProductionStageCompletionMaterialOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    data: GetModelCreatableFields<ProductionStageCompletionMaterialModel>,
    options?: Subset<T, CreateProductionStageCompletionMaterialOptions>,
  ): Promise<
    GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(
      `${ENDPOINT_URL}/${completionId}/materials`,
      {
        body: data,
        searchParameters,
      },
    );

    return response.json();
  }

  /**
   * Обновить материал выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param id - id материала выполнения этапа производства
   * @param data - данные для обновления материала выполнения этапа производства
   * @param options - Опции для обновления материала выполнения этапа производства {@linkcode UpdateProductionStageCompletionMaterialOptions}
   * @returns Объект с обновленным материалом выполнения этапа производства {@linkcode ProductionStageCompletionMaterialModel}
   */
  async updateMaterial<
    T extends UpdateProductionStageCompletionMaterialOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    id: string,
    data: GetModelUpdatableFields<ProductionStageCompletionMaterialModel>,
    options?: Subset<T, UpdateProductionStageCompletionMaterialOptions>,
  ): Promise<
    GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(
      `${ENDPOINT_URL}/${completionId}/materials/${id}`,
      {
        body: data,
        searchParameters,
      },
    );

    return response.json();
  }

  /**
   * Получить первый материал выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param options - Опции для получения первого материала выполнения этапа производства {@linkcode FirstProductionStageCompletionMaterialOptions}
   * @returns Объект с первым материалом выполнения этапа производства
   */
  async firstMaterial<
    T extends FirstProductionStageCompletionMaterialOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    options?: Subset<T, FirstProductionStageCompletionMaterialOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionMaterialModel, T["expand"]>,
      Entity.ProductionStageCompletionMaterial
    >
  > {
    return this.listMaterials(completionId, {
      ...options,
      pagination: { limit: 1 },
    });
  }

  /**
   * Получить общее количество материалов выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @returns Общее количество материалов выполнения этапа производства
   */
  async sizeMaterials(completionId: string): Promise<number> {
    const response = await this.listMaterials(completionId, {
      pagination: { limit: 0 },
    });

    return response.meta.size;
  }

  /**
   * Получить продукты выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param options - Опции для получения продуктов выполнения этапа производства {@linkcode ListProductionStageCompletionResultsOptions}
   * @returns Объект с массивом продуктов выполнения этапа производства
   */
  async listResults<
    T extends ListProductionStageCompletionResultsOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    options?: Subset<T, ListProductionStageCompletionResultsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionResultModel, T["expand"]>,
      Entity.ProductionStageCompletionResult
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(
      `${ENDPOINT_URL}/${completionId}/products`,
      {
        searchParameters,
      },
    );
    return response.json();
  }

  /**
   * Обновить продукт выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param id - id продукта выполнения этапа производства
   * @param data - данные для обновления продукта выполнения этапа производства
   * @param options - Опции для обновления продукта выполнения этапа производства {@linkcode UpdateProductionStageCompletionResultOptions}
   * @returns Объект с обновленным продуктом выполнения этапа производства {@linkcode ProductionStageCompletionResultModel}
   */
  async updateResult<
    T extends UpdateProductionStageCompletionResultOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    id: string,
    data: GetModelUpdatableFields<ProductionStageCompletionResultModel>,
    options?: Subset<T, UpdateProductionStageCompletionResultOptions>,
  ): Promise<GetFindResult<ProductionStageCompletionResultModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(
      `${ENDPOINT_URL}/${completionId}/products/${id}`,
      {
        body: data,
        searchParameters,
      },
    );

    return response.json();
  }

  /**
   * Получить первый продукт выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @param options - Опции для получения первого продукта выполнения этапа производства {@linkcode FirstProductionStageCompletionResultOptions}
   * @returns Объект с первым продуктом выполнения этапа производства
   */
  async firstResult<
    T extends FirstProductionStageCompletionResultOptions = Record<
      string,
      unknown
    >,
  >(
    completionId: string,
    options?: Subset<T, FirstProductionStageCompletionResultOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionStageCompletionResultModel, T["expand"]>,
      Entity.ProductionStageCompletionResult
    >
  > {
    return this.listResults(completionId, {
      ...options,
      pagination: { limit: 1 },
    });
  }

  /**
   * Получить общее количество продуктов выполнения этапа производства.
   *
   * @param completionId - id выполнения этапа производства
   * @returns Общее количество продуктов выполнения этапа производства
   */
  async sizeResults(completionId: string): Promise<number> {
    const response = await this.listResults(completionId, {
      pagination: { limit: 0 },
    });

    return response.meta.size;
  }
}

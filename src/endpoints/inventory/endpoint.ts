import {
  Entity,
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  MediaType,
  type BatchDeleteResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type UpdateMeta,
} from "../../types";
import { BaseEndpoint } from "../base-endpoint";
import type {
  AllInventoryOptions,
  CreateInventoryOptions,
  InventoryModel,
  FirstInventoryOptions,
  GetInventoryOptions,
  ListInventoryOptions,
  UpdateInventoryOptions,
} from "./types";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/inventory";

export class InventoryEndpoint extends BaseEndpoint {
  /**
   * Получить массив инвентаризаций.
   *
   * @param options - Опции для получения инвентаризаций {@linkcode ListInventoryOptions}
   * @returns Объект с массивом инвентаризаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-inwentarizaciq-poluchit-inwentarizacii
   */
  async list<T extends ListInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, ListInventoryOptions>,
  ): Promise<
    ListResponse<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все инвентаризации.
   *
   * @param options - Опции для получения всех инвентаризаций {@linkcode AllInventoryOptions}
   * @returns Объект с массивом инвентаризаций
   */
  async all<T extends AllInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, AllInventoryOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
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
   * Получить первую инвентаризацию.
   *
   * @param options - Опции для получения первой инвентаризации {@linkcode FirstInventoryOptions}
   * @returns Объект с первой инвентаризацией
   */
  async first<T extends FirstInventoryOptions = Record<string, unknown>>(
    options?: Subset<T, FirstInventoryOptions>,
  ): Promise<
    ListResponse<GetFindResult<InventoryModel, T["expand"]>, Entity.Inventory>
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить инвентаризацию по id.
   *
   * @param id - id инвентаризации
   * @param options - Опции для получения инвентаризации {@linkcode GetInventoryOptions}
   * @returns Объект с инвентаризацией {@linkcode InventoryModel}
   */
  async get<T extends GetInventoryOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать инвентаризацию.
   *
   * @param data - данные для создания инвентаризации
   * @param options - Опции для создания инвентаризации {@linkcode CreateInventoryOptions}
   * @returns Объект с созданной инвентаризацией {@linkcode InventoryModel}
   */
  async create<T extends CreateInventoryOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<InventoryModel>,
    options?: Subset<T, CreateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Обновить инвентаризацию.
   *
   * @param id - id инвентаризации
   * @param data - данные для обновления инвентаризации
   * @param options - Опции для обновления инвентаризации {@linkcode UpdateInventoryOptions}
   * @returns Объект с обновленной инвентаризацией {@linkcode InventoryModel}
   */
  async update<T extends UpdateInventoryOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<InventoryModel>,
    options?: Subset<T, UpdateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать или обновить инвентаризации.
   *
   * @param data - массив данных для создания или обновления инвентаризаций
   * @param options - Опции для создания инвентаризаций {@linkcode CreateInventoryOptions}
   * @returns Массив с созданными или обновленными инвентаризациями {@linkcode InventoryModel}
   */
  async upsert<T extends CreateInventoryOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<InventoryModel>
      | (GetModelUpdatableFields<InventoryModel> & UpdateMeta<Entity.Inventory>)
    )[],
    options?: Subset<T, CreateInventoryOptions>,
  ): Promise<GetFindResult<InventoryModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово удалить инвентаризации.
   *
   * @param ids - массив id инвентаризаций
   * @returns Массив с результатами удаления инвентаризаций
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          type: Entity.Inventory,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

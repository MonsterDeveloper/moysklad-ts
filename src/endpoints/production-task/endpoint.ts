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
  AllProductionTasksOptions,
  ProductionTaskModel,
  CreateProductionTaskOptions,
  FirstProductionTaskOptions,
  GetProductionTaskOptions,
  ListProductionTasksOptions,
  UpdateProductionTaskOptions,
} from "./types";
import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/productiontask";

export class ProductionTaskEndpoint extends BaseEndpoint {
  /**
   * Получить массив производственных заданий.
   *
   * @param options - Опции для получения производственных заданий {@linkcode ListProductionTasksOptions}
   * @returns Объект с массивом производственных заданий
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-poluchit-spisok-proizwodstwennyh-zadanij
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.productionTask.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *  expand: ["owner", "organization"],
   * });
   * ```
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * moysklad.productionTask.list({
   *   filter: {
   *     accountId: "123",
   *   },
   *   order: { field: "moment", direction: "desc" },
   *   pagination: {
   *    limit: 5,
   *     offset: 100,
   *   },
   * });
   * ```
   */
  async list<T extends ListProductionTasksOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductionTasksOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все производственные задания.
   *
   * @param options - Опции для получения всех производственных заданий {@linkcode AllProductionTasksOptions}
   * @returns Объект с массивом производственных заданий
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-poluchit-spisok-proizwodstwennyh-zadanij
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.productionTask.all({ expand: ["owner", "organization"] });
   * ```
   */
  async all<T extends AllProductionTasksOptions = Record<string, unknown>>(
    options?: Subset<T, AllProductionTasksOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
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
   * Получить производственное задание по id.
   *
   * @param id - id производственного задания
   * @param options - Опции для получения производственного задания {@linkcode GetProductionTaskOptions}
   * @returns Объект с производственным заданием {@linkcode ProductionTaskModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-poluchit-proizwodstwennoe-zadanie
   *
   * @example
   * ```ts
   * const task = await moysklad.productionTask.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  async get<T extends GetProductionTaskOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Изменить производственное задание.
   *
   * @param id - id производственного задания
   * @param data - данные для изменения производственного задания
   * @param options - Опции для изменения производственного задания {@linkcode UpdateProductionTaskOptions}
   * @returns Объект с обновленным производственным заданием {@linkcode ProductionTaskModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-izmenit-proizwodstwennoe-zadanie
   *
   * @example
   * ```ts
   * await moysklad.productionTask.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   shared: false,
   *     owner: {
   *      meta: {
   *        type: Entity.Employee,
   *        href: moysklad.client
   *           .buildUrl(["entity", "employee", "5427bc76-b95f-11eb-0a80-04bb000cd583"]).toString(),
   *        mediaType: MediaType.Json,
   *     },
   *   },
   * });
   * ```
   */
  async update<T extends UpdateProductionTaskOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductionTaskModel>,
    options?: Subset<T, UpdateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать производственное задание.
   *
   * @param data - данные для создания производственного задания
   * @param options - Опции для создания производственного задания {@linkcode CreateProductionTaskOptions}
   * @returns Объект с созданным производственным заданием {@linkcode ProductionTaskModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-sozdat-proizwodstwennoe-zadanie
   *
   * @example
   * ```ts
   * await moysklad.productionTask.create({
   *   owner: {
   *     meta: {
   *       type: Entity.Employee,
   *       href: moysklad.client.buildUrl(["entity", Entity.Employee, "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e"]).toString(),
   *       mediaType: MediaType.Json,
   *     }
   *   },
   *   name: "New Production Task",
   * });
   * ```
   */
  async create<T extends CreateProductionTaskOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<ProductionTaskModel>,
    options?: Subset<T, CreateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать и обновить производственные задания
   *
   * @param data - массив из объектов для создания и обновления производственных заданий
   * @param options - Опции для создания и обновления производственных заданий {@linkcode CreateProductionTaskOptions}
   * @returns Массив с созданными и обновленными производственными заданиями {@linkcode ProductionTaskModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-massowoe-sozdanie-i-obnowlenie-proizwodstwennyh-zadanij
   *
   * @example
   * ```ts
   * await moysklad.productionTask.upsert([
   *   // создать производственное задание
   *   {
   *     owner: {
   *       meta: {
   *         type: Entity.Employee,
   *         href: moysklad.client
   *           .buildUrl([
   *             "entity",
   *             Entity.Employee,
   *             "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *           ])
   *           .toString(),
   *         mediaType: MediaType.Json,
   *       },
   *     },
   *     name: "New Production Task",
   *   },
   *   // обновить существующее производственное задание
   *   {
   *     meta: {
   *       type: Entity.ProductionTask,
   *       href: moysklad.client
   *         .buildUrl([
   *           "entity",
   *           Entity.ProductionTask,
   *           "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *         ])
   *         .toString(),
   *       mediaType: MediaType.Json,
   *     },
   *     name: "Updated Production Task",
   *   },
   * ]);
   * ```
   */
  async upsert<T extends CreateProductionTaskOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<ProductionTaskModel>
      | (GetModelUpdatableFields<ProductionTaskModel> &
          UpdateMeta<Entity.ProductionTask>)
    )[],
    options?: Subset<T, CreateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить первое производственное задание.
   *
   * @param options - Опции для получения первого производственного задания {@linkcode FirstProductionTaskOptions}
   * @returns Объект с первым производственным заданием
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-poluchit-spisok-proizwodstwennyh-zadanij
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.first({
   *  expand: ["owner", "organization"],
   *  search: "123"
   * });
   * ```
   */
  async first<T extends FirstProductionTaskOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProductionTaskOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить общее количество производственных заданий.
   * @returns Общее количество производственных заданий
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Удалить производственное задание по id.
   * @param id - id производственного задания
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-udalit-proizwodstwennoe-zadanie
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Массово удалить производственные задания.
   *
   * @param ids - массив id производственных заданий
   * @returns Массив с результатами удаления производственных заданий
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-massowoe-udalenie-proizwodstwennyh-zadanij
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          type: Entity.ProductionTask,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

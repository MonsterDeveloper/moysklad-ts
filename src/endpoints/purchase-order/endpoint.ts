import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";
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
  AllPurchaseOrdersOptions,
  PurchaseOrderModel,
  CreatePurchaseOrderOptions,
  FirstPurchaseOrderOptions,
  GetPurchaseOrderOptions,
  ListPurchaseOrdersOptions,
  UpdatePurchaseOrderOptions,
} from "./types";

const ENDPOINT_URL = "/entity/purchaseorder";

export class PurchaseOrderEndpoint extends BaseEndpoint {
  /**
   * Получить массив заказов поставщикам.
   *
   * @param options - Опции для получения заказов поставщикам {@linkcode ListPurchaseOrdersOptions}
   * @returns Объект с массивом заказов поставщикам
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-poluchit-spisok-zakazow-postawschikam
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.purchaseOrder.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.purchaseOrder.list({
   *  expand: ["agent", "organization"],
   * });
   * ```
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * moysklad.purchaseOrder.list({
   *   filter: {
   *     name: "00001",
   *   },
   *   order: { field: "moment", direction: "desc" },
   *   pagination: {
   *     limit: 5,
   *     offset: 100,
   *   },
   * });
   * ```
   */
  async list<T extends ListPurchaseOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, ListPurchaseOrdersOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<PurchaseOrderModel, T["expand"]>,
      Entity.PurchaseOrder
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все заказы поставщикам.
   *
   * @param options - Опции для получения всех заказов поставщикам {@linkcode AllPurchaseOrdersOptions}
   * @returns Объект с массивом заказов поставщикам
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-poluchit-spisok-zakazow-postawschikam
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.purchaseOrder.all({ expand: ["agent", "organization"] });
   * ```
   */
  async all<T extends AllPurchaseOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, AllPurchaseOrdersOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<PurchaseOrderModel, T["expand"]>,
      Entity.PurchaseOrder
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
   * Получить заказ поставщику по id.
   *
   * @param id - id заказа поставщику
   * @param options - Опции для получения заказа поставщику {@linkcode GetPurchaseOrderOptions}
   * @returns Объект с заказом поставщику {@linkcode PurchaseOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-poluchit-zakaz-postawschiku
   *
   * @example
   * ```ts
   * const order = await moysklad.purchaseOrder.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  async get<T extends GetPurchaseOrderOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetPurchaseOrderOptions>,
  ): Promise<GetFindResult<PurchaseOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Изменить заказ поставщику.
   *
   * @param id - id заказа поставщику
   * @param data - данные для изменения заказа поставщику
   * @param options - Опции для изменения заказа поставщику {@linkcode UpdatePurchaseOrderOptions}
   * @returns Объект с обновленным заказом поставщику {@linkcode PurchaseOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-izmenit-zakaz-postawschiku
   *
   * @example
   * ```ts
   * await moysklad.purchaseOrder.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   name: "new order name",
   *   description: "new order description"
   * });
   * ```
   */
  async update<T extends UpdatePurchaseOrderOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<PurchaseOrderModel>,
    options?: Subset<T, UpdatePurchaseOrderOptions>,
  ): Promise<GetFindResult<PurchaseOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать заказ поставщику.
   *
   * @param data - данные для создания заказа поставщику
   * @param options - Опции для создания заказа поставщику {@linkcode CreatePurchaseOrderOptions}
   * @returns Объект с созданным заказом поставщику {@linkcode PurchaseOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-sozdat-zakaz-postawschiku
   *
   * @example
   * ```ts
   * await moysklad.purchaseOrder.create({
   *   organization: {
   *     meta: {
   *       href: moysklad.client.buildUrl(["entity", "organization", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *       type: Entity.Organization,
   *       mediaType: MediaType.Json
   *     }
   *   },
   *   agent: {
   *     meta: {
   *       href: moysklad.client.buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *       type: Entity.Counterparty,
   *       mediaType: MediaType.Json
   *     }
   *   }
   * });
   * ```
   */
  async create<T extends CreatePurchaseOrderOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<PurchaseOrderModel>,
    options?: Subset<T, CreatePurchaseOrderOptions>,
  ): Promise<GetFindResult<PurchaseOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать и обновить заказы поставщикам.
   *
   * @param data - массив из объектов для создания и обновления заказов поставщикам
   * @param options - Опции для создания и обновления заказов поставщикам {@linkcode CreatePurchaseOrderOptions}
   * @returns Массив с созданными и обновленными заказами поставщикам {@linkcode PurchaseOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-massowoe-sozdanie-i-obnowlenie-zakazow-postawschikam
   *
   * @example
   * ```ts
   * await moysklad.purchaseOrder.upsert([
   *   // создать заказ поставщику
   *   {
   *     organization: {
   *       meta: {
   *         href: moysklad.client.buildUrl(["entity", "organization", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *         type: Entity.Organization,
   *         mediaType: MediaType.Json
   *       }
   *     },
   *     agent: {
   *       meta: {
   *         href: moysklad.client.buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *         type: Entity.Counterparty,
   *         mediaType: MediaType.Json
   *       }
   *     }
   *   },
   *   // обновить существующий заказ поставщику
   *   {
   *     meta: {
   *       href: moysklad.client.buildUrl(["entity", "purchaseorder", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *       type: Entity.PurchaseOrder,
   *       mediaType: MediaType.Json
   *     },
   *     name: "new name"
   *   }
   * ]);
   * ```
   */
  async upsert<T extends CreatePurchaseOrderOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<PurchaseOrderModel>
      | (GetModelUpdatableFields<PurchaseOrderModel> &
          UpdateMeta<Entity.PurchaseOrder>)
    )[],
    options?: Subset<T, CreatePurchaseOrderOptions>,
  ): Promise<GetFindResult<PurchaseOrderModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить первый заказ поставщику.
   *
   * @param options - Опции для получения первого заказа поставщику {@linkcode FirstPurchaseOrderOptions}
   * @returns Объект с первым заказом поставщику
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-poluchit-spisok-zakazow-postawschikam
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.purchaseOrder.first({
   *  expand: ["agent", "organization"],
   *  search: "00001"
   * });
   * ```
   */
  async first<T extends FirstPurchaseOrderOptions = Record<string, unknown>>(
    options?: Subset<T, FirstPurchaseOrderOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<PurchaseOrderModel, T["expand"]>,
      Entity.PurchaseOrder
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить общее количество заказов поставщикам.
   *
   * @returns Общее количество заказов поставщикам
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });
    return response.meta.size;
  }

  /**
   * Удалить заказ поставщику по id.
   * @param id - id заказа поставщику
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-udalit-zakaz-postawschiku
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Массово удалить заказы поставщикам.
   *
   * @param ids - массив id заказов поставщикам
   * @returns Массив с результатами удаления заказов поставщикам
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku-massowoe-udalenie-zakazow-postawschikam
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          type: Entity.PurchaseOrder,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

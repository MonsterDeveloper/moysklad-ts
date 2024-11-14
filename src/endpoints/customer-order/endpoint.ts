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
  AllCustomerOrdersOptions,
  CreateCustomerOrderOptions,
  CustomerOrderModel,
  FirstCustomerOrderOptions,
  GetCustomerOrderOptions,
  ListCustomerOrdersOptions,
  UpdateCustomerOrderOptions,
} from "./types";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/customerorder";

export class CustomerOrderEndpoint extends BaseEndpoint {
  /**
   * Получить массив заказов покупателей.
   *
   * @param options - Опции для получения заказов покупателей {@linkcode ListCustomerOrdersOptions}
   * @returns Объект с массивом заказов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-poluchit-spisok-zakazow-pokupatelej
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.customerOrder.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.customerOrder.list({
   *  expand: ["agent", "organization"],
   * });
   * ```
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * moysklad.customerOrder.list({
   *   filter: {
   *     accountId: "123",
   *   },
   *   order: { field: "moment", direction: "desc" },
   *   pagination: {
   *     limit: 5,
   *     offset: 100,
   *   },
   * });
   * ```
   */
  async list<T extends ListCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, ListCustomerOrdersOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все заказы покупателей.
   *
   * @param options - Опции для получения всех заказов покупателей {@linkcode AllCustomerOrdersOptions}
   * @returns Объект с массивом заказов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-poluchit-spisok-zakazow-pokupatelej
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.customerOrder.all({ expand: ["agent", "organization"] });
   * ```
   */
  async all<T extends AllCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, AllCustomerOrdersOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.BonusTransaction
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
   * Получить первый заказ покупателя.
   *
   * @param options - Опции для получения первого заказа покупателя {@linkcode FirstCustomerOrderOptions}
   * @returns Объект с первым заказом покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-poluchit-spisok-zakazow-pokupatelej
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.customerOrder.first({
   *  expand: ["agent", "organization"],
   *  search: "123"
   * });
   * ```
   */
  async first<T extends FirstCustomerOrderOptions = Record<string, unknown>>(
    options?: Subset<T, FirstCustomerOrderOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить заказ покупателя по id.
   *
   * @param id - id заказа покупателя
   * @param options - Опции для получения заказа покупателя {@linkcode GetCustomerOrderOptions}
   * @returns Объект с заказом покупателя {@linkcode CustomerOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-poluchit-zakaz-pokupatelq
   *
   * @example
   * ```ts
   * const order = await moysklad.customerOrder.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
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

  /**
   * Получить общее количество заказов покупателей.
   *
   * @returns Общее количество заказов покупателей
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Удалить заказ покупателя по id.
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-udalit-zakaz-pokupatelq
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Изменить заказ покупателя.
   *
   * @param id - id заказа покупателя
   * @param data - данные для изменения заказа покупателя
   * @param options - Опции для изменения заказа покупателя {@linkcode UpdateCustomerOrderOptions}
   * @returns Объект с обновленным заказом покупателя {@linkcode CustomerOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-izmenit-zakaz-pokupatelq
   *
   * @example
   * ```ts
   * await moysklad.customerOrder.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   name: "new name"
   * });
   * ```
   */
  async update<T extends UpdateCustomerOrderOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<CustomerOrderModel>,
    options?: Subset<T, UpdateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать заказ покупателя.
   *
   * @param data - данные для создания заказа покупателя
   * @param options - Опции для создания заказа покупателя {@linkcode CreateCustomerOrderOptions}
   * @returns Объект с созданным заказом покупателя {@linkcode CustomerOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-sozdat-zakaz-pokupatelq
   *
   * @example
   * ```ts
   * await moysklad.customerOrder.create({
   *   organization: {
   *     meta: {
   *       href: moysklad.client.buildUrl(["entity", "organization", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *       mediaType: MediaType.Json,
   *       type: Entity.Organization
   *     }
   *   },
   *   agent: {
   *     meta: {
   *       href: moysklad.client.buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"]),
   *       mediaType: MediaType.Json,
   *       type: Entity.Counterparty
   *     }
   *   }
   * });
   * ```
   */
  async create<T extends CreateCustomerOrderOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<CustomerOrderModel>,
    options?: Subset<T, CreateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово удалить заказы покупателей.
   *
   * @param ids - массив id заказов покупателей
   * @returns Массив с результатами удаления заказов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-massowoe-udalenie-zakazow-pokupatelej
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

  /**
   * Переместить заказ покупателя в корзину.
   *
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-peremestit-zakaz-pokupatelq-w-korzinu
   */
  async trash(id: string): Promise<void> {
    await this.client.post(`${ENDPOINT_URL}/${id}/trash`);
  }

  /**
   * Массово создать и обновить заказы покупателей
   *
   * @param data - массив из объектов для создания и обновления заказов покупателей
   * @param options - Опции для создания и обновления заказов покупателей {@linkcode CreateCustomerOrderOptions}
   * @returns Массив с созданными и обновленными заказами покупателей {@linkcode CustomerOrderModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-massowoe-sozdanie-i-obnowlenie-zakazow-pokupatelej
   *
   * @example
   * ```ts
   * await moysklad.customerOrder.upsert([
   *   // создать заказ покупателя
   *   {
   *     agent: {
   *       meta: {
   *         type: Entity.Counterparty,
   *         href: moysklad.client
   *           .buildUrl([
   *             "entity",
   *             Entity.Counterparty,
   *             "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *           ])
   *           .toString(),
   *         mediaType: MediaType.Json,
   *       },
   *     },
   *     organization: {
   *       meta: {
   *         type: Entity.Organization,
   *         href: moysklad.client
   *           .buildUrl([
   *             "entity",
   *             Entity.Organization,
   *             "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *           ])
   *           .toString(),
   *         mediaType: MediaType.Json,
   *       },
   *     },
   *   },
   *   // обновить существующий заказ покупателя
   *   {
   *     meta: {
   *       type: Entity.CustomerOrder,
   *       href: moysklad.client
   *         .buildUrl([
   *           "entity",
   *           Entity.CustomerOrder,
   *           "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *         ])
   *         .toString(),
   *       mediaType: MediaType.Json,
   *     },
   *     description: "Новое описание",
   *   },
   * ]);
   * ```
   */
  async upsert<T extends CreateCustomerOrderOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<CustomerOrderModel>
      | (GetModelUpdatableFields<CustomerOrderModel> &
          UpdateMeta<Entity.CustomerOrder>)
    )[],
    options?: Subset<T, CreateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }
}

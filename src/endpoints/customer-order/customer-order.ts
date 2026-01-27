import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  ListMeta,
  ListResponse,
  Subset,
  UpdateMeta,
} from "../../types"
import type {
  AllCustomerOrdersOptions,
  CreateCustomerOrderOptions,
  CustomerOrderMetadata,
  CustomerOrderModel,
  FirstCustomerOrderOptions,
  GetCustomerOrderOptions,
  ListCustomerOrdersOptions,
  UpdateCustomerOrderOptions,
} from "./types"

/**
 * Заказы покупателей
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq
 */
export interface CustomerOrderEndpoint {
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
  list<T extends ListCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, ListCustomerOrdersOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  >

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
  all<T extends AllCustomerOrdersOptions = Record<string, unknown>>(
    options?: Subset<T, AllCustomerOrdersOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >

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
  first<T extends FirstCustomerOrderOptions = Record<string, unknown>>(
    options?: Subset<T, FirstCustomerOrderOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<CustomerOrderModel, T["expand"]>,
      Entity.CustomerOrder
    >
  >

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
  get<T extends GetCustomerOrderOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>

  /**
   * Получить общее количество заказов покупателей.
   *
   * @returns Общее количество заказов покупателей
   */
  size(
    options?: AllCustomerOrdersOptions,
  ): Promise<ListMeta<Entity.CustomerOrder>>

  /**
   * Удалить заказ покупателя по id.
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-udalit-zakaz-pokupatelq
   */
  delete(id: string): Promise<void>

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
  update<T extends UpdateCustomerOrderOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<CustomerOrderModel>,
    options?: Subset<T, UpdateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>

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
  create<T extends CreateCustomerOrderOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<CustomerOrderModel>,
    options?: Subset<T, CreateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>

  /**
   * Массово удалить заказы покупателей.
   *
   * @param ids - массив id заказов покупателей
   * @returns Массив с результатами удаления заказов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-massowoe-udalenie-zakazow-pokupatelej
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить заказ покупателя в корзину.
   *
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-peremestit-zakaz-pokupatelq-w-korzinu
   */
  trash(id: string): Promise<void>

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
  upsert<T extends CreateCustomerOrderOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<CustomerOrderModel>
      | (GetModelUpdatableFields<CustomerOrderModel> &
          UpdateMeta<Entity.CustomerOrder>)
    )[],
    options?: Subset<T, CreateCustomerOrderOptions>,
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>[]>

  /**
   * Получить метаданные заказов покупателей.
   *
   * @returns Метаданные заказов покупателей {@linkcode CustomerOrderMetadata}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-metadannye-zakazow-pokupatelej
   *
   * @example
   * ```ts
   * const metadata = await moysklad.customerOrder.metadata();
   * console.log(metadata.states); // массив статусов
   * ```
   */
  metadata(): Promise<CustomerOrderMetadata>
}

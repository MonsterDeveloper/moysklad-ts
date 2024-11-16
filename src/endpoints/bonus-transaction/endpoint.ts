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
  AllBonusTransactionsOptions,
  BonusTransactionModel,
  CreateBonusTransactionOptions,
  FirstBonusTransactionOptions,
  GetBonusTransactionOptions,
  ListBonusTransactionsOptions,
  UpdateBonusTransactionOptions,
} from "./types";
import { BaseEndpoint } from "../base-endpoint";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/bonustransaction";

export class BonusTransactionEndpoint extends BaseEndpoint {
  /**
   * Получить массив бонусных операций.
   *
   * @param options - Опции для получения бонусных операций {@linkcode ListBonusTransactionsOptions}
   * @returns Объект с массивом бонусных операций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnye-operacii
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.list({
   *  expand: ["agent", "organization"],
   * });
   * ```
   *
   * @example С фильтрами, сортировкой и пагинацией
   * ```ts
   * moysklad.bonusTransaction.list({
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
  async list<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все бонусные операции.
   *
   * @param options - Опции для получения всех бонусных операций {@linkcode AllBonusTransactionsOptions}
   * @returns Объект с массивом бонусных операций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnye-operacii
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.all({ expand: ["agent", "organization"] });
   * ```
   */
  async all<T extends AllBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, AllBonusTransactionsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<BonusTransactionModel, T["expand"]>,
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
   * Получить бонусную операцию по id.
   *
   * @param id - id бонусной операции
   * @param options - Опции для получения бонусной операции {@linkcode GetBonusTransactionOptions}
   * @returns Объект с бонусной операцией {@linkcode BonusTransactionModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * const transaction = await moysklad.bonusTransaction.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  async get<T extends GetBonusTransactionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Изменить бонусную операцию.
   *
   * @param id - id бонусной операции
   * @param data - данные для изменения бонусной операции
   * @param options - Опции для изменения бонусной операции {@linkcode UpdateBonusTransactionOptions}
   * @returns Объект с обновленной бонусной операцией {@linkcode BonusTransactionModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-izmenit-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * await moysklad.bonusTransaction.update("5427bc76-b95f-11eb-0a80-04bb000cd583", {
   *   shared: false,
   *     agent: {
   *      meta: {
   *        type: Entity.Counterparty,
   *        href: moysklad.client
   *           .buildUrl(["entity", "counterparty", "5427bc76-b95f-11eb-0a80-04bb000cd583"]).toString(),
   *        mediaType: MediaType.Json,
   *     },
   *   },
   * });
   * ```
   */
  async update<
    T extends UpdateBonusTransactionOptions = Record<string, unknown>,
  >(
    id: string,
    data: GetModelUpdatableFields<BonusTransactionModel>,
    options?: Subset<T, UpdateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать бонусную операцию.
   *
   * @param data - данные для создания бонусной операции
   * @param options - Опции для создания бонусной операции {@linkcode CreateBonusTransactionOptions}
   * @returns Объект с созданной бонусной операцией {@linkcode BonusTransactionModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-sozdat-bonusnuu-operaciu
   *
   * @example
   * ```ts
   * await moysklad.bonusTransaction.create({
   *   agent: {
   *     meta: {
   *       type: Entity.Counterparty,
   *       href: moysklad.client.buildUrl(["entity", Entity.Counterparty, "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e"]).toString(),
   *       mediaType: MediaType.Json,
   *     }
   *   },
   *   transactionType: BonusTransactionType.Earning,
   * });
   * ```
   */
  async create<
    T extends CreateBonusTransactionOptions = Record<string, unknown>,
  >(
    data: GetModelCreatableFields<BonusTransactionModel>,
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово создать и обновить бонусные операции
   *
   * @param data - массив из объектов для создания и обновления бонусных операций
   * @param options - Опции для создания и обновления бонусных операций {@linkcode CreateBonusTransactionOptions}
   * @returns Массив с созданными и обновленными бонусными операциями {@linkcode BonusTransactionModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-massowoe-sozdanie-i-obnowlenie-bonusnyh-operacij
   *
   * @example
   * ```ts
   * await moysklad.bonusTransaction.upsert([
   *   // создать бонусную операцию
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
   *     transactionType: BonusTransactionType.Earning,
   *   },
   *   // обновить существующую бонусную операцию
   *   {
   *     meta: {
   *       type: Entity.BonusTransaction,
   *       href: moysklad.client
   *         .buildUrl([
   *           "entity",
   *           Entity.BonusTransaction,
   *           "b0e1f1d1-0b1d-11ec-80e9-0b5808000a0e",
   *         ])
   *         .toString(),
   *       mediaType: MediaType.Json,
   *     },
   *     transactionType: BonusTransactionType.Spending,
   *   },
   * ]);
   * ```
   */
  async upsert<
    T extends CreateBonusTransactionOptions = Record<string, unknown>,
  >(
    data: (
      | GetModelCreatableFields<BonusTransactionModel>
      | (GetModelUpdatableFields<BonusTransactionModel> &
          UpdateMeta<Entity.BonusTransaction>)
    )[],
    options?: Subset<T, CreateBonusTransactionOptions>,
  ): Promise<GetFindResult<BonusTransactionModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить первую бонусную операцию.
   *
   * @param options - Опции для получения первой бонусной операции {@linkcode FirstBonusTransactionOptions}
   * @returns Объект с первой бонусной операцией
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnye-operacii
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.first({
   *  expand: ["agent", "organization"],
   *  search: "123"
   * });
   * ```
   */
  async first<T extends FirstBonusTransactionOptions = Record<string, unknown>>(
    options?: Subset<T, FirstBonusTransactionOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить общее количество бонусных операций.
   *
   * @returns Общее количество бонусных операций
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Удалить бонусную операцию по id.
   * @param id - id бонусной операции
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-udalit-bonusnuu-operaciu
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Массово удалить бонусные операции.
   *
   * @param ids - массив id бонусных операций
   * @returns Массив с результатами удаления бонусных операций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-massowoe-udalenie-bonusnyh-operacij
   */
  async batchDelete(ids: string[]): Promise<BatchDeleteResult[]> {
    const response = await this.client.post(`${ENDPOINT_URL}/delete`, {
      body: ids.map((id) => ({
        meta: {
          href: this.client.buildUrl(`${ENDPOINT_URL}/${id}`),
          type: Entity.BonusTransaction,
          mediaType: MediaType.Json,
        },
      })),
    });

    return response.json();
  }
}

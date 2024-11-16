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
  ListVariantsOptions,
  CreateVariantOptions,
  VariantModel,
  AllVariantsOptions,
  FirstVariantOptions,
  GetVariantOptions,
  UpdateVariantOptions,
} from "./types";
import { composeSearchParameters } from "../../api-client";

const ENDPOINT_URL = "/entity/variant";

export class VariantEndpoint extends BaseEndpoint {
  /**
   * Получить список модификаций.
   *
   * @param options - Опции для получения списка модификаций {@linkcode ListVariantsOptions}
   * @returns Объект с массивом модификаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-poluchit-modifikacii
   *
   * @example Без опций (по умолчанию первые 1000 сущностей)
   * ```ts
   * const { rows } = await moysklad.variant.list();
   * ```
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.variant.list({
   *   expand: ["product"],
   * });
   * ```
   */
  async list<T extends ListVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, ListVariantsOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  > {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(ENDPOINT_URL, {
      searchParameters,
    });
    return response.json();
  }

  /**
   * Получить все модификации.
   *
   * @param options - Опции для получения всех модификаций {@linkcode AllVariantsOptions}
   * @returns Объект с массивом модификаций
   *
   * @example С expand
   * ```ts
   * const { rows } = await moysklad.variant.all({
   *   expand: ["product"],
   * });
   * ```
   */
  async all<T extends AllVariantsOptions = Record<string, unknown>>(
    options?: Subset<T, AllVariantsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
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
   * Получить первую модификацию.
   *
   * @param options - Опции для получения первой модификации {@linkcode FirstVariantOptions}
   * @returns Объект с первой модификацией
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.variant.first({
   *   expand: ["product"],
   * });
   * ```
   */
  async first<T extends FirstVariantOptions = Record<string, unknown>>(
    options?: Subset<T, FirstVariantOptions>,
  ): Promise<
    ListResponse<GetFindResult<VariantModel, T["expand"]>, Entity.Variant>
  > {
    return this.list({ ...options, pagination: { limit: 1 } });
  }

  /**
   * Получить модификацию по id.
   *
   * @param id - id модификации
   * @param options - Опции для получения модификации {@linkcode GetVariantOptions}
   * @returns Объект модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-poluchit-modifikaciu
   *
   * @example
   * ```ts
   * const variant = await moysklad.variant.get("5427bc76-b95f-11eb-0a80-04bb000cd583");
   * ```
   */
  async get<T extends GetVariantOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.get(`${ENDPOINT_URL}/${id}`, {
      searchParameters,
    });

    return response.json();
  }

  /**
   * Получить общее количество модификаций.
   *
   * @returns Общее количество модификаций
   */
  async size(): Promise<number> {
    const response = await this.list({ pagination: { limit: 0 } });

    return response.meta.size;
  }

  /**
   * Удалить модификацию по id.
   * @param id - id модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-udalit-modifikaciu
   */
  async delete(id: string): Promise<void> {
    await this.client.delete(`${ENDPOINT_URL}/${id}`);
  }

  /**
   * Изменить модификацию.
   *
   * @param id - id модификации
   * @param data - данные для изменения модификации
   * @param options - Опции для изменения модификации {@linkcode UpdateVariantOptions}
   * @returns Объект с обновленной модификацией {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-izmenit-modifikaciu
   */
  async update<T extends UpdateVariantOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<VariantModel>,
    options?: Subset<T, UpdateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.put(`${ENDPOINT_URL}/${id}`, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Создать модификацию.
   *
   * @param data - данные для создания модификации
   * @param options - Опции для создания модификации {@linkcode CreateVariantOptions}
   * @returns Объект с созданной модификацией {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-sozdat-modifikaciu
   */
  async create<T extends CreateVariantOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<VariantModel>,
    options?: Subset<T, CreateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Массово удалить модификации.
   *
   * @param ids - массив id модификаций
   * @returns Массив с результатами удаления модификаций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-massowoe-udalenie-modifikacij
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
   * Массово создать и обновить модификации.
   *
   * @param data - массив из объектов для создания и обновления модификаций
   * @param options - Опции для создания и обновления модификаций {@linkcode CreateVariantOptions}
   * @returns Массив с созданными и обновленными модификациями {@linkcode VariantModel}
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-massowoe-sozdanie-i-obnowlenie-modifikacij
   */
  async upsert<T extends CreateVariantOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<VariantModel>
      | (GetModelUpdatableFields<VariantModel> & UpdateMeta<Entity.Variant>)
    )[],
    options?: Subset<T, CreateVariantOptions>,
  ): Promise<GetFindResult<VariantModel, T["expand"]>[]> {
    const searchParameters = composeSearchParameters(options ?? {});

    const response = await this.client.post(ENDPOINT_URL, {
      body: data,
      searchParameters,
    });

    return response.json();
  }

  /**
   * Поместить модификацию в корзину.
   *
   * @param id - id модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq-pomestit-modifikaciu-w-korzinu
   */
  async trash(id: string): Promise<void> {
    await this.client.post(`${ENDPOINT_URL}/${id}/trash`);
  }
}

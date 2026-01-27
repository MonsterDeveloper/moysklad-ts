import type {
  BatchDeleteResult,
  BatchGetResult,
  Entity,
  GetFindResult,
  ListMeta,
  ListResponse,
  MatchArrayType,
  ModelCreateOrUpdateData,
  Subset,
} from "../../types"
import type {
  AllDemandsOptions,
  DemandModel,
  DemandTemplateData,
  FirstDemandOptions,
  GetDemandOptions,
  ListDemandsOptions,
  UpsertDemandsOptions,
} from "./types"

/**
 * Отгрузки
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka
 */
export interface DemandEndpoint {
  /**
   * Получить список отгрузок.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком отгрузок
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-poluchit-otgruzki
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.demand.list();
   * ```
   */
  list<T extends ListDemandsOptions = Record<string, unknown>>(
    options?: Subset<T, ListDemandsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.Demand
    >
  >

  /**
   * Получить все отгрузки с учетом пагинации.
   *
   * @param options - Опции для получения списка
   * @returns Массив отгрузок
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-poluchit-otgruzki
   *
   * @example
   * ```ts
   * const demands = await moysklad.demand.all();
   * ```
   */
  all<T extends AllDemandsOptions = Record<string, unknown>>(
    options?: Subset<T, AllDemandsOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.Demand
    >
  >

  /**
   * Получить отгрузку по ID.
   *
   * @param id - ID отгрузки
   * @param options - Опции для получения отгрузки
   * @returns Отгрузка
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-poluchit-otgruzku
   *
   * @example
   * ```ts
   * const demand = await moysklad.demand.get("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  get<T extends GetDemandOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetDemandOptions>,
  ): Promise<GetFindResult<DemandModel, T["expand"], T["fields"]>>

  /**
   * Получить первую отгрузку из списка.
   *
   * @param options - Опции для получения списка
   * @returns Объект с списком отгрузок (с одним элементом)
   *
   * @example
   * ```ts
   * const { rows: [demand] } = await moysklad.demand.first();
   * ```
   */
  first<T extends FirstDemandOptions = Record<string, unknown>>(
    options?: Subset<T, FirstDemandOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<DemandModel, T["expand"], T["fields"]>,
      Entity.Demand
    >
  >

  /**
   * Получить количество отгрузок.
   *
   * @returns Количество отгрузок
   *
   * @example
   * ```ts
   * const count = await moysklad.demand.size();
   * ```
   */
  size(options?: AllDemandsOptions): Promise<ListMeta<Entity.Demand>>

  /**
   * Удалить отгрузку.
   *
   * @param id - ID отгрузки
   * @returns Promise, который разрешается, когда отгрузка удалена
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-udalit-otgruzku
   *
   * @example
   * ```ts
   * await moysklad.demand.delete("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  delete(id: string): Promise<void>

  /**
   * Удалить несколько отгрузок.
   *
   * @param ids - Массив ID отгрузок
   * @returns Результат удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-massowoe-udalenie-otgruzok
   *
   * @example
   * ```ts
   * await moysklad.demand.batchDelete(["a7404318-550f-11e8-56c0-000800000006", "a7404318-550f-11e8-56c0-000800000007"]);
   * ```
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>

  /**
   * Переместить отгрузку в корзину.
   *
   * @param id - ID отгрузки
   * @returns Promise, который разрешается, когда отгрузка перемещена в корзину
   *
   * @example
   * ```ts
   * await moysklad.demand.trash("a7404318-550f-11e8-56c0-000800000006");
   * ```
   */
  trash(id: string): Promise<void>

  /**
   * Создать или обновить отгрузку.
   *
   * @param data - Данные для создания или обновления отгрузки
   * @param options - Опции для создания или обновления отгрузки
   * @returns Созданная или обновленная отгрузка
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-sozdat-otgruzku
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-izmenit-otgruzku
   *
   * @example
   * ```ts
   * const demand = await moysklad.demand.upsert({
   *   organization: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/organization/a7404318-550f-11e8-56c0-000800000001", type: "organization", mediaType: "application/json" } },
   *   agent: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404318-550f-11e8-56c0-000800000002", type: "counterparty", mediaType: "application/json" } },
   *   store: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/store/a7404318-550f-11e8-56c0-000800000003", type: "store", mediaType: "application/json" } },
   * });
   * ```
   */
  upsert<
    TData extends ModelCreateOrUpdateData<DemandModel>,
    TOptions extends UpsertDemandsOptions = Record<string, unknown>,
  >(
    data: TData,
    options?: Subset<TOptions, UpsertDemandsOptions>,
  ): Promise<
    MatchArrayType<TData, GetFindResult<DemandModel, TOptions["expand"]>>
  >

  /**
   * Получить шаблон отгрузки на основе заказа покупателя или счета покупателю.
   *
   * @param data - Данные для создания шаблона
   * @returns Шаблон отгрузки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka-shablon-otgruzki-na-osnowe-zakaza-ili-scheta-pokupatelu
   *
   * @example
   * ```ts
   * const template = await moysklad.demand.template({
   *   customerOrder: { meta: { href: "https://api.moysklad.ru/api/remap/1.2/entity/customerorder/a7404318-550f-11e8-56c0-000800000001", type: "customerorder", mediaType: "application/json" } },
   * });
   * ```
   */
  template(
    data: DemandTemplateData,
  ): Promise<GetFindResult<DemandModel, { positions: true }>>
}

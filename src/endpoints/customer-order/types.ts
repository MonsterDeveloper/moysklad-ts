import {
  type AccountModel,
  type AssortmentEntity,
  type AssortmentModel,
  type Attribute,
  type BooleanFilter,
  type DateTime,
  type DateTimeFilter,
  type DocumentRate,
  type Entity,
  type ExpandOptions,
  type FilterOptions,
  type IdFilter,
  type Idable,
  type ListMeta,
  type Meta,
  type Model,
  type NumberFilter,
  type OrderOptions,
  type PaginationOptions,
  type StringFilter,
  type TaxSystem,
  type BatchGetResult,
  type GetFindResult,
  type ListResponse,
  type Subset,
  type BatchDeleteResult,
  type GetModelCreatableFields,
  type GetModelUpdatableFields,
  type UpdateMeta,
} from "../../types";
import type { CounterpartyModel } from "../counterparty";
import type { DemandModel } from "../demand";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";
import type { EmployeeModel } from "../employee";

/**
 * Позиция заказа покупателя.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-zakazy-pokupatelej
 */
export interface CustomerOrderPosition
  extends Idable,
    Meta<Entity.CustomerOrderPosition> {
  /** ID учетной записи */
  readonly accountId: string;

  /** Метаданные товара/услуги/серии/модификации/комплекта, которую представляет собой позиция */
  assortment: Meta<AssortmentEntity>;

  /** Процент скидки или наценки. Наценка указывается отрицательным числом, т.е. -10 создаст наценку в 10% */
  discount?: number;

  /**
   * Упаковка Товара.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar-towary-atributy-wlozhennyh-suschnostej-upakowki-towara
   */
  pack?: unknown; // TODO add pack type;

  /** Цена товара/услуги в копейках */
  price: number;

  /**
   * Количество товаров/услуг данного вида в позиции.
   *
   * Если позиция - товар, у которого включен учет по серийным номерам, то значение в этом поле всегда будет равно количеству серийных номеров для данной позиции в документе. */
  quantity: number;

  /** Резерв данной позиции */
  reserve?: number;

  /** Доставлено */
  readonly shipped: number;

  /** Код системы налогообложения */
  taxSystem?: TaxSystem;

  /** НДС, которым облагается текущая позиция */
  vat: number;

  /** Включен ли НДС для позиции. С помощью этого флага для позиции можно выставлять НДС = 0 или НДС = "без НДС". (`vat` = `0`, `vatEnabled` = `false`) -> `vat` = "без НДС", (`vat` = `0`, `vatEnabled` = `true`) -> `vat` = 0%. */
  vatEnabled: boolean;
}

/**
 * Модель позиции заказа покупателя
 *
 * {@linkcode CustomerOrderPosition}
 * */
export interface CustomerOrderPositionModel extends Model {
  object: CustomerOrderPosition;
  expandable: {
    assortment: AssortmentModel;
  };
}

export interface CustomerOrder extends Idable, Meta<Entity.CustomerOrder> {
  readonly accountId: string;
  agent: Meta<Entity.Counterparty>;
  agentAccount?: Meta<Entity.Account>;
  applicable: boolean;
  attributes?: Attribute[]; // TODO add attributes filters
  code?: string;
  contract?: Meta<Entity.Contract>; // TODO expand contract
  readonly created: DateTime;
  readonly deleted?: DateTime;
  deliveryPlannedMoment?: DateTime;
  description?: string;
  externalCode: string;
  files: unknown[]; // TODO add files types & expand
  group: Meta<Entity.Group>;
  readonly invoicedSum: number;
  moment: DateTime;
  name: string;
  organization: Meta<Entity.Organization>;
  organizationAccount?: Meta<Entity.Account>;
  owner?: Meta<Entity.Employee>;
  readonly payedSum: number;
  positions: ListMeta<Entity.CustomerOrderPosition>;
  readonly printed: boolean;
  project?: Meta<Entity.Project>; // TODO expand project
  readonly published: boolean;
  rate: DocumentRate; // TODO expand rate's currency
  readonly reservedSum: number;
  salesChannel?: Meta<Entity.SalesChannel>; // TODO expand salesChannel
  shared: boolean;
  shipmentAddress?: string;
  shipmentAddressFull?: {
    addInfo?: string;
    apartment?: string;
    city?: string;
    comment?: string;
    country?: Meta<Entity.Country>;
    house?: string;
    postalCode?: string;
    region?: Meta<Entity.Region>;
    street?: string;
  };

  readonly shippedSum: number;
  state?: Meta<Entity.State>; // TODO expand state
  store?: Meta<Entity.Store>; // TODO expand store
  readonly sum: number;
  syncId?: string;
  taxSystem?: TaxSystem;
  readonly updated: DateTime;
  vatEnabled: boolean;
  vatIncluded: boolean;
  readonly vatSum: number;

  purchaseOrders: unknown; // TODO add purchaseOrders types & expand
  demands: Meta<Entity.Demand>[];
  payments: unknown; // TODO add payments types & expand
  invoicesOut: unknown; // TODO add invoicesOut types & expand
  moves: unknown; // TODO add moves types & expand
  prepayments: unknown; // TODO add prepayments types & expand
}

export interface CustomerOrderModel extends Model {
  object: CustomerOrder;
  expandable: {
    agent: CounterpartyModel;
    group: GroupModel;
    organization: OrganizationModel;
    owner: EmployeeModel;
    demands: DemandModel;
    organizationAccount: AccountModel;
    agentAccount: AccountModel;
    positions: CustomerOrderPositionModel;
  };
  filters: {
    id: IdFilter;
    accountId: IdFilter;
    agent: IdFilter;
    applicable: BooleanFilter;
    code: StringFilter;
    contract: IdFilter;
    deleted: DateTimeFilter;
    deliveryPlannedMoment: DateTimeFilter;
    description: StringFilter;
    externalCode: StringFilter;
    group: IdFilter;
    moment: DateTimeFilter;
    name: StringFilter;
    organization: IdFilter;
    owner: IdFilter;
    printed: BooleanFilter;
    project: IdFilter;
    published: BooleanFilter;
    salesChannel: IdFilter;
    shared: BooleanFilter;
    shipmentAddress: StringFilter;
    state: IdFilter;
    store: IdFilter;
    sum: NumberFilter;
    syncId: IdFilter;
    updated: DateTimeFilter;
    isDeleted: BooleanFilter;
  };
  orderableFields:
    | "id"
    | "syncId"
    | "updated"
    | "updatedBy"
    | "name"
    | "description"
    | "externalCode"
    | "moment"
    | "applicable"
    | "sum"
    | "created"
    | "deliveryPlannedMoment";
  requiredCreateFields: "agent" | "organization";
}

export interface ListCustomerOrdersOptions {
  pagination?: PaginationOptions;
  expand?: ExpandOptions<CustomerOrderModel>;
  order?: OrderOptions<CustomerOrderModel>;
  search?: string;
  filter?: FilterOptions<CustomerOrderModel>;
  namedfilter?: string;
}

export interface CreateCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>;
}

export interface UpdateCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>;
}

export interface GetCustomerOrderOptions {
  expand?: ExpandOptions<CustomerOrderModel>;
}

export type FirstCustomerOrderOptions = Omit<
  ListCustomerOrdersOptions,
  "pagination"
>;
export type AllCustomerOrdersOptions = Omit<
  ListCustomerOrdersOptions,
  "pagination"
>;

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
  >;

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
  >;

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
  >;

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
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>;

  /**
   * Получить общее количество заказов покупателей.
   *
   * @returns Общее количество заказов покупателей
   */
  size(): Promise<number>;

  /**
   * Удалить заказ покупателя по id.
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-udalit-zakaz-pokupatelq
   */
  delete(id: string): Promise<void>;

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
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>;

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
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>>;

  /**
   * Массово удалить заказы покупателей.
   *
   * @param ids - массив id заказов покупателей
   * @returns Массив с результатами удаления заказов покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-massowoe-udalenie-zakazow-pokupatelej
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>;

  /**
   * Переместить заказ покупателя в корзину.
   *
   * @param id - id заказа покупателя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq-peremestit-zakaz-pokupatelq-w-korzinu
   */
  trash(id: string): Promise<void>;

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
  ): Promise<GetFindResult<CustomerOrderModel, T["expand"]>[]>;
}

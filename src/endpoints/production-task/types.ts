import type {
  AssortmentEntity,
  AssortmentModel,
  Attribute,
  BatchDeleteResult,
  BatchGetResult,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  ExpandOptions,
  FilterOptions,
  GetFindResult,
  GetModelCreatableFields,
  GetModelUpdatableFields,
  Idable,
  IdFilter,
  ListMeta,
  ListResponse,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StringFilter,
  Subset,
  UpdateMeta,
} from "../../types";
import type { EmployeeModel } from "../employee";
import type { GroupModel } from "../group";
import type { OrganizationModel } from "../organization";

/**
 * Позиция производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionRow extends Idable, Meta<Entity.ProductionRow> {
  /** ID учётной записи */
  readonly accountId: string;

  /** Внешний код */
  externalCode?: string;

  /** Наименование */
  name?: string;

  /** Метаданные техкарты */
  processingPlan: Meta<Entity.ProcessingPlan>;

  /** Объём производства */
  productionVolume: number;

  /** Момент последнего обновления производственного задания */
  readonly updated: DateTime;
}

/**
 * Модель позиции производственного задания
 *
 * {@linkcode ProductionRow}
 */
export interface ProductionRowModel extends Model {
  object: ProductionRow;
}

/**
 * Продукт производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionTaskResult
  extends Idable,
    Meta<Entity.ProductionTaskResult> {
  /** ID учётной записи */
  readonly accountId: string;

  /** Ассортимент */
  assortment: Meta<AssortmentEntity>;

  /** Запланированное для производства количество продукта */
  planQuantity: number;

  /** Метаданные Позиции производственного задания */
  readonly productionRow: Meta<Entity.ProductionRow>;
}

/**
 * Модель продукта производственного задания
 *
 * {@linkcode ProductionTaskResult}
 */
export interface ProductionTaskResultModel extends Model {
  object: ProductionTaskResult;

  expandable: {
    assortment: AssortmentModel;
    productionRow: ProductionRowModel;
  };
}

/**
 * Производственное задание
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie
 */
export interface ProductionTask extends Idable, Meta<Entity.ProductionTask> {
  /** ID учётной записи */
  readonly accountId: string;

  /** Отметка о проведении */
  applicable: boolean;

  /** Доп. поля */
  attributes?: Attribute[];

  /** Флаг ожидания продукта Производственного задания */
  awaiting?: boolean;

  /** Код */
  code?: string;

  /** Дата создания */
  readonly created: DateTime;

  /** Момент удаления */
  readonly deleted?: DateTime;

  /** Планируемая дата выполнения */
  deliveryPlannedMoment?: DateTime;

  /** Комментарий */
  description?: string;

  /** Внешний код */
  externalCode: string;

  /** Метаданные массива Файлов (Максимальное количество файлов - 100) */
  files: ListMeta<Entity.Files>; // TODO add files expand

  /** Отдел сотрудника */
  group: Meta<Entity.Group>;

  /** Метаданные склада материалов */
  materialsStore?: Meta<Entity.Store>; // TODO add materialsStore expand

  /** Дата документа */
  moment: DateTime;

  /** Наименование Производственного задания */
  name: string;

  /** Метаданные юрлица */
  organization: Meta<Entity.Organization>;

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>;

  /** Напечатан ли документ */
  readonly printed: boolean;

  /** Метаданные Позиций производственного задания */
  productionRows: ListMeta<Entity.ProductionRow>;

  /** Дата окончания производства */
  readonly productionEnd?: DateTime;

  /** Дата начала производства */
  productionStart?: DateTime;

  /** Метаданные производимой продукции */
  products: ListMeta<Entity.ProductionTaskResult>;

  /** Метаданные склада продукции */
  productsStore?: Meta<Entity.Store>; // TODO add productsStore expand

  /** Опубликован ли документ */
  readonly published: boolean;

  /** Флаг резервирования материала Производственного задания */
  reserve?: boolean;

  /** Общий доступ */
  shared: boolean;

  /** Метаданные статуса Производственного задания */
  state?: Meta<Entity.State>; // TODO add state expand

  /** Момент последнего обновления Производственного задания */
  readonly updated: DateTime;
}

/**
 * Модель производственного задания
 *
 * {@linkcode ProductionTask}
 */
export interface ProductionTaskModel extends Model {
  object: ProductionTask;

  expandable: {
    group: GroupModel;
    organization: OrganizationModel;
    owner: EmployeeModel;
    productionRows: ProductionRowModel;
    products: ProductionTaskResultModel;
  };

  requiredCreateFields: "organization";

  filters: {
    id: IdFilter;
    accountId: IdFilter;
    code: StringFilter;
    deleted: DateTimeFilter;
    deliveryPlannedMoment: DateTimeFilter;
    description: StringFilter;
    externalCode: StringFilter;
    group: IdFilter;
    moment: DateTimeFilter;
    name: StringFilter;
    organization: IdFilter;
    owner: IdFilter;
    shared: BooleanFilter;
    updated: DateTimeFilter;
  };
}

export interface ListProductionTasksOptions {
  /**
   * Опции пагинации
   *
   * {@linkcode PaginationOptions}
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *  pagination: { limit: 10, offset: 0 },
   * })
   * ```
   */
  pagination?: PaginationOptions;

  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>;

  /**
   * Опции сортировки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/workbook/#workbook-fil-traciq-listanie-poisk-i-sortirowka-sortirowka
   *
   * @example Одно поле
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   order: { field: "moment", direction: "asc" },
   * })
   * ```
   *
   * @example Несколько полей
   * ```ts
   * const { rows } = await moysklad.productionTask.list({
   *   order: [
   *     { field: "moment", direction: "asc" },
   *     { field: "created", direction: "desc" },
   *   ],
   * })
   * ```
   */
  order?: OrderOptions<ProductionTaskModel>;

  /**
   * Контекстный поиск
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-kontextnyj-poisk
   */
  search?: string;

  /**
   * Фильтры
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-fil-traciq-wyborki-s-pomosch-u-parametra-filter
   *
   * @example
   * ```ts
   * await moysklad.productionTask.list({
   *   filter: {
   *     name: {
   *       sw: "test",
   *     }
   *   }
   * });
   * ```
   */
  filter?: FilterOptions<ProductionTaskModel>;
}

export type AllProductionTasksOptions = Omit<
  ListProductionTasksOptions,
  "pagination"
>;

export type FirstProductionTaskOptions = Omit<
  ListProductionTasksOptions,
  "pagination"
>;

export interface GetProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.get("123", {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>;
}

export interface UpdateProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.update("123", {...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>;
}

export interface CreateProductionTaskOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.productionTask.create({...}, {
   *   expand: {
   *     owner: {
   *       group: true
   *     },
   *     organization: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<ProductionTaskModel>;
}

/**
 * Производственные задания
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie
 */
export interface ProductionTaskEndpoint {
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
  list<T extends ListProductionTasksOptions = Record<string, unknown>>(
    options?: Subset<T, ListProductionTasksOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
    >
  >;

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
  all<T extends AllProductionTasksOptions = Record<string, unknown>>(
    options?: Subset<T, AllProductionTasksOptions>,
  ): Promise<
    BatchGetResult<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
    >
  >;

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
  get<T extends GetProductionTaskOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>>;

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
  update<T extends UpdateProductionTaskOptions = Record<string, unknown>>(
    id: string,
    data: GetModelUpdatableFields<ProductionTaskModel>,
    options?: Subset<T, UpdateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>>;

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
  create<T extends CreateProductionTaskOptions = Record<string, unknown>>(
    data: GetModelCreatableFields<ProductionTaskModel>,
    options?: Subset<T, CreateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>>;

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
  upsert<T extends CreateProductionTaskOptions = Record<string, unknown>>(
    data: (
      | GetModelCreatableFields<ProductionTaskModel>
      | (GetModelUpdatableFields<ProductionTaskModel> &
          UpdateMeta<Entity.ProductionTask>)
    )[],
    options?: Subset<T, CreateProductionTaskOptions>,
  ): Promise<GetFindResult<ProductionTaskModel, T["expand"]>[]>;

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
  first<T extends FirstProductionTaskOptions = Record<string, unknown>>(
    options?: Subset<T, FirstProductionTaskOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<ProductionTaskModel, T["expand"]>,
      Entity.ProductionTask
    >
  >;

  /**
   * Получить общее количество производственных заданий.
   * @returns Общее количество производственных заданий
   */
  size(): Promise<number>;

  /**
   * Удалить производственное задание по id.
   * @param id - id производственного задания
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-udalit-proizwodstwennoe-zadanie
   */
  delete(id: string): Promise<void>;

  /**
   * Массово удалить производственные задания.
   *
   * @param ids - массив id производственных заданий
   * @returns Массив с результатами удаления производственных заданий
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-massowoe-udalenie-proizwodstwennyh-zadanij
   */
  batchDelete(ids: string[]): Promise<BatchDeleteResult[]>;
}

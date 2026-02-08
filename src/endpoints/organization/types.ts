import type {
  AccountModel,
  ArchivedFilter,
  Attribute,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  EnumFilter,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  ListMeta,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"
import type { BonusProgramModel } from "../bonus-program"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/**
 * Тип юрлица
 *
 * В зависимости от значения данного поля набор выводимых реквизитов юрлица может меняться.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-tip-jurlica
 */
export enum OrganizationCompanyType {
  /** Юридическое лицо */
  Legal = "legal",
  /** Индивидуальный предприниматель */
  Entrepreneur = "entrepreneur",
  /** Физическое лицо */
  Individual = "individual",
}

/**
 * Юрлицо
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica
 */
interface BaseOrganization extends Idable, Meta<Entity.Organization> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные счетов юрлица */
  accounts: ListMeta<Entity.Account>

  /** Фактический адрес Юрлица */
  actualAddress?: string

  /**
   * Фактический адрес Юрлица с детализацией по отдельным полям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-attributy-wlozhennyh-suschnostej-adres
   */
  actualAddressFull?: {
    /** Другое */
    addInfo?: string
    /** Квартира */
    apartment?: string
    /** Город */
    city?: string
    /** Комментарий */
    comment?: string
    /** Метаданные страны */
    country?: Meta<Entity.Country>
    /** Дом */
    house?: string
    /** Почтовый индекс */
    postalCode?: string
    /** Метаданные региона */
    region?: Meta<Entity.Region>
    /** Улица */
    street?: string
  }

  /**
   * Налоговая ставка для авансов для плательщиков НДС.
   *
   * Можно использовать значение только из существующих ставок НДС.
   */
  advancePaymentVat?: number

  /** Юридический адрес Юрлица */
  legalAddress?: string

  /**
   * Юридический адрес Юрлица с детализацией по отдельным полям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-attributy-wlozhennyh-suschnostej-adres
   */
  legalAddressFull?: {
    /** Другое */
    addInfo?: string
    /** Квартира */
    apartment?: string
    /** Город */
    city?: string
    /** Комментарий */
    comment?: string
    /** Метаданные страны */
    country?: Meta<Entity.Country>
    /** Дом */
    house?: string
    /** Почтовый индекс */
    postalCode?: string
    /** Метаданные региона */
    region?: Meta<Entity.Region>
    /** Улица */
    street?: string
  }

  /** Номер городского телефона */
  phone?: string

  /** Адрес электронной почты */
  email?: string

  /** Добавлено ли Юрлицо в архив */
  archived: boolean

  /** Массив метаданных дополнительных полей юрлица */
  attributes?: Attribute[]

  /** Бонусные баллы по активной бонусной программе */
  readonly bonusPoints?: number

  /** Метаданные активной бонусной программы */
  bonusProgram?: Meta<Entity.BonusProgram>

  /** Главный бухгалтер */
  chiefAccountant?: string

  /**
   * Подпись главного бухгалтера
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-attributy-wlozhennyh-suschnostej-podpisi-i-pechat
   */
  chiefAccountSign?: unknown

  /** Код Юрлица */
  code?: string

  /**
   * Тип Юрлица
   *
   * {@linkcode OrganizationCompanyType}
   */
  companyType: OrganizationCompanyType

  /** Дата создания */
  created: DateTime

  /** Комментарий к Юрлицу */
  description?: string

  /** Руководитель */
  director?: string

  /** Должность руководителя */
  directorPosition?: string

  /**
   * Подпись руководителя
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-attributy-wlozhennyh-suschnostej-podpisi-i-pechat
   */
  directorSign?: unknown

  /** Внешний код Юрлица */
  externalCode: string

  /** Номер факса */
  fax?: string

  /** Идентификатор в ФСРАР */
  fsrarId?: string

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Включен ли ЕГАИС для данного юрлица */
  isEgaisEnable?: boolean

  /** Наименование Юрлица */
  name: string

  /** Владелец (Сотрудник) */
  owner?: Meta<Entity.Employee>

  /** Является ли данное юрлицо плательщиком НДС */
  payerVat?: boolean

  /** Общий доступ */
  shared: boolean

  /**
   * Печать
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica-attributy-wlozhennyh-suschnostej-podpisi-i-pechat
   */
  stamp?: unknown

  /** ID синхронизации. После заполнения недоступно для изменения. */
  syncId?: string

  /** Дата договора с ЦРПТ */
  trackingContractDate?: DateTime

  /** Номер договора с ЦРПТ */
  trackingContractNumber?: string

  /** Момент последнего обновления Юрлица */
  readonly updated: DateTime

  /** IP-адрес УТМ */
  utmUrl?: string
}

/** Юрлицо с типом "Юридическое лицо" */
export interface LegalOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Legal
  /** Полное наименование юрлица */
  legalTitle?: string
  /** ИНН */
  inn?: string
  /** КПП */
  kpp?: string
  /** ОГРН */
  ogrn?: string
  /** ОКПО */
  okpo?: string
}

/** Юрлицо с типом "Индивидуальный предприниматель" */
export interface EntrepreneurOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Entrepreneur
  /** Дата свидетельства */
  certificateDate?: DateTime
  /** Номер свидетельства */
  certificateNumber?: string
  /** ИНН */
  inn?: string
  /** Имя для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalFirstName?: string
  /** Фамилия для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalLastName?: string
  /** Отчество для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalMiddleName?: string
  /**
   * Полное наименование.
   *
   * Игнорируется, если передано одно из значений для ФИО. Формируется автоматически на основе получаемых ФИО Юрлица.
   */
  legalTitle?: string
  /** ОГРНИП */
  ogrnip?: string
  /** ОКПО */
  okpo?: string
}

/** Юрлицо с типом "Физическое лицо" */
export interface IndividualOrganization extends BaseOrganization {
  companyType: OrganizationCompanyType.Individual
  /** ИНН */
  inn?: string
  /** Имя для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalFirstName?: string
  /** Фамилия для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalLastName?: string
  /** Отчество для Юрлица типа `[Индивидуальный предприниматель, Физическое лицо]` */
  legalMiddleName?: string
  /**
   * Полное наименование.
   *
   * Игнорируется, если передано одно из значений для ФИО. Формируется автоматически на основе получаемых ФИО Юрлица.
   */
  legalTitle?: string
}

/**
 * Юрлицо
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico-jurlica
 */
export type Organization =
  | LegalOrganization
  | EntrepreneurOrganization
  | IndividualOrganization

export interface OrganizationModel extends Model {
  /** Основная сущность юрлица {@linkcode Organization} */
  object: Organization

  expandable: {
    accounts: AccountModel
    bonusProgram: BonusProgramModel
    group: GroupModel
    owner: EmployeeModel
  }

  filters: {
    accountId: IdFilter
    actualAddress: StringFilter
    archived: ArchivedFilter
    code: StringFilter
    companyType: EnumFilter<OrganizationCompanyType>
    created: DateTimeFilter
    description: StringFilter
    email: StringFilter
    externalCode: StringFilter
    fax: StringFilter
    group: IdFilter
    id: IdFilter
    inn: StringFilter
    kpp: StringFilter
    legalAddress: StringFilter
    legalTitle: StringFilter
    name: StringFilter
    owner: IdFilter
    phone: StringFilter
    shared: BooleanFilter
    syncId: IdFilter
    updated: DateTimeFilter
  }

  orderableFields:
    | "id"
    | "name"
    | "code"
    | "externalCode"
    | "archived"
    | "created"
    | "updated"
    | "description"
    | "email"
    | "phone"
    | "fax"

  requiredCreateFields: "name"
}

export interface ListOrganizationsOptions {
  /**
   * Опции пагинации
   *
   * {@linkcode PaginationOptions}
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.list({
   *   pagination: { limit: 10, offset: 0 },
   * })
   * ```
   */
  pagination?: PaginationOptions

  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.organization.list({
   *   expand: {
   *     owner: true,
   *     group: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<OrganizationModel>

  /**
   * Опции сортировки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/workbook/#workbook-fil-traciq-listanie-poisk-i-sortirowka-sortirowka
   *
   * @example Одно поле
   * ```ts
   * const { rows } = await moysklad.organization.list({
   *   order: { field: "name", direction: "asc" },
   * })
   * ```
   *
   * @example Несколько полей
   * ```ts
   * const { rows } = await moysklad.organization.list({
   *   order: [
   *     { field: "name", direction: "asc" },
   *     { field: "created", direction: "desc" },
   *   ],
   * })
   * ```
   */
  order?: OrderOptions<OrganizationModel>

  /**
   * Контекстный поиск
   *
   * Поиск среди объектов юрлиц осуществляется по полям: `name`, `code`, `legalTitle`, `email`, `phone`.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-kontextnyj-poisk
   */
  search?: string

  /**
   * Фильтры
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-fil-traciq-wyborki-s-pomosch-u-parametra-filter
   *
   * @example
   * ```ts
   * await moysklad.organization.list({
   *   filter: {
   *     name: {
   *       sw: "ООО",
   *     }
   *   }
   * });
   * ```
   */
  filter?: FilterOptions<OrganizationModel>
}

export type AllOrganizationsOptions = Omit<
  ListOrganizationsOptions,
  "pagination"
>
export type FirstOrganizationOptions = Omit<
  ListOrganizationsOptions,
  "pagination"
>

export interface GetOrganizationOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const organization = await moysklad.organization.get("123", {
   *   expand: {
   *     owner: true,
   *     group: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<OrganizationModel>
}

export interface UpdateOrganizationOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const organization = await moysklad.organization.update("123", {...}, {
   *   expand: {
   *     owner: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<OrganizationModel>
}

/** Опции для создания или обновления юрлица */
export interface UpsertOrganizationOptions {
  /**
   * Замена ссылок объектами с помощью expand
   *
   * @example
   * ```ts
   * const organization = await moysklad.organization.upsert({...}, {
   *   expand: {
   *     owner: true,
   *   }
   * });
   * ```
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-zamena-ssylok-ob-ektami-s-pomosch-u-expand
   */
  expand?: ExpandOptions<OrganizationModel>
}

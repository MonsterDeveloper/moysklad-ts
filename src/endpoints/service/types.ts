import type {
  ArchivedFilter,
  Attribute,
  Barcodes,
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  Idable,
  IdFilter,
  Meta,
  Model,
  PriceType,
  StringFilter,
  TaxSystem,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/**
 * Признак предмета расчёта услуги.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi-atributy-suschnosti-priznak-predmeta-rascheta
 */
export enum ServicePaymentItemType {
  /** Услуга */
  Service = "SERVICE",

  /** Работа */
  Work = "WORK",

  /** Предоставление РИД */
  ProvidingRid = "PROVIDING_RID",

  /** Составной предмет расчета */
  CompoundPaymentItem = "COMPOUND_PAYMENT_ITEM",

  /** Иной предмет расчета */
  AnotherPaymentItem = "ANOTHER_PAYMENT_ITEM",
}

/**
 * Услуга
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi
 */
export interface Service extends Idable, Meta<Entity.Service> {
  /** ID учетной записи */
  readonly accountId: string

  /** Добавлена ли Услуга в архив */
  archived: boolean

  /** Коллекция доп. полей */
  attributes?: Attribute[]

  /**
   * Штрихкоды Услуги
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi-metadannye-uslug-shtrihkody
   * */
  barcodes?: Barcodes

  /**
   * Закупочная цена
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi-metadannye-uslug-zakupochnaq-cena
   */
  buyPrice?: {
    value: number
    currency: Meta<Entity.Currency>
  }

  /** Код Услуги */
  code?: string

  /** Описание Услуги */
  description?: string

  /** Признак запрета скидок */
  discountProhibited: boolean

  /** Реальный НДС % */
  readonly effectiveVat?: number

  /**
   * Дополнительный признак для определения разграничения реального НДС.
   *
   * - (`effectiveVat` = `0`, `effectiveVatEnabled` = `false`) -> "без НДС"
   * - (`effectiveVat` = `0`, `effectiveVatEnabled` = `true`) -> `0%`
   */
  readonly effectiveVatEnabled?: boolean

  /** Внешний код Услуги */
  externalCode: string

  /**
   * Метаданные массива Файлов.
   *
   * Максимальное количество файлов — 100
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
   */
  files?: unknown[] // TODO add files types & expand

  /** Метаданные отдела сотрудника */
  group: Meta<Entity.Group>

  /**
   * Минимальная цена.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi-metadannye-uslug-minimal-naq-cena
   */
  minPrice?: {
    value: number
    currency: Meta<Entity.Currency>
  }

  /** Наименование Услуги */
  name: string

  /** Метаданные владельца (Сотрудника) */
  owner?: Meta<Entity.Employee>

  /**
   * Наименование группы, в которую входит Услуга
   *
   * Атрибут `pathName` сам по себе является атрибутом только для чтения, однако его можно изменить с помощью обновления атрибута `productFolder`.
   */
  readonly pathName?: string

  /** Признак предмета расчета */
  paymentItemType?: ServicePaymentItemType

  /** Метаданные группы */
  productFolder?: Meta<Entity.ProductFolder> // TODO add product folder expand

  /**
   * Цены продажи
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-usluga-uslugi-metadannye-uslug-ceny-prodazhi
   */
  salePrices?: {
    value: number
    currency: Meta<Entity.Currency>
    priceType: PriceType
  }[]

  /** Общий доступ */
  shared: boolean

  /** ID синхронизации */
  readonly syncId?: string

  /** Код системы налогообложения */
  taxSystem?: TaxSystem

  /** Единицы измерения */
  uom?: Meta<Entity.Uom> // TODO add uom expand

  /** Момент последнего обновления сущности */
  readonly updated: DateTime

  /** Используется ли ставка НДС родительской группы */
  useParentVat: boolean

  /** НДС % */
  vat?: number

  /**
   * Включен ли НДС для услуги
   *
   * С помощью этого флага для услуги можно выставлять НДС = 0 или НДС = "без НДС":
   * - (`vat` = 0, `vatEnabled` = false) -> `vat` = "без НДС"
   * - (`vat` = 0, `vatEnabled` = true) -> `vat` = 0%
   */
  vatEnabled?: boolean
}

export interface ServiceModel extends Model {
  object: Service

  expandable: {
    group: GroupModel
    owner: EmployeeModel
  }

  requiredCreateFields: "name"

  filters: {
    id: IdFilter
    accountId: IdFilter
    archived: ArchivedFilter
    barcodes: StringFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    name: StringFilter
    owner: IdFilter
    pathName: StringFilter
    shared: BooleanFilter
    syncId: IdFilter
    updated: DateTimeFilter
  }
}

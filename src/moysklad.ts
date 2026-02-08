import type { ApiClient } from "./api-client"
import type {
  AssortmentEndpoint,
  BonusTransactionEndpoint,
  CounterpartyEndpoint,
  CustomEntityEndpoint,
  CustomerOrderEndpoint,
  DemandEndpoint,
  EnterEndpoint,
  FactureOutEndpoint,
  InventoryEndpoint,
  InvoiceOutEndpoint,
  OrganizationEndpoint,
  PaymentInEndpoint,
  PaymentOutEndpoint,
  ProcessingPlanEndpoint,
  ProductEndpoint,
  ProductFolderEndpoint,
  ProductionStageCompletionEndpoint,
  ProductionStageEndpoint,
  ProductionTaskEndpoint,
  PurchaseOrderEndpoint,
  RegionEndpoint,
  ReportEndpoint,
  SalesReturnEndpoint,
  SecurityEndpoint,
  SupplyEndpoint,
  VariantEndpoint,
  WizardEndpoint,
} from "./endpoints"

/** Клиент МойСклад */
export interface Moysklad {
  /**
   * API клиент
   *
   * {@linkcode ApiClient}
   */
  client: ApiClient

  /**
   * Бонусные операции
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq
   */
  bonusTransaction: BonusTransactionEndpoint

  /**
   * Безопасность (токены)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-autentifikaciq
   */
  security: SecurityEndpoint

  /**
   * Контрагенты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent
   */
  counterparty: CounterpartyEndpoint

  /**
   * Юрлица
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jurlico
   */
  organization: OrganizationEndpoint

  /**
   * Пользовательские справочники
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skij-sprawochnik
   */
  customEntity: CustomEntityEndpoint

  /**
   * Ассортимент
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment
   */
  assortment: AssortmentEndpoint

  /**
   * Заказы покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq
   */
  customerOrder: CustomerOrderEndpoint

  /**
   * Отгрузки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka
   */
  demand: DemandEndpoint

  /**
   * Счета-фактуры выданные
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-faktura-wydannyj
   */
  factureOut: FactureOutEndpoint

  /**
   * Приёмки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki
   */
  supply: SupplyEndpoint

  /**
   * Оприходования
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie
   */
  enter: EnterEndpoint

  /**
   * Товары
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar
   */
  product: ProductEndpoint

  /**
   * Группы товаров
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-towarow
   */
  productFolder: ProductFolderEndpoint

  /**
   * Техкарты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-tehkarty
   */
  processingPlan: ProcessingPlanEndpoint

  /**
   * Входящие платежи
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh
   */
  paymentIn: PaymentInEndpoint

  /**
   * Исходящие платежи
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
   */
  paymentOut: PaymentOutEndpoint

  /**
   * Счета покупателям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-scheta-pokupatelqm
   */
  invoiceOut: InvoiceOutEndpoint

  /**
   * Автозаполнение
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-awtozapolnenie
   */
  wizard: WizardEndpoint

  /**
   * Отчёты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety
   */
  report: ReportEndpoint

  /**
   * Заказ поставщику
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku
   */
  purchaseOrder: PurchaseOrderEndpoint

  /**
   * Регионы
   *
   * Справочник регионов России. Данный справочник предназначен только для чтения.
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region
   */
  region: RegionEndpoint

  /**
   * Производственные этапы
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie-proizwodstwennye-atapy
   */
  productionStage: ProductionStageEndpoint

  /**
   * Выполнения этапов производства
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa
   */
  productionStageCompletion: ProductionStageCompletionEndpoint

  /**
   * Инвентаризации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-inwentarizaciq
   */
  inventory: InventoryEndpoint

  /**
   * Производственные задания
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie
   */
  productionTask: ProductionTaskEndpoint

  /**
   * Модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq
   */
  variant: VariantEndpoint

  /**
   * Возвраты покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vozwrat-pokupatelq
   */
  salesReturn: SalesReturnEndpoint
}

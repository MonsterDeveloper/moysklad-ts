/* c8 ignore start */
import { ApiClient, type ApiClientOptions } from "./api-client";
import {
  BonusTransactionEndpoint,
  CounterpartyEndpoint,
  CustomerOrderEndpoint,
  DemandEndpoint,
  SecurityEndpoint,
  CustomEntityEndpoint,
  ProductEndpoint,
  VariantEndpoint,
  ReportEndpoint,
  WizardEndpoint,
  PaymentInEndpoint,
  PaymentOutEndpoint,
  InvoiceOutEndpoint,
  EnterEndpoint,
  SupplyEndpoint,
  ProcessingPlanEndpoint,
  ProductionStageCompletionEndpoint,
  ProductionTaskEndpoint,
  AssortmentEndpoint,
  PurchaseOrderEndpoint,
} from "./endpoints";

/**
 * Основной класс Moysklad
 *
 * @param options - Опции для создания экземпляра класса
 *
 * {@linkcode ApiClientOptions}
 */
export class Moysklad {
  /**
   * API клиент
   *
   * {@linkcode ApiClient}
   */
  public client: ApiClient;
  /**
   * Бонусные операции
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq
   */
  public bonusTransaction: BonusTransactionEndpoint;

  /**
   * Безопасность (токены)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-autentifikaciq
   */
  public security: SecurityEndpoint;

  /**
   * Отгрузки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-otgruzka
   */
  public demand: DemandEndpoint;

  /**
   * Контрагенты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-kontragent
   */
  public counterparty: CounterpartyEndpoint;

  /**
   * Заказы покупателей
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-pokupatelq
   */
  public customerOrder: CustomerOrderEndpoint;

  /**
   * Пользовательские справочники
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skij-sprawochnik
   */
  public customEntity: CustomEntityEndpoint;

  /**
   * Товары
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-towar
   */
  public product: ProductEndpoint;

  /**
   * Модификации
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-modifikaciq
   */
  public variant: VariantEndpoint;

  /**
   * Отчёты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/reports/#otchety
   */
  public report: ReportEndpoint;

  /**
   * Автозаполнение
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-awtozapolnenie
   */
  public wizard: WizardEndpoint;

  /**
   * Входящие платежи
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vhodqschij-platezh
   */
  public paymentIn: PaymentInEndpoint;

  /**
   * Исходящие платежи
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-ishodqschij-platezh-ishodqschie-platezhi
   */
  public paymentOut: PaymentOutEndpoint;

  /**
   * Счета покупателям
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-schet-pokupatelu-scheta-pokupatelqm
   */
  public invoiceOut: InvoiceOutEndpoint;

  /**
   * Оприходования
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-oprihodowanie
   */
  public enter: EnterEndpoint;

  /**
   * Приёмки
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-priemka-priemki
   */
  public supply: SupplyEndpoint;

  /**
   * Техкарты
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehkarta-tehkarty
   */
  public processingPlan: ProcessingPlanEndpoint;

  /**
   * Выполнения этапов производства
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-vypolnenie-atapa-proizwodstwa
   */
  public productionStageCompletion: ProductionStageCompletionEndpoint;

  /**
   * Производственные задания
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-proizwodstwennoe-zadanie
   */
  public productionTask: ProductionTaskEndpoint;

  /**
   * Ассортимент
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment
   */
  public assortment: AssortmentEndpoint;

  /**
   * Заказ поставщику
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-zakaz-postawschiku
   */
  public purchaseOrder: PurchaseOrderEndpoint;

  constructor(options: ApiClientOptions) {
    this.client = new ApiClient(options);
    this.bonusTransaction = new BonusTransactionEndpoint(this.client);
    this.security = new SecurityEndpoint(this.client);
    this.demand = new DemandEndpoint(this.client);
    this.counterparty = new CounterpartyEndpoint(this.client);
    this.customerOrder = new CustomerOrderEndpoint(this.client);
    this.customEntity = new CustomEntityEndpoint(this.client);
    this.product = new ProductEndpoint(this.client);
    this.variant = new VariantEndpoint(this.client);
    this.report = new ReportEndpoint(this.client);
    this.wizard = new WizardEndpoint(this.client);
    this.paymentIn = new PaymentInEndpoint(this.client);
    this.paymentOut = new PaymentOutEndpoint(this.client);
    this.invoiceOut = new InvoiceOutEndpoint(this.client);
    this.enter = new EnterEndpoint(this.client);
    this.supply = new SupplyEndpoint(this.client);
    this.processingPlan = new ProcessingPlanEndpoint(this.client);
    this.productionStageCompletion = new ProductionStageCompletionEndpoint(
      this.client,
    );
    this.productionTask = new ProductionTaskEndpoint(this.client);
    this.assortment = new AssortmentEndpoint(this.client);
    this.purchaseOrder = new PurchaseOrderEndpoint(this.client);
  }
}

/* c8 ignore stop */

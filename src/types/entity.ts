import type {
  BundleModel,
  ConsignmentModel,
  ProductModel,
  ServiceModel,
  VariantModel,
} from "../endpoints"

export enum Entity {
  Assortment = "assortment",
  AuditEvent = "auditevent",
  Account = "account",
  Demand = "demand",
  DemandPosition = "demandposition",
  Contract = "contract",
  Project = "project",
  SalesChannel = "saleschannel",
  Country = "country",
  Region = "region",
  FactureOut = "factureout",
  PaymentOut = "paymentout",
  PaymentIn = "paymentin",
  InvoiceOut = "invoiceout",
  Counterparty = "counterparty",
  CustomerOrder = "customerorder",
  CustomerOrderState = "customerorderstate",
  CustomerOrderPosition = "customerorderposition",
  PurchaseReturn = "purchasereturn",
  CommissionReportIn = "commissionreportin",
  RetailShift = "retailshift",
  Product = "product",
  Service = "service",
  Bundle = "bundle",
  BundleComponent = "bundlecomponent",
  Variant = "variant",
  Consignment = "consignment",
  ProcessingPlan = "processingplan",
  ProcessingPlanResult = "processingplanresult",
  ProcessingPlanMaterial = "processingplanmaterial",
  ProcessingPlanFolder = "processingplanfolder",
  ProcessingOrder = "processingorder",
  ProcessingOrderPosition = "processingorderposition",
  NamedFilter = "namedfilter",
  Files = "files",
  ProductFolder = "productfolder",
  AttributeMetadata = "attributemetadata",
  CustomEntityMetadata = "customentitymetadata",
  CustomEntity = "customentity",
  Store = "store",
  Organization = "organization",
  PurchaseOrder = "purchaseorder",
  PurchaseOrderPosition = "purchaseorderposition",
  Supply = "supply",
  Processing = "processing",
  ProcessingPositionResult = "processingpositionresult",
  ProcessingPositionMaterial = "processingpositionmaterial",
  ProductionTaskMaterial = "productiontaskmaterial",
  ProcessingProcess = "processingprocess",
  ProcessingStage = "processingstage",
  ProcessingProcessPosition = "processingprocessposition",
  ProcessingPlanStages = "processingplanstages",
  ProductionTask = "productiontask",
  ProductionRow = "productionrow",
  ProductionTaskResult = "productiontaskresult",
  ProductionStageCompletion = "productionstagecompletion",
  ProductionStage = "productionstage",
  ProductionStageCompletionMaterial = "productionstagecompletionmaterial",
  ProductionStageCompletionResult = "productionstagecompletionresult",
  State = "state",
  PriceType = "pricetype",
  Uom = "uom",
  Currency = "currency",
  BonusTransaction = "bonustransaction",
  BonusProgram = "bonusprogram",
  Employee = "employee",
  Group = "group",
  Image = "image",
  Stock = "stock",
  Enter = "enter",
  SalesReturn = "salesreturn",
  RetailSalesReturn = "retailsalesreturn",
  SalesByVariant = "salesbyvariant",
  Slot = "slot",
  ExpenseItem = "expenseitem",
  InvoicePosition = "invoiceposition",
  EnterPosition = "enterposition",
  SupplyPosition = "supplyposition",
  Inventory = "inventory",
  InventoryPosition = "inventoryposition",
  Loss = "loss",
  MoneyPlotSeries = "moneyplotseries",
  MoneyReport = "moneyreport",
  TurnoverAll = "turnover",
  TurnoverByStore = "turnoverbystore",
  TurnoverByOperation = "turnoverbyoperation",
  StockByStore = "stockbystore",
}

export type AssortmentEntity =
  | Entity.Product
  | Entity.Service
  | Entity.Bundle
  | Entity.Variant
  | Entity.Consignment

type AssortmentFields = {
  /** Остаток */
  readonly stock: number
  /** Резерв */
  readonly reserve: number
  /** Ожидание */
  readonly inTransit: number
  /** Доступно */
  readonly quantity: number
}

export type ProductAssortmentModel = ProductModel & {
  object: AssortmentFields
}
export type VariantAssortmentModel = VariantModel & {
  object: AssortmentFields
}
export type BundleAssortmentModel = BundleModel & { object: AssortmentFields }
export type ConsignmentAssortmentModel = ConsignmentModel & {
  object: AssortmentFields
}
export type ServiceAssortmentModel = ServiceModel & {
  object: AssortmentFields
}

/**
 * Ассортимент
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-assortiment
 */
export type AssortmentModel =
  | ProductAssortmentModel
  | VariantAssortmentModel
  | BundleAssortmentModel
  | ConsignmentAssortmentModel
  | ServiceAssortmentModel

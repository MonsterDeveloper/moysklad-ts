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
  FactureIn = "facturein",
  PaymentOut = "paymentout",
  PaymentIn = "paymentin",
  InvoiceOut = "invoiceout",
  InvoiceIn = "invoicein",
  Counterparty = "counterparty",
  CustomerOrder = "customerorder",
  CustomerOrderState = "customerorderstate",
  CustomerOrderPosition = "customerorderposition",
  PurchaseReturn = "purchasereturn",
  CommissionReportIn = "commissionreportin",
  CommissionReportOut = "commissionreportout",
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

/**
 * Корневые сущности, для которых можно составить метаданные по ID.
 *
 * Вложенные ресурсы в этот тип не входят, поскольку их URL требует ID
 * родительской сущности.
 */
export type RootEntity =
  | Entity.BonusProgram
  | Entity.BonusTransaction
  | Entity.Bundle
  | Entity.CommissionReportIn
  | Entity.CommissionReportOut
  | Entity.Consignment
  | Entity.Contract
  | Entity.Counterparty
  | Entity.Country
  | Entity.Currency
  | Entity.CustomerOrder
  | Entity.Demand
  | Entity.Employee
  | Entity.Enter
  | Entity.ExpenseItem
  | Entity.FactureIn
  | Entity.FactureOut
  | Entity.Group
  | Entity.Inventory
  | Entity.InvoiceIn
  | Entity.InvoiceOut
  | Entity.Loss
  | Entity.Organization
  | Entity.PaymentIn
  | Entity.PaymentOut
  | Entity.Processing
  | Entity.ProcessingOrder
  | Entity.ProcessingPlan
  | Entity.ProcessingPlanFolder
  | Entity.ProcessingProcess
  | Entity.ProcessingStage
  | Entity.Product
  | Entity.ProductFolder
  | Entity.ProductionStage
  | Entity.ProductionStageCompletion
  | Entity.ProductionTask
  | Entity.Project
  | Entity.PurchaseOrder
  | Entity.PurchaseReturn
  | Entity.Region
  | Entity.RetailSalesReturn
  | Entity.RetailShift
  | Entity.SalesChannel
  | Entity.SalesReturn
  | Entity.Service
  | Entity.Store
  | Entity.Supply
  | Entity.Uom
  | Entity.Variant

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

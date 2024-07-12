export enum Entity {
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
  Product = "product",
  Service = "service",
  Bundle = "bundle",
  Variant = "variant",
  Consignment = "consignment",
  ProcessingPlan = "processingplan",
  ProcessingPlanResult = "processingplanresult",
  ProcessingPlanMaterial = "processingplanmaterial",
  ProcessingOrder = "processingorder",
  ProcessingOrderPosition = "processingorderposition",
  NamedFilter = "namedfilter",
  ProductFolder = "productfolder",
  AttributeMetadata = "attributemetadata",
  CustomEntityMetadata = "customentitymetadata",
  CustomEntity = "customentity",
  Store = "store",
  Organization = "organization",
  PurchaseOrder = "purchaseorder",
  Supply = "supply",
  Processing = "processing",
  ProcessingPositionResult = "processingpositionresult",
  ProcessingPositionMaterial = "processingpositionmaterial",
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
}

export type AssortmentEntity =
  | Entity.Product
  | Entity.Service
  | Entity.Bundle
  | Entity.Variant;

import { Entity, type RootEntity } from "../types/entity"

const metadataOwners: Record<RootEntity, RootEntity> = {
  [Entity.BonusProgram]: Entity.BonusProgram,
  [Entity.BonusTransaction]: Entity.BonusTransaction,
  [Entity.Bundle]: Entity.Product,
  [Entity.CommissionReportIn]: Entity.CommissionReportIn,
  [Entity.CommissionReportOut]: Entity.CommissionReportOut,
  [Entity.Consignment]: Entity.Consignment,
  [Entity.Contract]: Entity.Contract,
  [Entity.Counterparty]: Entity.Counterparty,
  [Entity.Country]: Entity.Country,
  [Entity.Currency]: Entity.Currency,
  [Entity.CustomerOrder]: Entity.CustomerOrder,
  [Entity.Demand]: Entity.Demand,
  [Entity.Employee]: Entity.Employee,
  [Entity.Enter]: Entity.Enter,
  [Entity.ExpenseItem]: Entity.ExpenseItem,
  [Entity.FactureIn]: Entity.FactureIn,
  [Entity.FactureOut]: Entity.FactureOut,
  [Entity.Group]: Entity.Group,
  [Entity.Inventory]: Entity.Inventory,
  [Entity.InvoiceIn]: Entity.InvoiceIn,
  [Entity.InvoiceOut]: Entity.InvoiceOut,
  [Entity.Loss]: Entity.Loss,
  [Entity.Organization]: Entity.Organization,
  [Entity.PaymentIn]: Entity.PaymentIn,
  [Entity.PaymentOut]: Entity.PaymentOut,
  [Entity.Processing]: Entity.Processing,
  [Entity.ProcessingOrder]: Entity.ProcessingOrder,
  [Entity.ProcessingPlan]: Entity.ProcessingPlan,
  [Entity.ProcessingPlanFolder]: Entity.ProcessingPlanFolder,
  [Entity.ProcessingProcess]: Entity.ProcessingProcess,
  [Entity.ProcessingStage]: Entity.ProcessingStage,
  [Entity.Product]: Entity.Product,
  [Entity.ProductFolder]: Entity.ProductFolder,
  [Entity.ProductionStage]: Entity.ProductionStage,
  [Entity.ProductionStageCompletion]: Entity.ProductionStageCompletion,
  [Entity.ProductionTask]: Entity.ProductionTask,
  [Entity.Project]: Entity.Project,
  [Entity.PurchaseOrder]: Entity.PurchaseOrder,
  [Entity.PurchaseReturn]: Entity.PurchaseReturn,
  [Entity.Region]: Entity.Region,
  [Entity.RetailSalesReturn]: Entity.RetailSalesReturn,
  [Entity.RetailShift]: Entity.RetailShift,
  [Entity.SalesChannel]: Entity.SalesChannel,
  [Entity.SalesReturn]: Entity.SalesReturn,
  [Entity.Service]: Entity.Product,
  [Entity.Store]: Entity.Store,
  [Entity.Supply]: Entity.Supply,
  [Entity.Uom]: Entity.Uom,
  [Entity.Variant]: Entity.Variant,
}

export function isRootEntity(type: string): type is RootEntity {
  return Object.hasOwn(metadataOwners, type)
}

export function getMetadataOwner(type: RootEntity): RootEntity {
  return metadataOwners[type]
}

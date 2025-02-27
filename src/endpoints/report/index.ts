import type { ReportProfitEndpoint } from "./profit";
import type { ReportStockEndpoint } from "./stock";
import type { ReportMoneyEndpoint } from "./money";

export interface ReportEndpoint {
  stock: ReportStockEndpoint;
  profit: ReportProfitEndpoint;
  money: ReportMoneyEndpoint;
}

export * from "./profit";
export * from "./stock";
export * from "./money";

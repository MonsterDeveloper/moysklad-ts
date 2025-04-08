import type { ReportProfitEndpoint } from "./profit";
import type { ReportStockEndpoint } from "./stock";
import type { ReportMoneyEndpoint } from "./money";
import type { ReportTurnoverEndpoint } from "./turnover";

export interface ReportEndpoint {
  stock: ReportStockEndpoint;
  profit: ReportProfitEndpoint;
  money: ReportMoneyEndpoint;
  turnover: ReportTurnoverEndpoint;
}

export * from "./profit";
export * from "./stock";
export * from "./money";

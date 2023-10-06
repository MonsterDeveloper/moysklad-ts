import type { Meta } from "./metadata";
import type { Entity } from "./entity";

export interface DocumentRate {
  currency: Meta<Entity.Currency>; // TODO expand currency
  value?: number;
}

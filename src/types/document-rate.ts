import type { Entity } from "./entity"
import type { Meta } from "./metadata"

export interface DocumentRate {
  currency: Meta<Entity.Currency> // TODO expand currency
  value?: number
}

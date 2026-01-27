import type { Entity, Idable, Meta } from "."

export interface PriceType extends Idable, Meta<Entity.PriceType> {
  name: string
  externalCode: string
}

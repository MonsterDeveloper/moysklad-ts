import type { DateTime, Entity, Idable, Meta, Model } from "../../types"

export interface CustomEntity extends Idable, Meta<Entity.CustomEntity> {
  readonly accountId: string
  readonly updated: DateTime
  name: string
  externalCode: string
  owner?: Meta<Entity.Employee>
  shared: boolean
  group: Meta<Entity.Group>
}

export interface CustomEntityModel extends Model {
  object: CustomEntity
}

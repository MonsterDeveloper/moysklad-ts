import type { EmptyObject } from "type-fest"
import type { Entity, Idable, Meta, Model } from "../../types"

export interface Group extends Idable, Meta<Entity.Group> {
  readonly accountId: string
  index?: number
  name: string
}

export interface GroupModel extends Model {
  object: Group
  expandable: EmptyObject
}

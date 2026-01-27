import type { Entity } from "./entity"
import type { Meta } from "./metadata"
import type { Idable } from "./mixins"

export interface State extends Idable, Meta<Entity.State> {
  /** ID учетной записи */
  readonly accountId: string

  /** Название статуса */
  name: string

  /** Цвет статуса */
  color: number

  /** Тип статуса */
  stateType: "Regular" | "Successful" | "Unsuccessful"

  /** Тип сущности */
  entityType: string
}

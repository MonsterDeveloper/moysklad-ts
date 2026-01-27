import type {
  DateTime,
  Entity,
  Idable,
  ListMeta,
  Meta,
  Model,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"
import type { ProcessingStageModel } from "../processing-stage"

/**
 * Техпроцесс
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehprocess-tehprocessy
 */
export interface ProcessingProcess
  extends Idable,
    Meta<Entity.ProcessingProcess> {
  /** ID учетной записи */
  readonly accountId: string

  /** Добавлен ли Техпроцесс в архив */
  archived: boolean

  /** Комментарий Техпроцесса */
  description?: string

  /** Внешний код Техпроцесса */
  externalCode: string

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Наименование Техпроцесса */
  name: string

  /** Владелец (Сотрудник) */
  owner: Meta<Entity.Employee>

  /** Метаданные позиций Техпроцесса */
  positions: ListMeta<Entity.ProcessingProcessPosition>

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления сущности */
  readonly updated: DateTime
}

export interface ProcessingProcessModel extends Model {
  object: ProcessingProcess
  expandable: {
    group: GroupModel
    owner: EmployeeModel
  }
}

/**
 * Позиция техпроцесса
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-tehprocess-poluchit-pozicii-tehprocessa
 */
export interface ProcessingProcessPosition
  extends Idable,
    Meta<Entity.ProcessingProcessPosition> {
  /** ID учетной записи */
  readonly accountId: string

  /** Метаданные этапа, который представляет собой позиция */
  processingstage: Meta<Entity.ProcessingStage>
}

export interface ProcessingProcessPositionModel extends Model {
  object: ProcessingProcessPosition
  expandable: {
    processingstage: ProcessingStageModel
  }
}

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

/**
 * Этап производства
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-jetap-proizwodstwa
 */
export interface ProcessingStage extends Idable, Meta<Entity.ProcessingStage> {
  /** ID учетной записи */
  readonly accountId: string

  /** Признак доступности назначения на этап любого сотрудника */
  allPerformers: boolean

  /** Добавлен ли Этап в архив */
  archived: boolean

  /** Комментарий Этапа */
  description?: string

  /** Внешний код ЭтапаВнешний код Этапа */
  externalCode: string

  /** Отдел сотрудника */
  group: Meta<Entity.Group>

  /** Метаданные склада материалов */
  materialStore: Meta<Entity.Store>

  /** Наименование Этапа */
  name: string

  /** Владелец (Сотрудник) */
  owner: Meta<Entity.Employee>

  /** Метаданные возможных исполнителей */
  performers: ListMeta<Entity.Employee>

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления этапа */
  readonly updated: DateTime
}

export interface ProcessingStageModel extends Model {
  object: ProcessingStage
  expandable: {
    group: GroupModel
    owner: EmployeeModel
  }
}

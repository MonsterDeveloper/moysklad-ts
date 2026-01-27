import type { DateTime, Entity, Idable, Meta, Model } from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/** Группа техкарт
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-gruppa-tehkart
 */
export interface ProcessingPlanFolder
  extends Idable,
    Meta<Entity.ProcessingPlanFolder> {
  /** ID учётной записи */
  readonly accountId: string

  /** Добавлена ли Группа техкарт в архив */
  archived: boolean

  /** Внешний код Группы техкарт */
  externalCode: string

  /** Код Группы техкарт */
  code?: string

  /** Описание Группы техкарт */
  description?: string

  /** Метаданные отдела сотрудника */
  group: Meta<Entity.Group>

  /** Наименование Группы техкарт */
  name: string

  /** Владелец (Сотрудник) */
  owner: Meta<Entity.Employee>

  /** Наименование Группы техкарт, в которую входит данная Группа техкарт */
  readonly pathName: string

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления сущности */
  readonly updated: DateTime
}

export interface ProcessingPlanFolderModel extends Model {
  object: ProcessingPlanFolder
  expandable: {
    group: GroupModel
    owner: EmployeeModel
  }
}

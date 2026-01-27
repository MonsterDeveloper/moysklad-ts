import type { Attribute } from "./attribute"
import type { DateTime } from "./datetime"
import type { Entity } from "./entity"
import type {
  BooleanFilter,
  DateTimeFilter,
  IdFilter,
  StringFilter,
} from "./filters"
import type { Meta } from "./metadata"
import type { Idable } from "./mixins"
import type { Model } from "./model"

/**
 * Проект
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-proekt
 */
export interface Project extends Idable, Meta<Entity.Project> {
  /** ID учетной записи */
  readonly accountId: string

  /** Добавлен ли проект в архив */
  archived: boolean

  /** Коллекция дополнительных полей */
  attributes?: Attribute[]

  /** Код проекта */
  code?: string

  /** Описание проекта */
  description?: string

  /** Внешний код проекта */
  externalCode: string

  /** Метаданные отдела сотрудника */
  group: Meta<Entity.Group>

  /** Наименование проекта */
  name: string

  /** Метаданные владельца (Сотрудника) */
  owner?: Meta<Entity.Employee>

  /** Общий доступ */
  shared: boolean

  /** Момент последнего обновления проекта */
  readonly updated: DateTime
}

/**
 * Модель проекта
 *
 * {@linkcode Project}
 */
export interface ProjectModel extends Model {
  object: Project
  filters: {
    id: IdFilter
    accountId: IdFilter
    archived: BooleanFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    name: StringFilter
    owner: IdFilter
    shared: BooleanFilter
    updated: DateTimeFilter
  }
}

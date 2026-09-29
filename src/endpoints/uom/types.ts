import type {
  BooleanFilter,
  DateTime,
  DateTimeFilter,
  Entity,
  ExpandOptions,
  FilterOptions,
  Idable,
  IdFilter,
  Meta,
  Model,
  OrderOptions,
  PaginationOptions,
  StringFilter,
} from "../../types"
import type { EmployeeModel } from "../employee"
import type { GroupModel } from "../group"

/**
 * Единица измерения.
 *
 * Системные единицы не содержат полей учетной записи, владельца, отдела и
 * общего доступа, поэтому эти поля необязательны.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-edinica-izmereniq
 */
export interface Uom extends Idable, Meta<Entity.Uom> {
  /** ID учетной записи для пользовательской единицы */
  readonly accountId?: string
  /** Код единицы измерения */
  code?: string
  /** Описание единицы измерения */
  description?: string
  /** Внешний код единицы измерения */
  externalCode: string
  /** Отдел пользовательской единицы */
  group?: Meta<Entity.Group>
  /** Наименование единицы измерения */
  name: string
  /** Владелец пользовательской единицы */
  owner?: Meta<Entity.Employee>
  /** Общий доступ для пользовательской единицы */
  shared?: boolean
  /** Момент последнего обновления */
  readonly updated: DateTime
}

/** Модель единицы измерения. */
export interface UomModel extends Model {
  object: Uom
  expandable: {
    group: GroupModel
    owner: EmployeeModel
  }
  filters: {
    id: IdFilter
    accountId: IdFilter
    code: StringFilter
    description: StringFilter
    externalCode: StringFilter
    group: IdFilter
    name: StringFilter
    owner: IdFilter
    shared: BooleanFilter
    updated: DateTimeFilter
  }
  orderableFields:
    | "id"
    | "code"
    | "description"
    | "externalCode"
    | "name"
    | "updated"
}

/** Опции списка единиц измерения. */
export interface ListUomsOptions {
  /** Опции пагинации */
  pagination?: PaginationOptions
  /** Опции раскрытия владельца и отдела */
  expand?: ExpandOptions<UomModel>
  /** Опции сортировки */
  order?: OrderOptions<UomModel>
  /** Строка контекстного поиска */
  search?: string
  /** Опции фильтрации */
  filter?: FilterOptions<UomModel>
}

/** Опции получения всех единиц измерения. */
export type AllUomsOptions = Omit<ListUomsOptions, "pagination">

/** Опции получения первой единицы измерения. */
export type FirstUomOptions = Omit<ListUomsOptions, "pagination">

/** Опции получения единицы измерения по ID. */
export interface GetUomOptions {
  /** Опции раскрытия владельца и отдела */
  expand?: ExpandOptions<UomModel>
}

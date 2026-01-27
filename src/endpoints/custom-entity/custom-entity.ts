import type { Entity, GetFindResult, ListResponse } from "../../types"
import type { CustomEntityModel } from "./types"

/**
 * Пользовательские справочники
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skij-sprawochnik
 */
export interface CustomEntityEndpoint {
  /**
   * Получить пользовательский справочник по id.
   *
   * @param id - id пользовательского справочника
   * @returns Объект с пользовательским справочником
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-pol-zowatel-skij-sprawochnik-poluchit-sprawochnik
   */
  get(
    id: string,
  ): Promise<
    ListResponse<GetFindResult<CustomEntityModel, false>, Entity.CustomEntity>
  >
}

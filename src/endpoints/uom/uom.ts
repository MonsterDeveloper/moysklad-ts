import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  ListMeta,
  ListResponse,
  Subset,
} from "../../types"
import type {
  AllUomsOptions,
  FirstUomOptions,
  GetUomOptions,
  ListUomsOptions,
  UomModel,
} from "./types"

/**
 * Единицы измерения. Справочник доступен для чтения через этот endpoint.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-edinica-izmereniq
 */
export interface UomEndpoint {
  /** Получить страницу единиц измерения. */
  list<T extends ListUomsOptions = Record<string, unknown>>(
    options?: Subset<T, ListUomsOptions>,
  ): Promise<ListResponse<GetFindResult<UomModel, T["expand"]>, Entity.Uom>>

  /** Получить все единицы измерения с автоматической пагинацией. */
  all<T extends AllUomsOptions = Record<string, unknown>>(
    options?: Subset<T, AllUomsOptions>,
  ): Promise<BatchGetResult<GetFindResult<UomModel, T["expand"]>, Entity.Uom>>

  /** Получить первую единицу измерения из списка. */
  first<T extends FirstUomOptions = Record<string, unknown>>(
    options?: Subset<T, FirstUomOptions>,
  ): Promise<ListResponse<GetFindResult<UomModel, T["expand"]>, Entity.Uom>>

  /** Получить количество единиц измерения с учётом фильтров. */
  size(options?: AllUomsOptions): Promise<ListMeta<Entity.Uom>>

  /**
   * Получить единицу измерения по ID.
   *
   * @param id - ID единицы измерения
   * @param options - Опции получения
   * @returns Единица измерения
   */
  get<T extends GetUomOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetUomOptions>,
  ): Promise<GetFindResult<UomModel, T["expand"]>>
}

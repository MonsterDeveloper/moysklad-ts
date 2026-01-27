import type {
  BatchGetResult,
  Entity,
  GetFindResult,
  ListMeta,
  ListResponse,
  Subset,
} from "../../types"
import type {
  AllRegionsOptions,
  FirstRegionOptions,
  GetRegionOptions,
  ListRegionsOptions,
  RegionModel,
} from "./types"

/**
 * Регионы
 *
 * Справочник регионов России. Данный справочник предназначен только для чтения.
 * Средствами JSON API можно запрашивать список регионов России и сведения по отдельным регионам.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region
 */
export interface RegionEndpoint {
  /**
   * Получить список регионов.
   *
   * Результат: Объект JSON, включающий в себя поля: meta, context, rows.
   * Возвращает список всех регионов России с пагинацией.
   *
   * @param options - Опции для получения списка {@linkcode ListRegionsOptions}
   * @returns Объект с списком регионов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-poluchit-regiony
   *
   * @example
   * ```ts
   * // Получить первые 25 регионов
   * const { rows } = await moysklad.region.list();
   *
   * // Получить регионы с фильтрацией по названию
   * const { rows } = await moysklad.region.list({
   *   filter: {
   *     name: { contains: "Москва" }
   *   }
   * });
   *
   * // Получить регионы с сортировкой по коду
   * const { rows } = await moysklad.region.list({
   *   order: { by: "code", direction: "asc" }
   * });
   * ```
   */
  list<T extends ListRegionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListRegionsOptions>,
  ): Promise<
    ListResponse<GetFindResult<RegionModel, T["expand"]>, Entity.Region>
  >

  /**
   * Получить все регионы.
   *
   * Получает полный список всех регионов России без пагинации.
   * Использует последовательные запросы для получения всех данных.
   *
   * @param options - Опции для получения списка {@linkcode AllRegionsOptions}
   * @returns Массив всех регионов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-poluchit-regiony
   *
   * @example
   * ```ts
   * // Получить все регионы России
   * const allRegions = await moysklad.region.all();
   * console.log(`Всего регионов: ${allRegions.length}`);
   *
   * // Получить все регионы с фильтрацией
   * const moscowRegions = await moysklad.region.all({
   *   filter: {
   *     name: { contains: "Москва" }
   *   }
   * });
   * ```
   */
  all<T extends AllRegionsOptions = Record<string, unknown>>(
    options?: Subset<T, AllRegionsOptions>,
  ): Promise<
    BatchGetResult<GetFindResult<RegionModel, T["expand"]>, Entity.Region>
  >

  /**
   * Получить первый регион из списка.
   *
   * Возвращает первый регион из отфильтрованного и отсортированного списка.
   * Удобно для поиска конкретного региона.
   *
   * @param options - Опции для получения списка {@linkcode FirstRegionOptions}
   * @returns Объект с первым регионом (с ограничением в 1 элемент)
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-poluchit-regiony
   *
   * @example
   * ```ts
   * // Найти первый регион по названию
   * const { rows } = await moysklad.region.first({
   *   filter: {
   *     name: { contains: "Москва" }
   *   }
   * });
   * const moscowRegion = rows[0];
   *
   * // Получить регион с наименьшим кодом
   * const { rows } = await moysklad.region.first({
   *   order: { by: "code", direction: "asc" }
   * });
   * ```
   */
  first<T extends FirstRegionOptions = Record<string, unknown>>(
    options?: Subset<T, FirstRegionOptions>,
  ): Promise<
    ListResponse<GetFindResult<RegionModel, T["expand"]>, Entity.Region>
  >

  /**
   * Получить регион по ID.
   *
   * Возвращает отдельный регион по его уникальному идентификатору.
   *
   * @param id - ID региона в формате UUID
   * @param options - Опции для получения региона {@linkcode GetRegionOptions}
   * @returns Регион
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-region-region
   *
   * @example
   * ```ts
   * // Получить регион по ID
   * const region = await moysklad.region.get("00000000-0000-0000-0000-000000000077");
   * console.log(`Регион: ${region.name}, код: ${region.code}`);
   * ```
   */
  get<T extends GetRegionOptions = Record<string, unknown>>(
    id: string,
    options?: Subset<T, GetRegionOptions>,
  ): Promise<GetFindResult<RegionModel, T["expand"]>>

  /**
   * Получить размер списка регионов.
   *
   * Возвращает количество регионов в системе с учетом примененных фильтров.
   * Полезно для подсчета общего количества регионов или для реализации пагинации.
   *
   * @param options - Опции для фильтрации {@linkcode AllRegionsOptions}
   * @returns Метаданные с информацией о количестве регионов
   *
   * @example
   * ```ts
   * // Получить общее количество регионов
   * const { size } = await moysklad.region.size();
   * console.log(`Всего регионов в России: ${size}`);
   *
   * // Получить количество регионов с определенным названием
   * const { size } = await moysklad.region.size({
   *   filter: {
   *     name: { contains: "область" }
   *   }
   * });
   * console.log(`Количество областей: ${size}`);
   * ```
   */
  size(options?: AllRegionsOptions): Promise<ListMeta<Entity.Region>>
}

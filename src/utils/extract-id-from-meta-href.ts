/**
 * Извлекает идентификатор сущности из meta.href.
 *
 * Meta.href в API МойСклад имеет формат:
 * `https://api.moysklad.ru/api/remap/1.2/entity/{type}/{id}` или
 * `https://api.moysklad.ru/api/remap/1.2/entity/{type}/{id}?expand=...`
 *
 * @param href - URL из поля meta.href сущности
 * @returns Идентификатор сущности (UUID) или undefined, если href не передан
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/#mojsklad-json-api-obschie-swedeniq-metadannye
 *
 * @example
 * ```ts
 * const href = "https://api.moysklad.ru/api/remap/1.2/entity/product/7944ef04-f831-11e5-7a69-971500188b19";
 * const id = extractIdFromMetaHref(href);
 * // id === "7944ef04-f831-11e5-7a69-971500188b19"
 * ```
 *
 * @example С query параметрами
 * ```ts
 * const href = "https://api.moysklad.ru/api/remap/1.2/entity/product/7944ef04-f831-11e5-7a69-971500188b19?expand=owner";
 * const id = extractIdFromMetaHref(href);
 * // id === "7944ef04-f831-11e5-7a69-971500188b19"
 * ```
 */
export function extractIdFromMetaHref<T extends string | undefined>(
  href: T,
): undefined extends T ? string | undefined : string {
  return href?.split("/").at(-1)?.split("?")[0] as never
}

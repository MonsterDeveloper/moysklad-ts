import type { AssortmentEntity } from "../types"

type AssortmentOfType<
  Assortment,
  T extends AssortmentEntity,
> = Assortment extends { meta: { type: T } } ? Assortment : never

/**
 * Проверяет, является ли ассортимент определенного типа.
 *
 * Поскольку TypeScript [пока не поддерживает сужение типа по вложенным полям](https://github.com/microsoft/TypeScript/issues/18758), эта функция сужает тип ассортимента на основе `metadata.type`.
 *
 * @param assortment Ассортимент
 * @param entity Тип сущности
 * @returns Является ли ассортимент определенного типа
 *
 * @example
 * ```ts
 * if (isAssortmentOfType(assortment, Entity.Service)) {
 *   // Теперь assortment имеет тип Service
 * }
 * ```
 */
export function isAssortmentOfType<
  Assortment extends { meta: { type: AssortmentEntity } },
  T extends AssortmentEntity,
>(
  assortment: Assortment,
  entity: T,
): assortment is AssortmentOfType<Assortment, T> {
  return assortment.meta.type === entity
}

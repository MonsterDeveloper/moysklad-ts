import type {
  AssortmentEntity,
  AssortmentModel,
  BundleAssortmentModel,
  ConsignmentAssortmentModel,
  Entity,
  ProductAssortmentModel,
  ServiceAssortmentModel,
  VariantAssortmentModel,
} from "../types"

type GetAssortmentObject<T extends AssortmentEntity> = T extends Entity.Variant
  ? VariantAssortmentModel["object"]
  : T extends Entity.Product
    ? ProductAssortmentModel["object"]
    : T extends Entity.Bundle
      ? BundleAssortmentModel["object"]
      : T extends Entity.Consignment
        ? ConsignmentAssortmentModel["object"]
        : T extends Entity.Service
          ? ServiceAssortmentModel["object"]
          : never

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
export function isAssortmentOfType<T extends AssortmentEntity>(
  assortment: AssortmentModel["object"],
  entity: T,
): assortment is GetAssortmentObject<T> {
  return assortment.meta.type === entity
}

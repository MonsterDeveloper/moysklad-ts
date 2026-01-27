import type { SetRequired } from "type-fest"
import {
  type AssortmentEntity,
  type DateTime,
  Entity,
  type Meta,
} from "../../types"

/**
 * Определяет какую информацию нужно заполнить: цены (`evaluate_price`), ндс (`evaluate_vat`), скидки (`evaluate_discount`) или себестоимость (`evaluate_cost`).
 */
export type WizardAction =
  | "evaluate_price"
  | "evaluate_discount"
  | "evaluate_vat"
  | "evaluate_cost"

interface BaseOptions<A extends WizardAction> {
  action: A
  /** Ссылка на юрлицо в формате Метаданных. Обязателен со значением `evaluate_vat` параметра `action` */
  organization: Meta<Entity.Organization>
  /** Ссылка на контрагента в формате Метаданных. Обязателен со значениями `evaluate_price`, `evaluate_discount` параметра `action` */
  agent: Meta<Entity.Counterparty>
  /** Учитывается ли НДС */
  vatEnabled: boolean
  /** Включен ли НДС в цену */
  vatIncluded?: boolean
  /** Валюта. Если не передано, заполняется валютой учета */
  rate: {
    currency: Meta<Entity.Currency>
  }
  /** Ссылка на склад в формате Метаданных. Обязателен со значением `evaluate_cost` параметра `action` */
  store: Meta<Entity.Store>
  /** Дата проведения документа. Влияет на расчет себестоимости */
  moment: DateTime
  /** Позиции документа */
  positions: {
    /** Ссылка на товар/услугу/серию/модификацию/комплект, которую представляет собой позиция, в формате Метаданных */
    assortment: Meta<AssortmentEntity>
    /** Количество товаров/услуг данного вида в позиции. Если позиция - товар, у которого включен учет по серийным номерам, то значение в этом поле всегда будет равно количеству серийных номеров для данной позиции в документе. */
    quantity?: number
  }[]
}

export const EntitiesActions = {
  [Entity.SalesReturn]: "evaluate_cost",
} as const

export type WizardOptions<A extends WizardAction = WizardAction> =
  A extends "evaluate_price"
    ? SetRequired<Partial<BaseOptions<A>>, "action" | "agent">
    : A extends "evaluate_discount"
      ? SetRequired<Partial<BaseOptions<A>>, "action" | "agent">
      : A extends "evaluate_vat"
        ? SetRequired<Partial<BaseOptions<A>>, "action" | "organization">
        : SetRequired<Partial<BaseOptions<A>>, "action" | "store">

export type WizardResult<A extends WizardAction> = A extends "evaluate_cost"
  ? {
      positions: {
        assortment: Meta<AssortmentEntity>
        cost: number
      }[]
    }
  : never

/**
 * Автозаполнение
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-awtozapolnenie
 */
export type WizardEndpoint = {
  [E in keyof typeof EntitiesActions]: (
    options: WizardOptions<(typeof EntitiesActions)[E]>,
  ) => Promise<WizardResult<(typeof EntitiesActions)[E]>>
}

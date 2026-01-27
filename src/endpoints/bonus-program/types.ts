import type { EmptyObject } from "type-fest"
import type { Entity, Idable, Meta, Model } from "../../types"

/**
 * Условия бонусных баллов
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-programma-bonusnye-programmy
 */
export enum WelcomeBonusMode {
  /** Приветственные баллы начисляются участиникам после регистрации в бонусной программе. */
  Registration = "REGISTRATION",

  /** Приветственные баллы начисляются участиникам бонусной программы после совершения первой покупки. */
  FirstPurchase = "FIRST_PURCHASE",
}

interface BaseBonusProgram extends Idable, Meta<Entity.BonusProgram> {
  readonly accountId: string
  active: boolean
  agentTags: string[]
  allAgents: boolean
  allProducts: boolean
  earnRateRoublesToPoint?: number
  earnWhileRedeeming: boolean
  maxPaidRatePercents?: number
  name?: string
  postponedBonusesDelayDays?: number
  spendRatePointsToRouble?: number
  welcomeBonusesEnabled: boolean
}

interface BonusProgramWithoutWelcomeBonuses extends BaseBonusProgram {
  welcomeBonusesEnabled: false
}

interface BonusProgramWithWelcomeBonuses extends BaseBonusProgram {
  welcomeBonusesEnabled: true
  welcomeBonusesMode: WelcomeBonusMode
  welcomeBonusesValue: number
}

/**
 * Бонусная программа
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-programma-bonusnye-programmy
 */
export type BonusProgram =
  | BonusProgramWithoutWelcomeBonuses
  | BonusProgramWithWelcomeBonuses

/**
 * Модель бонусной программы
 *
 * {@linkcode BonusProgram}
 */
export interface BonusProgramModel extends Model {
  object: BonusProgram
  expandable: EmptyObject
  filters: EmptyObject
}

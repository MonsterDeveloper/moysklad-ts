import type { Entity, Idable, Meta, Model } from "@/types";
import type { EmptyObject } from "type-fest";

export enum WelcomeBonusMode {
  Registration = "REGISTRATION",
  FirstPurchase = "FIRST_PURCHASE",
}

interface BaseBonusProgram extends Idable, Meta<Entity.BonusProgram> {
  readonly accountId: string;
  active: boolean;
  agentTags: string[];
  allAgents: boolean;
  allProducts: boolean;
  earnRateRoublesToPoint?: number;
  earnWhileRedeeming: boolean;
  maxPaidRatePercents?: number;
  name?: string;
  postponedBonusesDelayDays?: number;
  spendRatePointsToRouble?: number;
  welcomeBonusesEnabled: boolean;
}

interface BonusProgramWithoutWelcomeBonuses extends BaseBonusProgram {
  welcomeBonusesEnabled: false;
}

interface BonusProgramWithWelcomeBonuses extends BaseBonusProgram {
  welcomeBonusesEnabled: true;
  welcomeBonusesMode: WelcomeBonusMode;
  welcomeBonusesValue: number;
}

export type BonusProgram =
  | BonusProgramWithoutWelcomeBonuses
  | BonusProgramWithWelcomeBonuses;

export interface BonusProgramModel extends Model {
  object: BonusProgram;
  expandable: EmptyObject;
  filters: EmptyObject;
}

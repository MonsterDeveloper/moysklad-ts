import type { DateTime } from "./datetime"
import type { Entity } from "./entity"
import type { Meta } from "./metadata"
import type { Idable } from "./mixins"
import type { Model } from "./model"

/** Счёт юрлциа / контрагента */
export interface Account extends Idable, Meta<Entity.Account> {
  /** ID учетной записи */
  readonly accountId: string

  /** Номер счета */
  accountNumber: string

  /** Адрес банка */
  bankLocation?: string

  /** Наименование банка */
  bankName?: string

  /** БИК */
  bic?: string

  /** Корреспондентский счет */
  correspondentAccount?: string

  /** Является ли счет основным */
  isDefault: boolean

  /** Момент последнего обновления */
  readonly updated: DateTime
}

export interface AccountModel extends Model {
  object: Account
  requiredCreateFields: "accountNumber"
}

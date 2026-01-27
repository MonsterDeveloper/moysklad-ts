import type {
  DateTime,
  Entity,
  GreaterOrEqualsFilter,
  IdFilter,
  LessOrEqualsFilter,
  Meta,
  PaginationOptions,
} from "."

/**
 * Действие события аудита
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-tipy-sobytij
 */
export enum AuditEventType {
  /** Регистрация */
  Registration = "registration",
  /** Массовая операция */
  BulkOperation = "bulkoperation",
  /** Удаление публикации */
  ClosePublication = "closepublication",
  /** Создание сущностей */
  Create = "create",
  /** Удаление сущностей */
  Delete = "delete",
  /** Создание публикации */
  OpenPublication = "openpublication",
  /** Печать документа */
  Print = "print",
  /** Помещение в архив */
  PutToArchive = "puttoarchive",
  /** Помещение в корзину */
  PutToRecycleBin = "puttorecyclebin",
  /** Смена токена для Точки продаж */
  ReplaceToken = "replacetoken",
  /** Извлечение из архива */
  RestoreFromArchive = "restorefromarchive",
  /** Извлечение из корзины */
  RestoreFromRecycleBin = "restorefromrecyclebin",
  /** Отправка письма */
  SendEmailFromEntity = "sendemailfromentity",
  /** Изменение сущностей */
  Update = "update",
}

/**
 * Тип изменения
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-atributy-suschnosti
 */
export enum AuditEventSource {
  /** Регистрация аккаунта */
  Registration = "registration",
  /** Автоматическая очистка корзины */
  ClearRecycleBin = "clearrecyclebin",
  /** Объединение */
  Combine = "combine",
  /** Массовое создание */
  BulkCreate = "bulkcreate",
  /** Синхронизация с ИМ */
  Connectors = "connectors",
  /** Копирование */
  Copy = "copy",
  /** Отправка сообщения */
  EmailSend = "emailsend",
  /** Синхронизация с Эвотор */
  Evotor = "evotor",
  /** Экспорт */
  Export = "export",
  /** Экспорт в 1С Клиент ЭДО */
  ExportEdiClient1c = "exportediclient1c",
  /** Импорт */
  Import = "import",
  /** Импорт в 1С Клиент ЭДО */
  ImportEdiClient1c = "importediclient1c",
  /** JSON API (remap-1.0, remap-1.1, remap-1.2) */
  JsonApi = "jsonapi",
  /** Вход или выход из МоегоСклада */
  LoginLogout = "loginlogout",
  /** Phone API */
  Phone = "phone-1.0",
  /** POS API */
  PosApi = "posapi",
  /** REST API */
  RestApi = "restapi",
  /** Точка продаж */
  Retail = "retail",
  /** Работа со сценариями */
  Scriptor = "scriptor",
}

/**
 * Тип сущностей для настроек
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-atributy-suschnosti
 */
export enum AuditObjectType {
  /** Настройки сущностей */
  EntitySettings = "ENTITY_SETTINGS",
  /** Настройки состояний */
  StateSettings = "STATE_SETTINGS",
  /** Настройки шаблонов */
  TemplateSettings = "TEMPLATE_SETTINGS",
}

/**
 * Diff для события регистрации
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-format-polq-diff-sobytie-registracii
 */
export interface RegistrationAuditDiff {
  /** Название аккаунта */
  account: string
  /** Конфигурация аккаунта (страна) */
  country: string
}

/**
 * Diff для событий публикации документов
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-format-polq-diff-sobytiq-publikacii-dokumentow
 */
export interface PublicationAuditDiff {
  /** Название шаблона */
  templateName: string
  /** Ссылка на публикацию */
  publicationHref: string
}

/**
 * Diff для событий отправки писем
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-format-polq-diff-sobytiq-otprawki-pisem
 */
export interface EmailAuditDiff {
  /** Почта отправителя письма */
  senderEmail: string
  /** Почта получателя письма */
  targetEmail: string
  /** Тема письма */
  subjectEmail: string
  /** Текст письма */
  text: string
}

/**
 * Diff для событий удаления сущностей
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-format-polq-diff-sobytiq-udaleniq-suschnostej
 */
export type DeleteAuditDiff = Record<
  string,
  {
    /** Значение атрибута до удаления */
    oldValue: unknown
  }
>

/**
 * Diff для событий обновления сущностей, перемещения/восстановления из корзины, перемещение/восстановление из архива
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq-format-polq-diff-sobytiq-obnovleniq-suschnostej-peremescheniq-wosstanowleniq-iz-korziny-peremeschenie-wosstanowlenie-iz-arhiwa
 */
export type UpdateAuditDiff = Record<
  string,
  {
    /** Значение атрибута до обновления */
    oldValue: unknown
    /** Значение атрибута после обновления */
    newValue: unknown
  }
>

/**
 * Объединенный тип для всех возможных diff
 */
export type AuditDiff =
  | RegistrationAuditDiff
  | PublicationAuditDiff
  | EmailAuditDiff
  | DeleteAuditDiff
  | UpdateAuditDiff

/**
 * Базовое событие аудита
 */
interface BaseAuditEvent {
  /** Дополнительная информация о Событии */
  readonly additionalInfo?: string

  /** Метаданные контекста */
  readonly audit: Meta<Entity.AuditEvent>

  /**
   * Метаданные сущности.
   *
   * Не будет выводиться только для товаров, услуг, модификаций, комплектов удаленных до 20.08.2017
   */
  readonly entity?: Meta<Entity>

  /** Название сущности */
  readonly entityType: Entity

  /** Время создания события */
  readonly moment: DateTime

  /** Имя сущности */
  readonly name: string

  /** Количество измененных объектов */
  readonly objectCount?: number

  /**
   * Тип сущностей, с которыми связанно данное изменение.
   *
   * Поле присутствует только для `entityType` = `entitysettings` или `statesettings` или `templatesettings`
   *
   * {@linkcode AuditObjectType}
   */
  readonly objectType?: AuditObjectType

  /**
   * Тип изменения
   *
   * {@linkcode AuditEventSource}
   */
  readonly source: AuditEventSource

  /**
   * Был ли доступ произведен поддержкой от имени пользователя.
   *
   * Флаг отсутствует, если значение false
   */
  readonly supportAccess?: boolean

  /** Логин Сотрудника */
  readonly uid: string
}

/**
 * Событие аудита
 *
 * События аудита содержат подробную информацию о произошедших изменениях, например, изменение значения поля.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/audit/#audit-audit-sobytiq
 */
export type AuditEvent =
  | (BaseAuditEvent & {
      readonly eventType: AuditEventType.Registration
      readonly diff?: RegistrationAuditDiff
    })
  | (BaseAuditEvent & {
      readonly eventType:
        | AuditEventType.OpenPublication
        | AuditEventType.ClosePublication
      readonly diff?: PublicationAuditDiff
    })
  | (BaseAuditEvent & {
      readonly eventType: AuditEventType.SendEmailFromEntity
      readonly diff?: EmailAuditDiff
    })
  | (BaseAuditEvent & {
      readonly eventType: AuditEventType.Delete
      readonly diff?: DeleteAuditDiff
    })
  | (BaseAuditEvent & {
      readonly eventType:
        | AuditEventType.Update
        | AuditEventType.PutToArchive
        | AuditEventType.RestoreFromArchive
        | AuditEventType.PutToRecycleBin
        | AuditEventType.RestoreFromRecycleBin
      readonly diff?: UpdateAuditDiff
    })
  | (BaseAuditEvent & {
      readonly eventType:
        | AuditEventType.BulkOperation
        | AuditEventType.Create
        | AuditEventType.Print
        | AuditEventType.ReplaceToken
      readonly diff?: AuditDiff
    })

export interface GetAuditByEntityOptions {
  filter?: {
    moment?: Partial<
      GreaterOrEqualsFilter<DateTime> & LessOrEqualsFilter<DateTime>
    >
    /**
     * В качестве значения должен быть передан href сущности сотрудника. В отфильтрованную выборку попадут все сущности аудита, автором изменений которых является данный пользователь.
     */
    employee?: IdFilter

    /**
     * В качестве значения должен быть передан тип События, по которому должны быть отфильтрованы сущности аудита.
     */
    eventType?: AuditEventType
    /**
     * В качестве значения должен быть передан тип действия, по которому должны быть отфильтрованы сущности аудита.
     * Список возможных значений параметра:
     */
    source?: AuditEventSource
  }
  pagination?: PaginationOptions
}

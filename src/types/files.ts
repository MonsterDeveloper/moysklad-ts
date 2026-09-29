import type { Context } from "./context"
import type { DateTime } from "./datetime"
import type { Entity } from "./entity"
import type { Meta } from "./metadata"
import type { PaginationOptions } from "./pagination"

/**
 * Метаданные прикреплённого файла или его превью.
 *
 * В отличие от метаданных сущностей, файловые метаданные не содержат
 * `metadataHref`.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
 */
export interface AttachedFileMetadata {
  /** URL ресурса */
  href: string
  /** Тип ресурса */
  type: Entity.Files
  /** MIME-тип ресурса */
  mediaType: string
  /** URL скачивания файла или миниатюры */
  downloadHref?: string | null
}

/**
 * Файл, прикреплённый к операции, номенклатуре, задаче или контрагенту.
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly
 */
export interface AttachedFile {
  /** Метаданные файла */
  meta: AttachedFileMetadata & { downloadHref: string }
  /** Название файла */
  title: string
  /** Имя файла с расширением */
  filename: string
  /** Размер файла в байтах */
  size: number
  /** Время загрузки файла */
  created: DateTime
  /** Сотрудник, загрузивший файл */
  createdBy: Meta<Entity.Employee>
  /** Метаданные миниатюры изображения */
  miniature?: AttachedFileMetadata
  /** Метаданные уменьшенного изображения */
  tiny?: AttachedFileMetadata
}

/**
 * Файл для загрузки.
 *
 * Строка должна содержать данные в Base64. Байты клиент кодирует сам.
 */
export interface FileUpload {
  /** Имя файла с расширением */
  filename: string
  /** Base64-строка или байты файла */
  content: string | Uint8Array
}

/** Метаданные страницы со списком прикреплённых файлов. */
export interface FilesListMetadata extends AttachedFileMetadata {
  /** Общее количество файлов */
  size: number
  /** Лимит страницы */
  limit: number
  /** Смещение страницы */
  offset: number
  /** URL следующей страницы */
  nextHref?: string
  /** URL предыдущей страницы */
  previousHref?: string
}

/** Ответ со страницей прикреплённых файлов. */
export interface FilesListResponse {
  /** Контекст запроса */
  context: Context
  /** Метаданные страницы */
  meta: FilesListMetadata
  /** Прикреплённые файлы */
  rows: AttachedFile[]
}

/** Методы работы с файлами сущности. */
export interface FilesMethods {
  /**
   * Получить страницу прикреплённых файлов.
   *
   * @param id - ID сущности
   * @param options - Опции пагинации
   * @returns Страница прикреплённых файлов
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly-poluchit-spisok-fajlow-operacii-nomenklatury-zadachi-ili-kontragenta
   */
  listFiles(
    id: string,
    options?: { pagination?: PaginationOptions },
  ): Promise<FilesListResponse>

  /**
   * Добавить файлы к сущности.
   *
   * Клиент последовательно отправляет не более десяти файлов в запросе.
   * Пустой массив возвращает уже прикреплённые файлы. За один вызов можно
   * передать не более ста файлов.
   *
   * @param id - ID сущности
   * @param files - Файлы для загрузки
   * @returns Все файлы сущности после последнего запроса
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly-dobawit-fajly-k-operacii-nomenklature-ili-kontragentu
   */
  addFiles(id: string, files: FileUpload[]): Promise<AttachedFile[]>

  /**
   * Удалить прикреплённый файл.
   *
   * @param id - ID сущности
   * @param fileId - ID файла
   * @returns Пустой результат после успешного удаления
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-fajly-udalit-fajl
   */
  deleteFile(id: string, fileId: string): Promise<void>
}

import { MoyskladApiError, MoyskladError } from "../errors";
import type { Entity, Meta } from "../types";

/** Объект ошибки, возвращаемый API МойСклад
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/index.html#mojsklad-json-api-obschie-swedeniq-obrabotka-oshibok
 */
interface MoyskladApiErrorObject {
  /** Заголовок ошибки */
  error: string;

  /**
   * Код ошибки
   *
   * Если поле ничего не содержит, смотрите HTTP status code
   */
  code?: number;

  /** Параметр, на котором произошла ошибка */
  parameter?: string;

  /** Сообщение, прилагаемое к ошибке */
  error_message?: string;

  /** Ссылка на документацию с описанием полученной ошибки */
  moreInfo?: string;

  /** Строка JSON, на которой произошла ошибка */
  line?: number;

  /** Координата элемента в строке line, на котором произошла ошибка */
  column?: number;

  /**
   * Список метаданных зависимых сущностей или документов.
   *
   * Выводится при невозможности удаления сущности, документа, если имеются зависимости от удаляемой сущности, документа
   */
  dependencies?: Meta<Entity>[];

  /**
   * Метаданные сущности, документа на котором произошла ошибка
   */
  meta?: Meta<Entity>;
}

function isErrorObject(data: unknown): data is MoyskladApiErrorObject {
  return Boolean(
    typeof data === "object" &&
      data &&
      "error" in data &&
      typeof data.error === "string",
  );
}

function isErrorsObject(
  data: unknown,
): data is { errors: MoyskladApiErrorObject[] } {
  return Boolean(
    typeof data === "object" &&
      data &&
      "errors" in data &&
      Array.isArray(data.errors) &&
      data.errors.some((error) => isErrorObject(error)),
  );
}

function processErrorsObject(
  { errors: [error] }: { errors: MoyskladApiErrorObject[] },
  response: Response,
): void {
  throw new MoyskladApiError(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error!.error,
    response,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error!.code,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error!.moreInfo,
  );
}

export async function handleError(response: Response): Promise<never> {
  if (!response.headers.has("Content-Type"))
    throw new MoyskladError("Response has no Content-Type header", response);

  if (!response.headers.get("Content-Type")?.includes("application/json"))
    throw new MoyskladError(
      "Response Content-Type is not application/json",
      response,
    );

  const text = await response.clone().text();

  if (!text || text.length === 0)
    throw new MoyskladError("Response body is empty", response);

  const data: unknown = JSON.parse(text);

  if (Array.isArray(data) && data.length > 0) {
    const errorsObject = data.find((error) => isErrorsObject(error));

    if (!errorsObject) {
      throw new MoyskladError(
        `HTTP ${response.status} ${response.statusText} (${JSON.stringify(data)})`,
        response,
      );
    }

    processErrorsObject(errorsObject, response);
  } else if (isErrorsObject(data)) {
    processErrorsObject(data, response);
  }

  throw new MoyskladError(
    `HTTP ${response.status} ${response.statusText}`,
    response,
  );
}

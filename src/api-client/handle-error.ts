import { MoyskladApiError, MoyskladError } from "../errors";

function processErrorsObject(data: unknown, response: Response): void {
  if (
    typeof data === "object" &&
    data &&
    "errors" in data &&
    Array.isArray(data.errors)
  ) {
    const error: unknown = data.errors.at(0);

    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      typeof error.code === "number" &&
      "error" in error &&
      typeof error.error === "string" &&
      "moreInfo" in error &&
      typeof error.moreInfo === "string"
    )
      throw new MoyskladApiError(
        error.error,
        error.code,
        error.moreInfo,
        response,
      );
  }
}

export async function handleError(response: Response): Promise<never> {
  if (!response.headers.has("Content-Type"))
    throw new MoyskladError("Response has no Content-Type header", response);

  if (!response.headers.get("Content-Type")?.includes("application/json"))
    throw new MoyskladError(
      "Response Content-Type is not application/json",
      response,
    );

  const text = await response.text();

  if (!text) throw new MoyskladError("Response body is empty", response);

  const data: unknown = JSON.parse(text);

  if (Array.isArray(data) && data.length > 0) {
    processErrorsObject(data.at(0), response);
  } else {
    processErrorsObject(data, response);
  }

  throw new MoyskladError(
    `HTTP ${response.status} ${response.statusText}`,
    response,
  );
}

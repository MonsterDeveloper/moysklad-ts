import { MoyskladApiError, MoyskladError } from "@/errors";

export async function handleError(response: Response): Promise<never> {
  if (!response.headers.has("Content-Type"))
    throw new MoyskladError(
      "Response has no Content-Type header",
      response.status,
    );

  if (!response.headers.get("Content-Type")?.includes("application/json"))
    throw new MoyskladError(
      "Response Content-Type is not application/json",
      response.status,
    );

  const text = await response.text();

  if (!text) throw new MoyskladError("Response body is empty", response.status);

  const data: unknown = JSON.parse(text);

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
        response.status,
        error.code,
        error.moreInfo,
      );
  }

  throw new MoyskladError(
    `HTTP ${response.status} ${response.statusText}`,
    response.status,
  );
}

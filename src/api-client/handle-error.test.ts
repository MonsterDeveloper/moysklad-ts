import { describe, expect, it } from "vitest"
import { MoyskladApiError, MoyskladError } from "../errors"
import { handleError } from "./handle-error"

describe("handleError", () => {
  it("should throw a MoyskladError if the response has no Content-Type header", async () => {
    const response = new Response(undefined, { status: 400 })
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladError("Response has no Content-Type header", response),
    )
  })

  it("throws a MoyskladError if the response Content-Type is not application/json", async () => {
    const response = new Response(undefined, {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    })
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladError(
        "Response Content-Type is not application/json",
        response,
      ),
    )
  })

  it("throws a MoyskladApiError if the response contains an errors array with at least one error object", async () => {
    const response = new Response(
      JSON.stringify({
        errors: [
          {
            code: 123,
            error: "Some error message",
            moreInfo: "https://example.com",
          },
        ],
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    )
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladApiError(
        "Some error message",
        response,
        123,
        "https://example.com",
      ),
    )
  })

  it("throws a MoyskladApiError if the response is an array", async () => {
    const response = new Response(
      JSON.stringify([
        {
          errors: [
            {
              error:
                "Ошибка валидации сохраняемого объекта: 'Нельзя списать товар, которого нет на складе'",
              code: 3007,
              moreInfo: "https://dev.moysklad.ru/doc/api/remap/1.2/#error_3007",
            },
          ],
        },
      ]),
      {
        status: 412,
        headers: { "Content-Type": "application/json" },
      },
    )
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladApiError(
        "Ошибка валидации сохраняемого объекта: 'Нельзя списать товар, которого нет на складе'",
        response,
        3007,
        "https://dev.moysklad.ru/doc/api/remap/1.2/#error_3007",
      ),
    )
  })

  it("throws a MoyskladApiError if the response contains an array with at least one error object", async () => {
    const response = new Response(
      JSON.stringify([
        {
          meta: {},
          name: "",
        },
        {
          errors: [
            {
              error:
                "Ошибка валидации сохраняемого объекта: 'Нельзя списать товар, которого нет на складе'",
              code: 3007,
              moreInfo: "https://dev.moysklad.ru/doc/api/remap/1.2/#error_3007",
            },
          ],
        },
      ]),
      {
        status: 412,
        headers: { "Content-Type": "application/json" },
      },
    )
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladApiError(
        "Ошибка валидации сохраняемого объекта: 'Нельзя списать товар, которого нет на складе'",
        response,
        3007,
        "https://dev.moysklad.ru/doc/api/remap/1.2/#error_3007",
      ),
    )
  })

  it("throws a MoyskladError when the response body is empty but Content-Type is application/json", async () => {
    const response = new Response("", {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladError("Response body is empty", response),
    )
  })

  it("should throw a MoyskladError with the HTTP status and statusText if none of the above conditions are met", async () => {
    const response = new Response(JSON.stringify({}), {
      status: 400,
      statusText: "Bad Request",
      headers: { "Content-Type": "application/json" },
    })
    await expect(handleError(response)).rejects.toThrow(
      new MoyskladError("HTTP 400 Bad Request", response),
    )
  })
})

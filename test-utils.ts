/** biome-ignore-all lint/suspicious/noMisplacedAssertion: these utils will be called in test files */
import { expect, vi } from "vitest"
import { createMoysklad } from "./src/proxy"

export function createFetchMock(isListResponse = false) {
  return vi
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve(
        new Response(
          JSON.stringify(
            isListResponse ? { meta: { size: 50 }, rows: [] } : {},
          ),
        ),
      ),
    )
}

const BASE_URL = "https://test-api.moysklad.ru/api/remap/1.2"

export const moysklad = createMoysklad({
  auth: {
    token: "123",
  },
  baseUrl: BASE_URL,
})

export function expectFetch({
  url,
  method = "GET",
  body,
  searchParameters = {},
  fetchMock,
}: {
  url: string
  method?: RequestInit["method"]
  body?: object
  searchParameters?: Record<string, string>
  fetchMock: ReturnType<typeof createFetchMock>
}) {
  const expectedUrl = new URL(BASE_URL + url, BASE_URL)

  const callUrl = new URL(fetchMock.mock.calls[0]?.[0] as string)
  const callBody = fetchMock.mock.calls[0]?.[1]?.body
  const callBodyJson = callBody ? JSON.parse(callBody as string) : undefined

  expect(callUrl.pathname).toBe(expectedUrl.pathname)
  expect(callUrl.hostname).toBe(expectedUrl.hostname)
  expect(Object.fromEntries(callUrl.searchParams.entries())).toEqual(
    searchParameters,
  )

  expect(callBodyJson).toEqual(body)

  expect(fetchMock).toHaveBeenCalledWith(
    expect.any(String), // already checked above
    expect.objectContaining({
      method,
    }),
  )
}

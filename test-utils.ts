import { vi, expect } from "vitest";
import { createMoysklad } from "./src/proxy";

export function createFetchMock() {
  return vi
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({}))),
    );
}

const BASE_URL = "https://test-api.moysklad.ru/api/remap/1.2";

export const moysklad = createMoysklad({
  auth: {
    token: "123",
  },
  baseUrl: BASE_URL,
});

export function expectFetch({
  url,
  method = "GET",
  body,
  searchParameters = {},
  fetchMock,
}: {
  url: string;
  method?: RequestInit["method"];
  body?: Record<string, unknown>;
  searchParameters?: Record<string, string>;
  fetchMock: ReturnType<typeof createFetchMock>;
}) {
  const expectedUrl = new URL(BASE_URL + url, BASE_URL);

  for (const [key, value] of Object.entries(searchParameters)) {
    expectedUrl.searchParams.set(key, value);
  }

  expect(fetchMock).toHaveBeenCalledWith(
    expectedUrl.toString(),
    expect.objectContaining({
      method,
      ...(body && { body: JSON.stringify(body) }),
    }),
  );
}

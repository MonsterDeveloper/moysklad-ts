import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";

const MOYSKLAD_BASE_URL = "https://api.moysklad.ru/api/remap/1.2";

export const restHandlers = [
  rest.all(MOYSKLAD_BASE_URL, (_, response, context) => {
    return response(
      context.status(200),
      context.json({ moysklad: "default api endpoint" }),
    );
  }),
  rest.get("https://example.com/api", (_, response, context) => {
    return response(context.status(200), context.json({ example: "api" }));
  }),
  rest.post(`${MOYSKLAD_BASE_URL}/security/token`, (_, response, context) =>
    response(context.json({ access_token: "supersecret" })),
  ),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

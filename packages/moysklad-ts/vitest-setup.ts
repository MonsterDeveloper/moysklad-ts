import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import mocks from "./mocks";

const server = setupServer(...mocks);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

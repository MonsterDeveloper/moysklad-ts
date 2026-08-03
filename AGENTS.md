# Project Info
You're working on `moysklad-ts` NPM library—a TypeScript wrapper for MoySklad (МойСклад) ERP.

Tooling:
- TypeScript
- Bun
- Vitest
- Biome

## Structure
```sh
.
├── src
│   ├── api-client # API client responsible for making HTTP requests
│   ├── endpoints # Types for endpoints
│   ├── errors.ts # Error classes
│   ├── index.ts # Main entrypoint
│   ├── moysklad.ts # Moysklad class definition
│   ├── proxy.test.ts
│   ├── proxy.ts # createMoysklad proxy responsible for converting method chains to HTTP requests
│   ├── types # Common types
│   └── utils
├── test-utils.ts # Test utilities
```

## Architecture

The library is a **proxy-based TypeScript wrapper** that converts method chains into HTTP requests. The key insight: endpoint files contain **only types** — all runtime behavior lives in the proxy.

### How it works

```ts
const moysklad = createMoysklad({ auth: { token: "..." } });
await moysklad.bonusTransaction.list({ filter: { bonusValue: 100 } });
//          ↑ endpoint          ↑ method    ↑ options
```

1. **`createMoysklad`** (`src/proxy.ts`) creates an `ApiClient` and wraps it in a JavaScript `Proxy`
2. Property accesses (e.g., `bonusTransaction`) are tracked in a path array
3. When a method is called (e.g., `list()`), the proxy interprets the path and method name to build the HTTP request
4. The method name determines the HTTP verb and URL pattern:
   - `list` → `GET /entity/{endpoint}`
   - `get(id)` → `GET /entity/{endpoint}/{id}`
   - `create(data)` → `POST /entity/{endpoint}`
   - `update(id, data)` → `PUT /entity/{endpoint}/{id}`
   - `delete(id)` → `DELETE /entity/{endpoint}/{id}`
   - `all` → batch GET with pagination
   - etc.

### Type-only endpoints

Endpoint files in `src/endpoints/` define:
- **Endpoint interface** (e.g., `BonusTransactionEndpoint`) — method signatures with full type inference
- **Model types** (e.g., `BonusTransactionModel`) — shape of the entity
- **Options types** — parameters for each method

These interfaces are never implemented — they only exist to provide TypeScript with type information. The `Moysklad` interface in `src/moysklad.ts` combines all endpoint interfaces.

### Adding a new endpoint

Each endpoint lives in `src/endpoints/{endpoint-name}/` with these files:
```
src/endpoints/{endpoint-name}/
├── index.ts               # Re-exports: endpoint interface + `* from "./types"`
├── {endpoint-name}.ts     # Endpoint interface with method signatures
├── {endpoint-name}.test.ts # Tests for the endpoint
└── types.ts               # Models, options types, enums
```

Steps:
1. Create `types.ts` with the model type and options for each method
2. Create `{endpoint-name}.ts` with the endpoint interface
3. Create `{endpoint-name}.test.ts` with tests (see Writing Tests section)
4. Create `index.ts` to re-export
5. Add export to `src/endpoints/index.ts`
6. Add the endpoint property to `Moysklad` interface in `src/moysklad.ts`
7. If the endpoint has non-standard behavior, add handling in `src/proxy.ts`

For endpoints with list methods, always include these utility methods:
- `list()` — paginated list with options
- `all()` — fetches all items across pages
- `size()` — returns only the count
- `first()` — returns the first matching item

Write extensive JSDoc for all methods and types (see Coding Style section).

## Scripts
Run Biome (linter & formatter), typechecks and tests as a final step of your edits (all from the project root):
- Running Biome on all files and autofix: `bun check`
- Run typechecks and type-tests: `bun typecheck`
- Running tests: `bun run test`
- Running single test file: `bun run test <file>.ts` (from the specific package/app directory)
- You can combine commands, e.g. `bun check && bun typecheck && bun run test`
- Do NOT install the dependencies (i.e. `bun add`) unless explicitly asked to. Usually the dependencies are already installed.

## Coding Style
- Use English for all code and variables, but Russian for JSDoc
- Always declare the type of each variable and function (parameters and return value)
- Don't use `any`
- Don't create unnecessary types
- Use JSDoc to document public classes, methods, and enums (and their values)
Use single-line JSDoc for simple values and multi-line for something more complex, for instance:
```ts
/**
 * Условия бонусных баллов
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-programma-bonusnye-programmy
 */
export enum WelcomeBonusMode {
  /** Приветственные баллы начисляются участиникам после регистрации в бонусной программе. */
  Registration = "REGISTRATION",

  /** Приветственные баллы начисляются участиникам бонусной программы после совершения первой покупки. */
  FirstPurchase = "FIRST_PURCHASE",
}
```

Include the `@see` tags with placeholders for links for a human coder to fill in. Don't hallucinate the links.

The first paragraph of a JSDoc comment is the most important. It is a summary of the symbol and is shown in tooltips, auto-completions in your editor, and is indexed by search. The first paragraph should be a concise description of the symbol, and should be written in a way that helps users quickly understand what this function does.

Don't include types in JSDoc, as TypeScript already handles them well.

Use tags like `@see`, `@example`, `@param`, and `@returns` where neccessary. Link the related code using the `{@linkcode SymbolName}` tag.
```ts
/**
 * Бонусные операции
 *
 * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-bonusnye-operacii
 */
export interface BonusTransactionEndpoint {
  /**
   * Получить список бонусных операций.
   *
   * @param options - Опции для получения списка {@linkcode ListBonusTransactionsOptions}
   * @returns Объект с списком бонусных операций
   *
   * @see https://dev.moysklad.ru/doc/api/remap/1.2/dictionaries/#suschnosti-bonusnaq-operaciq-poluchit-bonusnye-operacii
   *
   * @example
   * ```ts
   * const { rows } = await moysklad.bonusTransaction.list();
   * ```
   */
  list<T extends ListBonusTransactionsOptions = Record<string, unknown>>(
    options?: Subset<T, ListBonusTransactionsOptions>,
  ): Promise<
    ListResponse<
      GetFindResult<BonusTransactionModel, T["expand"]>,
      Entity.BonusTransaction
    >
  >;
}
```
- Use only relative imports without file extensions for `.ts` files

## Writing Tests
- Use `{ moysklad, createFetchMock, expectFetch }` from `test-utils` file (.ts) from the root of the project to access common testing utilities.
- Use `it()` for unit tests
- Use concise naming for test cases. Avoid filler words like `should`. Instead, simply use the verb in present tense, e.g. `it("makes a request")`.
- Group the related tests using `describe`
- Don't write flaky tests
- Follow best practices for writing clean and maintainable tests
- Make sure to thoroughly test each method or function
- If you encounter type errors when defining the arguments outside of the function call, try using `as const` to narrow the types down. If the error persists, use `as never` when passing an argument to the function but only as a last resort.

Example test:
```ts
import { describe, it } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { StockAllCurrentStockType } from "./stock";

describe("report", () => {
  it("handles profit by variant requests", async () => {
    const fetchMock = createFetchMock();

    await moysklad.report.profit.byVariant({
      momentFrom: "0",
      momentTo: "1",
    });

    expectFetch({
      fetchMock,
      url: "/report/profit/byvariant",
      method: "GET",
      searchParameters: {
        momentFrom: "0",
        momentTo: "1",
      },
    });
  });

  describe("money", () => {
    it("handles money plot series requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.money.plotSeries({
        momentFrom: "0",
        momentTo: "1",
        interval: "day",
      });

      expectFetch({
        fetchMock,
        url: "/report/money/plotseries",
        method: "GET",
        searchParameters: {
          momentFrom: "0",
          momentTo: "1",
          interval: "day",
        },
      });
    });

    it("handles money by account requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.money.byAccount();

      expectFetch({
        fetchMock,
        url: "/report/money/byaccount",
        method: "GET",
      });
    });
  });

  describe("stock", () => {
    it("handles stock all requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.stock.all({
        groupBy: "variant",
      });

      expectFetch({
        fetchMock,
        url: "/report/stock/all",
        method: "GET",
        searchParameters: {
          groupBy: "variant",
        },
      });
    });

    it("handles stock all current requests", async () => {
      const fetchMock = createFetchMock();

      await moysklad.report.stock.allCurrent({
        stockType: StockAllCurrentStockType.FreeStock,
      });

      expectFetch({
        fetchMock,
        url: "/report/stock/all/current",
        method: "GET",
        searchParameters: {
          stockType: "freeStock",
        },
      });
    });
  });
});
```

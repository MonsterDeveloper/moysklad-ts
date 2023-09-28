import { describe, it, expect } from "vitest";
import { composeSearchParameters } from "./compose-search-parameters";

describe("composeSearchParameters", () => {
  it("should return undefined if no pagination options are provided", () => {
    expect(composeSearchParameters({})).toBeUndefined();
  });

  it("should return a URLSearchParams object with 'limit' parameter if 'limit' is provided in pagination options", () => {
    const pagination = { limit: 10 };
    const searchParameters = composeSearchParameters({ pagination });
    expect(searchParameters?.get("limit")).toBe("10");
  });

  it("should return a URLSearchParams object with 'offset' parameter if 'offset' is provided in pagination options", () => {
    const pagination = { offset: 20 };
    const searchParameters = composeSearchParameters({ pagination });
    expect(searchParameters?.get("offset")).toBe("20");
  });

  it("should return a URLSearchParams object with both 'limit' and 'offset' parameters if both are provided in pagination options", () => {
    const pagination = { limit: 10, offset: 20 };
    const searchParameters = composeSearchParameters({ pagination });
    expect(searchParameters?.get("limit")).toBe("10");
    expect(searchParameters?.get("offset")).toBe("20");
  });
});

import { describe, expect, it } from "vitest"
import { composeDateTime } from "./compose-datetime"

describe("composeDateTime", () => {
  it("should return a formatted date string", () => {
    const date = new Date("2022-01-01T00:00:00.000Z")
    const result = composeDateTime(date)
    expect(result).toBe("2022-01-01 03:00:00")
  })

  it("should include milliseconds if shouldIncludeMs is true", () => {
    const date = new Date("2023-10-10T00:00:00.123Z")
    const result = composeDateTime(date, true)
    expect(result).toBe("2023-10-10 03:00:00.123")
  })

  it("should return a formatted date string from milliseconds", () => {
    const date = new Date("2022-01-01T00:00:00.123Z")
    const result = composeDateTime(date.getTime(), true)
    expect(result).toBe("2022-01-01 03:00:00.123")
  })
})

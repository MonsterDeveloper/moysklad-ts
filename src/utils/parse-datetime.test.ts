import { describe, expect, it } from "vitest"
import { parseDateTime } from "./parse-datetime"

describe("parseDateTime", () => {
  it("should parse a valid date-time string with milliseconds", () => {
    const dateTimeString = "2017-04-08 13:33:00.123"
    const expectedDate = new Date("2017-04-08T13:33:00.123+03:00")

    expect(parseDateTime(dateTimeString)).toEqual(expectedDate)
  })

  it("should parse a valid date-time string without milliseconds", () => {
    const dateTimeString = "2017-04-08 13:33:00"
    const expectedDate = new Date("2017-04-08T13:33:00+03:00")

    expect(parseDateTime(dateTimeString)).toEqual(expectedDate)
  })

  it("should throw an error for an invalid date-time string", () => {
    const dateTimeString = "invalid-date-time-string"

    expect(() => parseDateTime(dateTimeString)).toThrowError(
      `Incorrect DateTime format "${dateTimeString}"`,
    )
  })
})

import type { DateTime } from "../types"

// https://regex101.com/r/Bxq7dZ/2
const MOYSKLAD_DATE_TIME_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/

function rightPad2(value: string) {
  return `${value}00`.slice(0, 3)
}

/**
 * Parses a string representation of a date and time in Moysklad format.
 * @param dateTime A string representation of a date and time ("2017-04-08 13:33:00.123").
 * @returns A Date object representing the parsed date and time.
 * @throws An error if the input string is not in the correct format.
 */
export function parseDateTime(dateTime: DateTime): Date {
  // 2017-04-08 13:33:00.123
  const m = MOYSKLAD_DATE_TIME_REGEX.exec(dateTime)
  if (!m || m.length < 7 || m.length > 8) {
    throw new Error(`Incorrect DateTime format "${dateTime}"`)
  }

  const dateTimeExpression = `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}${
    m[7] && Number.parseInt(m[7], 10) !== 0 ? `.${rightPad2(m[7])}` : ""
  }+03:00`

  return new Date(dateTimeExpression)
}

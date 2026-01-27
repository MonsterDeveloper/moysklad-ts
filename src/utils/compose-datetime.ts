import type { DateTime } from "../types"

// Moysklad timezone (Moscow / UTC +3)
const MOSCOW_TIMEZONE_MS = +3 * 60 * 60 * 1000

function leftPad1(value: number) {
  return `0${value}`.slice(-2)
}

function leftPad2(value: number) {
  return `00${value}`.slice(-3)
}

/**
 * Composes a datetime string in the format "YYYY-MM-DD HH:mm:ss.SSS".
 * @param date - The date or milliseconds (`Date.getTime()`) to compose the string from.
 * @param shouldIncludeMs - Whether to include milliseconds in the string.
 * @returns The composed datetime string.
 */
export function composeDateTime(
  date: Date | number,
  shouldIncludeMs = false,
): DateTime {
  const moscowTime = new Date(+date + MOSCOW_TIMEZONE_MS)

  // 2000-01-01 01:00:00.123
  return [
    moscowTime.getUTCFullYear(),
    "-",
    leftPad1(moscowTime.getUTCMonth() + 1),
    "-",
    leftPad1(moscowTime.getUTCDate()),
    " ",
    leftPad1(moscowTime.getUTCHours()),
    ":",
    leftPad1(moscowTime.getUTCMinutes()),
    ":",
    leftPad1(moscowTime.getUTCSeconds()),
    shouldIncludeMs ? `.${leftPad2(moscowTime.getUTCMilliseconds())}` : "",
  ].join("")
}

import { describe, expect, it } from "vitest"
import { batchPromises } from "./batch-promises"

describe("batchPromises", () => {
  it("should yield empty array for empty input", async () => {
    const concurrencyLimit = 5
    const generator = batchPromises([], concurrencyLimit)

    const result = await generator.next()
    expect(result.value).toEqual([])
  })

  it("should yield all results for single batch", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
    ]
    const concurrencyLimit = 5
    const generator = batchPromises(tasks, concurrencyLimit)

    const result = await generator.next()
    expect(result.value).toEqual([1, 2, 3])
  })

  it("should yield results for multiple batches", async () => {
    const tasks = [
      () => Promise.resolve(1),
      () => Promise.resolve(2),
      () => Promise.resolve(3),
      () => Promise.resolve(4),
      () => Promise.resolve(5),
    ]
    const concurrencyLimit = 2
    const generator = batchPromises(tasks, concurrencyLimit)

    const result = []

    for await (const value of generator) {
      result.push(...value)
    }

    expect(result).toEqual([1, 2, 3, 4, 5])
  })
})

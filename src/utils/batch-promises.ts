/**
 * Executes an array of promises in batches with a concurrency limit.
 * @param tasks An array of tasks to execute.
 * @param concurrencyLimit The maximum number of tasks to execute concurrently.
 * @returns An async generator that yields the results of each batch of promises.
 */
export async function* batchPromises(
  tasks: (() => Promise<unknown>)[],
  concurrencyLimit: number,
) {
  if (tasks.length === 0) {
    return []
  }

  for (let index = 0; index < tasks.length; index += concurrencyLimit) {
    const batch = tasks.slice(index, index + concurrencyLimit)

    const result = await Promise.all(batch.map((task) => task()))

    yield result
  }
}

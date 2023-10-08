/**
 * Executes an array of promises in batches with a concurrency limit.
 * @param promises An array of promises to execute.
 * @param concurrencyLimit The maximum number of promises to execute concurrently.
 * @returns An async generator that yields the results of each batch of promises.
 */
export async function* batchPromises(
  promises: Promise<unknown>[],
  concurrencyLimit: number,
) {
  if (promises.length === 0) return [];

  for (
    let index = 0;
    index < promises.length;
    index = index + concurrencyLimit
  ) {
    const batch = promises.slice(index, index + concurrencyLimit);

    const result = await Promise.all(batch);

    yield result;
  }
}

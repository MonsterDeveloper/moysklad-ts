/**
 * From `T` pick properties that exist in `U`. Simple version of Intersection.
 */
export type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never
}

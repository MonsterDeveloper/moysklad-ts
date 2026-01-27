export type MatchArrayType<TInput, TOutput> =
  // biome-ignore lint/suspicious/noExplicitAny: just checking if it's an array
  TInput extends any[] ? TOutput[] : TOutput

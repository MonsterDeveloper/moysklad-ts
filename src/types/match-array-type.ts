export type MatchArrayType<TInput, TOutput> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput extends Array<any> ? TOutput[] : TOutput;

export type setArg<S> = S | ((prev: S) => S)
export type setFnArg<S> = (next: setArg<S>) => void
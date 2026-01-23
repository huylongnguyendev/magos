import type { setArg, setFnArg } from "../types/box.type.js"
import type { IBox } from "../types/store.type.js"

export function createBox<S, A>(
  initialState: S,
  actionFactory: (set: setFnArg<S>) => A
): IBox<S, A> {

  if (initialState === undefined)
    throw new Error("[Telar]: initialState is required (including null, 0, or false).")

  if (typeof initialState === "object"
    && initialState !== null
    && !Array.isArray(initialState)
    && Object.keys(initialState).length === 0
  )
    throw new Error("[Telar]: initialState cannot be an empty object {}.")


  if (typeof actionFactory !== "function")
    throw new Error("[Telar]: actionFactory must be a function. Example: (set) => ({ ... })")

  let state = initialState
  const listeners = new Set<() => void>()

  const set = (next: setArg<S>) => {
    const newState = typeof next === "function" ?
      (next as (prev: S) => S)(state)
      : next

    if (newState === undefined) {
      throw new Error("[Telar]: Cannot update state to undefined.");
    }

    if (!Object.is(state, newState)) {
      state = newState
      listeners.forEach(listener => listener())
    }
  }

  const actions = actionFactory(set)

  const subscribe = (callback: () => void) => {
    listeners.add(callback)
    return () => { listeners.delete(callback) }
  }

  return {
    getState: () => state,
    actions,
    subscribe
  }
}
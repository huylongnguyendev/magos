/**
 * Creates a Mago box - a reactive state container with actions.
 * * @param initialState - The starting state. Cannot be undefined, an empty object, or contain functions.
 * @param actionFactory - A function that receives `set` and returns an object of actions.
 * @returns A strictly-typed IBox containing state, actions, and a subscription method.
 * * @throws {Error} If initialState is invalid (undefined, {}, or contains functions).
 * @throws {Error} If actionFactory is not a function.
 * * @example
 * const counterBox = createBox(0, (set) => ({
 * inc: () => set(prev => prev + 1),
 * reset: () => set(0)
 * }));
 */

import type { setArg, setFnArg } from "../types/box.type.js"
import type { IBox } from "../types/store.type.js"
let boxCount = 0

export function createBox<S, A>(
  initialState: S,
  actionFactory: (set: setFnArg<S>) => A
): IBox<S, A> {
  const id = `box${++boxCount}-${Math.random().toString(36).substring(2, 9)}`

  if (initialState === undefined)
    throw new Error("[Magos]: initialState is required (including null, 0, or false).")

  if (typeof initialState === "object"
    && initialState !== null
    && !Array.isArray(initialState)
  ) {
    const values = Object.values(initialState)
    if (values.length === 0) {
      throw new Error("[Magos]: initialState cannot be an empty object {}.")
    } else {
      for (const value of values) {
        if (typeof value === "function")
          throw new Error("[Magos]: initialState cannot is an object containing a function value.")
      }
    }
  }

  if (typeof actionFactory !== "function")
    throw new Error("[Magos]: actionFactory must be a function. Example: (set) => ({ ... })")

  let state = initialState
  const listeners = new Set<(state: S) => void>()

  const set = (next: setArg<S>) => {
    const newState = typeof next === "function" ?
      (next as (prev: S) => S)(state)
      : next

    if (newState === undefined) {
      throw new Error("[Magos]: Cannot update state to undefined.");
    }

    if (!Object.is(state, newState)) {
      state = newState
      listeners.forEach(listener => listener(state))
    }
  }

  const actions = actionFactory(set)

  const subscribe = (callback: (state: S) => void) => {
    listeners.add(callback)
    return () => { listeners.delete(callback) }
  }

  return {
    getState: () => state,
    actions,
    subscribe,
    mago_id: id
  }
}
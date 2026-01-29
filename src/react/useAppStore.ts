/**
 * Custom hook to connect a Mago box to a React component.
 * * @param box - The Mago box instance to subscribe to.
 * Passing a newly created box on every render will cause infinite re-renders.
 * * @returns A tuple [state, actions] that stays in sync with the Mago box.
 * * @example
 * const [count, actions] = useAppStore(counterBox);
 */

import { useSyncExternalStore } from "react"
import type { IBox } from "../types/store.type.js"

export function useAppStore<S, A>(box: IBox<S, A>): [S, A] {
  const state = useSyncExternalStore(
    box.subscribe,
    box.getState,
    box.getState
  )

  return [state, box.actions] as const
}
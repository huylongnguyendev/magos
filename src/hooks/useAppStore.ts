import { useSyncExternalStore } from "react"
import type { IBox } from "../types/store.type.js"

export function useAppStore<S, A>(box: IBox<S, A>): [S, A] {
  const state = useSyncExternalStore(
    box.subscribe,
    box.getState,
    () => box.getState()
  )

  return [state, box.actions]
}
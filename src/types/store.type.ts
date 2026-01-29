export interface IBox<S = unknown, A = unknown> {
  getState: () => S
  actions: A
  subscribe: (callback: (state: S) => void) => () => void
  mago_id: string
}
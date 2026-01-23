export interface IBox<S = unknown, A = unknown> {
  getState: () => S
  actions: A
  subscribe: (callback: () => void) => () => void
}

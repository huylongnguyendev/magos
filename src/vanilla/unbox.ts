/**
 * Unboxes the Mago store and automatically synchronizes data with the UI.
 * * @param box - The Mago box (store) containing your state and actions.
 * @param target - A CSS selector string, an HTMLElement, or a collection of elements to be updated.
 * @param selector - A function to pick a specific piece of state, e.g., (s) => s.value.
 * * @returns A tuple containing the current [state, actions].
 * * @example
 * const [state, actions] = unbox(counterBox, '.count', s => s.val)
 */

import { TargetType } from "../types/element.type.js"
import { IBox } from "../types/store.type.js"

function middlewareParser(targets: TargetType) {
  if (targets instanceof HTMLElement) {
    return [targets]
  }

  const els = Array.from(targets as Iterable<Element>)

  const hashTrash = els.some(el => !(el instanceof HTMLElement))

  if (hashTrash)
    throw new Error("[Magos]: The `typeof` `targets` must be string | HTMLElement | HTMLElement[] | NodeListOf<Element> | ArrayLike<Element> | HTMLCollection")

  return els as HTMLElement[]
}

export function unbox<S, A>(
  box: IBox<S, A>,
  targets: TargetType,
  selector: (state: S) => any = (state: S) => state,
) {

  const elements = middlewareParser(targets)

  function updateUI() {
    const state = box.getState()
    const value = selector(state)

    let stringValue: string

    if (value === undefined || value === null) {
      console.warn("The `state` probably has `undefined` or `null` value.")
      stringValue = ""
    } else stringValue = value
      
    elements.forEach(el => {
      if (!(el instanceof HTMLElement)) return
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        if (el.value !== String(stringValue)) el.value = stringValue
      } else {
        if (el.textContent !== String(stringValue)) el.textContent = stringValue
      }
    })
  }

  const unsubscribe = box.subscribe(updateUI)
  updateUI()

  return [box.getState(), box.actions, unsubscribe]
}
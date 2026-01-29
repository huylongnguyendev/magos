/**
 * Creates a centralized Mago store by combining multiple boxes.
 * It ensures each box is unique within the store to prevent state conflicts.
 * * @param boxes - An object where keys are names and values are Mago boxes created via `createBox`.
 * @returns The same boxes object if all validations pass.
 * @throws {Error} If a box is assigned to multiple keys (detected via `mago_id`).
 * * @example
 * const store = createStore({
 * auth: authBox,
 * theme: themeBox
 * });
 */

import type { IBox } from "../types/store.type.js"

export const createStore = <T extends Record<string, IBox>>(boxes: T): T => {
  const registerById = new Map<string, string>()

  if (typeof boxes === "object"
    && typeof boxes !== "function"
    && Object.keys(boxes).length === 0
  ) console.warn("[Magos]: If you create the store, you should 'put' the boxes in to the store.")

  for (const [key, box] of Object.entries(boxes)) {
    const existingKey = registerById.get(box.mago_id)

    if (existingKey)
      throw new Error(`[Magos]: Conflict. The box you are trying to assign to "${key}" is already used by "${existingKey}".`)
    registerById.set(box.mago_id, key)
  }
  return boxes
}
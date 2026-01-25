import type { IBox } from "../types/store.type.js"

export const createStore = <T extends Record<string, IBox>>(boxes: T): T => {
  const registerById = new Map<string, string>()

  for (const [key, box] of Object.entries(boxes)) {
    const existingKey = registerById.get(box.telar_id)

    if (existingKey)
      throw new Error(`[Telar]: Conflict. The box you are trying to assign to "${key}" is already used by "${existingKey}".`)
    registerById.set(box.telar_id, key)
  }
  return boxes
}
import type { IBox } from "../types/store.type.js"

export const createStore = <T extends Record<string, IBox>>(boxes: T): T => boxes
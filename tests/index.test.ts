import { describe, it, expect, vi } from "vitest"
import { createBox } from "../src/core/telar-create-box"


describe("createBox Logic", () => {
  it("Initial new state", () => {
    const box = createBox(10, () => ({}))
    expect(box.getState()).toBe(10)
  })

  it("Update state using actions", () => {
    const box = createBox(0, (set) => ({
      inc: () => set(prev => prev + 1)
    }))
    box.actions.inc()
    expect(box.getState()).toBe(1)
  })

  it("Notic for listeners when asleast one state changed", () => {
    const box = createBox(0, (set) => ({
      update: () => set(1)
    }))

    const callback = vi.fn() // Tạo hàm giả để theo dõi
    box.subscribe(callback)

    box.actions.update()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("Shouldn't call listener if state's value wasn't change (Object.is)", () => {
    const box = createBox(0, (set) => ({
      update: () => set(0) // Set cùng giá trị
    }))

    const callback = vi.fn()
    box.subscribe(callback)

    box.actions.update()
    expect(callback).not.toHaveBeenCalled()
  })
})
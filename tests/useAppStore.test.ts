/**
 * @vitest-environment jsdom
 */
import { renderHook, act } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { createBox } from "../src/telar/core/telar-create-box"
import { useAppStore } from "../src/telar/hooks/useAppStore"

describe("useAppStore Hook", () => {
  it("Re-render when state's value changed", () => {
    const box = createBox({ count: 0 }, (set) => ({
      inc: () => set(prev => ({ count: prev.count + 1 }))
    }))

    const { result } = renderHook(() => useAppStore(box))

    // Ban đầu
    expect(result.current[0].count).toBe(0)

    // Thực hiện hành động (phải bọc trong act để React cập nhật UI)
    act(() => {
      result.current[1].inc()
    })

    expect(result.current[0].count).toBe(1)
  })
})
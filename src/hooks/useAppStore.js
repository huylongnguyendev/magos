import { useSyncExternalStore } from "react";
export function useAppStore(box) {
    const state = useSyncExternalStore(box.subscribe, box.getState, () => box.getState());
    return [state, box.actions];
}
//# sourceMappingURL=useAppStore.js.map
export function createBox(initialState, actionFactory) {
    if (initialState === undefined)
        throw new Error("[Telar]: initialState is required (including null, 0, or false).");
    if (typeof initialState === "object"
        && initialState !== null
        && !Array.isArray(initialState)
        && Object.keys(initialState).length === 0)
        throw new Error("[Telar]: initialState cannot be an empty object {}.");
    if (typeof actionFactory !== "function")
        throw new Error("[Telar]: actionFactory must be a function. Example: (set) => ({ ... })");
    let state = initialState;
    const listeners = new Set();
    const set = (next) => {
        const newState = typeof next === "function" ?
            next(state)
            : next;
        if (newState === undefined) {
            throw new Error("[Telar]: Cannot update state to undefined.");
        }
        if (!Object.is(state, newState)) {
            state = newState;
            listeners.forEach(listener => listener());
        }
    };
    const actions = actionFactory(set);
    const subscribe = (callback) => {
        listeners.add(callback);
        return () => { listeners.delete(callback); };
    };
    return {
        getState: () => state,
        actions,
        subscribe
    };
}
//# sourceMappingURL=telar-create-box.js.map
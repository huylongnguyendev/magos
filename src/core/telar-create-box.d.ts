import type { setFnArg } from "../types/box.type.js";
import type { IBox } from "../types/store.type.js";
export declare function createBox<S, A>(initialState: S, actionFactory: (set: setFnArg<S>) => A): IBox<S, A>;
//# sourceMappingURL=telar-create-box.d.ts.map
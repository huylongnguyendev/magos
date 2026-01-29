# Magos

![Magos Logo](https://github.com/huylongnguyendev/magos/blob/main/assets/logo-mago-40.png)

A lightweight, strictly-typed state management library for React and Vanilla JS,
 built with a focus on data integrity and developer experience.

Unlike other libraries that allow "empty" or "undefined" states to creep into
 your logic, Magos enforces strict rules at the core level to prevent common
 frontend bugs before they happen.

## ✨ Key Features

* 🛡️ **Zero-Empty-Object Policy**: Prevents initializing or updating state with an empty object {}.

* 🚫 **Serializable Integrity**: Blocks functions within the state to ensure data
 remains clean and predictable.

* ⚛️ **React 18 Ready**: Uses useSyncExternalStore for tear-free, synchronized
 rendering in Concurrent Mode.

* 🍦 **Vanilla Support**: Effortless DOM synchronization via unbox without any
 framework overhead.

* 🕵️ **Conflict Detection**: Built-in ID tracking (magos_id) prevents accidental
 duplicate box registration in your store.

* 🧊 **Type Safe**: Deep TypeScript integration with zero-config type inference.

---
### 📥 Installation

```bash
npm install magos-react
# or
yarn add magos-react
```

---

### 🚀 Quick Start

1. **Create a Box**

  Define your state and actions. Magos will warn you if you try to pass invalid
 state patterns.

```js
import { createBox } from 'magos-react';

// Full support for primitives and non-empty objects
export const counterBox = createBox(0, (set) => ({
  inc: () => set(prev => prev + 1),
  reset: () => set(0)
}));
```

2. **Connect to React**

No Providers needed. Just hook it up and go.

```js
import { useAppStore } from 'magos-react/react';
import { counterBox } from './store';

function Counter() {
  const [count, actions] = useAppStore(counterBox);

  return <button onClick={actions.inc}>{count}</button>;
}
```

3. **Use in Vanilla JS**

Sync your state directly to the UI with automatic cleanup support.

```js
import { unbox } from 'magos-react/vanilla';
import { counterBox } from './store';

const el = document.querySelector('#counter');
const [state, actions, unsubscribe] = unbox(counterBox, el);
```

---

#### ⚖️ The Magos Philosophy

Magos is built on the belief that State should be meaningful. 1. No undefined
 updates: State must always have a value (null, 0, and false are fine). 2. No
 empty objects: If you have an object, it should have data. {} is often a sign
 of uninitialized or missing data. 3. Reference Stability: Actions are generated
 once and remain stable, preventing unnecessary re-renders.

---

##### 📖 API Reference

`createBox(initialState, actionFactory)`
Creates a reactive state container.

  **Validation**: Warns/Throws on undefined, {}, or functions within the state object.

`createStore(boxes)`
Combines multiple boxes into a central registry.

  **Validation**: Ensures every box is unique via internal magos_id.

`useAppStore(box)`
A React hook for synchronized state access.

`unbox(box, targets, selector?)`
Synchronizes state with one or more HTML elements.

---

📜 License
MIT

👤 Author
Nguyen Huy Long

# Telar

A lightweight, strictly-typed state management library for React,
 built with a focus on data integrity and developer experience.

Unlike other libraries that allow "empty" or "undefined" states to creep into
 your logic, Telar enforces strict rules at the core level
 to prevent common frontend bugs.

## Key Features

- **Zero-Empty-Object Policy**: Prevents initializing or updating state with an
 empty object {}.
- **Primitive Support**: Full support for string, number, boolean, null, and arrays.
- **React 18 Ready**: Uses `useSyncExternalStore` for tear-free, synchronized rendering.
- **Type Safe**: Deep TypeScript integration with zero-config type inference.
- **Minimalist**: No boilerplate. No complex providers. Just boxes.

## Installation

```bash
npm install telar
# or
yarn add telar

License
MIT

Author
Nguyen Huy Long

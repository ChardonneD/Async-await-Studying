# Async-await-Studying

Practice exercises for JavaScript asynchronous programming patterns:
**Promises**, **`.then()` chaining**, and **`async`/`await`**.

---

## Files

| File | Description |
|------|-------------|
| `promises.js` | Promise fundamentals and `.then()` / `.catch()` / `.finally()` chaining |
| `async-await.js` | `async` functions, `await`, and `try/catch` error handling |
| `combined.js` | Side-by-side comparison and interoperability of all three patterns |

---

## Running the exercises

Requires **Node.js** (v12 or later).

```bash
# Run all patterns together
node combined.js

# Run only Promise / .then() exercises
node promises.js

# Run only async / await exercises
node async-await.js
```

Or use the npm scripts:

```bash
npm start           # runs combined.js
npm run promises    # runs promises.js
npm run async-await # runs async-await.js
```

---

## Key concepts covered

### Promises & `.then()`
- Creating a `Promise` with `resolve` / `reject`
- `.then()` for handling resolved values
- `.catch()` for handling rejected values / errors
- Chaining `.then()` calls to transform data step-by-step
- `Promise.all()` – run promises in parallel, wait for all
- `Promise.race()` – resolve/reject with the first settled promise
- `.finally()` – cleanup that runs regardless of outcome

### `async` / `await`
- Declaring an `async` function (always returns a Promise)
- `await` to pause execution until a Promise settles
- `try / catch / finally` for synchronous-style error handling
- Sequential vs parallel execution (`await` one-by-one vs `Promise.all`)

### Mixing patterns
- Calling `.then()` on the Promise returned by an `async` function
- Using `await` on a Promise produced by a `.then()` chain
- Error propagation across both styles

# Async-await-Studying

A set of hands-on exercises to learn the `async` / `await` pattern in JavaScript.  
Each file contains a small program with **one intentional bug**. Your job is to find and fix it.

---

## Exercises

| File | Bug to fix |
|------|-----------|
| `exercise1-missing-await.js` | A `Promise` is used as-is instead of being awaited |
| `exercise2-missing-async.js` | `await` is used inside a function that isn't marked `async` |
| `exercise3-missing-try-catch.js` | A rejected promise is unhandled — add a `try/catch` |
| `exercise4-sequential-vs-parallel.js` | Two independent promises are awaited one after another — use `Promise.all()` |
| `exercise5-async-return-value.js` | The result of an `async` function is not awaited by its caller |

---

## How to run an exercise

```bash
node exercise1-missing-await.js
```

If the output doesn't match the expected output shown in the file's comment, find the bug and fix it, then run again.

---

## Key patterns covered

- `await` pauses execution until a `Promise` resolves
- A function must be declared `async` before you can use `await` inside it
- Errors from rejected promises are caught with `try / catch`
- `Promise.all([p1, p2])` runs independent promises **in parallel**
- Calling an `async` function returns a `Promise` — you must `await` it to get the value

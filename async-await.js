// ============================================================
// ASYNC / AWAIT PRACTICE
// ============================================================
// The `async` keyword before a function makes it always return a
// Promise. Inside an async function, `await` pauses execution until
// the awaited Promise settles, making asynchronous code read like
// synchronous code.
// ============================================================

// ------------------------------------------------------------------
// Helper: simulate a network delay
// ------------------------------------------------------------------
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ------------------------------------------------------------------
// Exercise 1: Basic async function
// ------------------------------------------------------------------
// An async function always returns a Promise, even if you return a
// plain value. The resolved value is whatever you `return`.
async function sayHello(name) {
  if (!name) {
    throw new Error("Name is required");
  }
  await delay(100); // simulate some async work
  return `Hello, ${name}!`;
}

// Call the async function and handle the promise with .then()/.catch()
sayHello("Alice")
  .then((msg) => console.log("[Exercise 1 – success]", msg))
  .catch((err) => console.error("[Exercise 1 – error]", err.message));

sayHello("")
  .then((msg) => console.log("[Exercise 1 – success]", msg))
  .catch((err) => console.error("[Exercise 1 – error]", err.message));

// ------------------------------------------------------------------
// Exercise 2: await inside an async function
// ------------------------------------------------------------------
// Use `await` to pause until a Promise resolves, then work with the
// resolved value as if it were synchronous.
async function getUserData(userId) {
  await delay(200);
  return { userId, name: "Bob", email: "bob@example.com" };
}

async function printUser(userId) {
  const user = await getUserData(userId); // wait for the promise
  console.log("[Exercise 2 – user]", user);
  return user;
}

printUser(7);

// ------------------------------------------------------------------
// Exercise 3: try / catch for error handling
// ------------------------------------------------------------------
// Inside an async function, a rejected Promise causes `await` to
// throw, so you can handle errors with a regular try/catch block.
async function fetchRecord(id) {
  await delay(150);
  if (id <= 0) {
    throw new Error(`Invalid id: ${id}`);
  }
  return { id, content: `Content for record ${id}` };
}

async function loadRecord(id) {
  try {
    const record = await fetchRecord(id);
    console.log("[Exercise 3 – record]", record);
  } catch (err) {
    console.error("[Exercise 3 – caught error]", err.message);
  } finally {
    console.log("[Exercise 3 – finally] Done loading record.");
  }
}

loadRecord(5);
loadRecord(-3);

// ------------------------------------------------------------------
// Exercise 4: Sequential async calls
// ------------------------------------------------------------------
// Awaiting promises one after another ensures they run in order.
// Each step waits for the previous one to complete before starting.
async function step(label, ms) {
  await delay(ms);
  console.log(`[Exercise 4 – sequential] ${label} done`);
  return label;
}

async function runSequential() {
  const a = await step("Step A", 300);
  const b = await step("Step B", 100);
  const c = await step("Step C", 200);
  console.log("[Exercise 4 – order]", [a, b, c]);
}

runSequential();

// ------------------------------------------------------------------
// Exercise 5: Parallel async calls with Promise.all
// ------------------------------------------------------------------
// When operations are independent, awaiting them individually wastes
// time. Start all promises together and await their combined result.
async function runParallel() {
  const [a, b, c] = await Promise.all([
    step("Task A", 300),
    step("Task B", 100),
    step("Task C", 200),
  ]);
  console.log("[Exercise 5 – parallel results]", [a, b, c]);
}

runParallel();

// ------------------------------------------------------------------
// Exercise 6: Async function returning a value used by a caller
// ------------------------------------------------------------------
// Because async functions return Promises, callers can also use await
// (inside another async function) or .then() on the returned value.
async function computeSquare(n) {
  await delay(50);
  return n * n;
}

async function main() {
  const result = await computeSquare(9);
  console.log("[Exercise 6 – square of 9]", result);
}

main();

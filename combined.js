// ============================================================
// COMBINED PRACTICE – Promises, .then(), and async/await
// ============================================================
// This file brings together all three patterns and shows how they
// interoperate. Real-world code often mixes all three styles.
// ============================================================

// ------------------------------------------------------------------
// Shared helper: simulate a backend call
// ------------------------------------------------------------------
function fakeApiCall(endpoint, ms = 300) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!endpoint) {
        reject(new Error("endpoint is required"));
      } else {
        resolve({ endpoint, data: `Response from ${endpoint}` });
      }
    }, ms);
  });
}

// ------------------------------------------------------------------
// Part 1: Using .then() chains
// ------------------------------------------------------------------
console.log("=== Part 1: .then() chains ===");

fakeApiCall("/users")
  .then((res) => {
    console.log("[.then()] First call:", res.data);
    return fakeApiCall("/posts"); // return next promise to keep the chain
  })
  .then((res) => {
    console.log("[.then()] Second call:", res.data);
    return fakeApiCall("/comments");
  })
  .then((res) => {
    console.log("[.then()] Third call:", res.data);
  })
  .catch((err) => {
    console.error("[.then() error]", err.message);
  })
  .finally(() => {
    console.log("[.then() finally] All chained calls done.");
  });

// ------------------------------------------------------------------
// Part 2: Using async / await
// ------------------------------------------------------------------
console.log("=== Part 2: async / await ===");

async function loadAll() {
  try {
    const users = await fakeApiCall("/users", 100);
    console.log("[async/await] Users:", users.data);

    const posts = await fakeApiCall("/posts", 150);
    console.log("[async/await] Posts:", posts.data);

    const comments = await fakeApiCall("/comments", 200);
    console.log("[async/await] Comments:", comments.data);
  } catch (err) {
    console.error("[async/await error]", err.message);
  } finally {
    console.log("[async/await finally] loadAll complete.");
  }
}

loadAll();

// ------------------------------------------------------------------
// Part 3: Mixing .then() and async/await
// ------------------------------------------------------------------
// An async function returns a Promise, so you can call .then() on it.
// Conversely, you can await any Promise, including one built with
// .then() chaining.
console.log("=== Part 3: mixing patterns ===");

async function getUser(id) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id, name: "Charlie" };
}

// Call async function with .then()
getUser(1)
  .then((user) => {
    console.log("[mixed] User via .then():", user);
  })
  .catch((err) => {
    console.error("[mixed error]", err.message);
  });

// Await the result of a .then() chain (the chain itself is a Promise)
async function runMixed() {
  const result = await fakeApiCall("/profile", 50).then((res) => ({
    ...res,
    processed: true,
  }));
  console.log("[mixed] Profile via await + .then():", result);
}

runMixed();

// ------------------------------------------------------------------
// Part 4: Error propagation across patterns
// ------------------------------------------------------------------
console.log("=== Part 4: error propagation ===");

async function riskyOperation(succeed) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  if (!succeed) {
    throw new Error("Operation failed intentionally");
  }
  return "Operation succeeded";
}

// Handles rejection via .catch() on the async function's Promise
riskyOperation(false)
  .then((msg) => console.log("[error propagation – success]", msg))
  .catch((err) => console.error("[error propagation – caught]", err.message));

// Handles rejection via try/catch inside async/await
async function runRisky() {
  try {
    const msg = await riskyOperation(true);
    console.log("[error propagation – async success]", msg);
  } catch (err) {
    console.error("[error propagation – async caught]", err.message);
  }
}

runRisky();

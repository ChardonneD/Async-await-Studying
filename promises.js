// ============================================================
// PROMISES & .then() PRACTICE
// ============================================================
// A Promise represents a value that may be available now, later,
// or never. It can be in one of three states:
//   - pending   : initial state, neither fulfilled nor rejected
//   - fulfilled : operation completed successfully
//   - rejected  : operation failed
// ============================================================

// ------------------------------------------------------------------
// Exercise 1: Basic Promise – resolve
// ------------------------------------------------------------------
// Create a promise that resolves with a greeting message.
function greet(name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error("Name is required"));
    } else {
      resolve(`Hello, ${name}!`);
    }
  });
}

// Chain .then() to handle the resolved value and .catch() for errors.
greet("World")
  .then((message) => {
    console.log("[Exercise 1 – resolve]", message);
  })
  .catch((err) => {
    console.error("[Exercise 1 – error]", err.message);
  });

greet("")
  .then((message) => {
    console.log("[Exercise 1 – resolve]", message);
  })
  .catch((err) => {
    console.error("[Exercise 1 – error]", err.message);
  });

// ------------------------------------------------------------------
// Exercise 2: Simulating async work with setTimeout
// ------------------------------------------------------------------
// Wrap a setTimeout inside a Promise to simulate an async operation
// (e.g., a network request or file read).
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error(`Invalid id: ${id}`));
      } else {
        resolve({ id, data: `Record #${id}` });
      }
    }, 500);
  });
}

fetchData(42)
  .then((result) => {
    console.log("[Exercise 2 – success]", result);
  })
  .catch((err) => {
    console.error("[Exercise 2 – error]", err.message);
  });

fetchData(-1)
  .then((result) => {
    console.log("[Exercise 2 – success]", result);
  })
  .catch((err) => {
    console.error("[Exercise 2 – error]", err.message);
  });

// ------------------------------------------------------------------
// Exercise 3: Chaining .then() calls
// ------------------------------------------------------------------
// Each .then() callback receives the return value of the previous one.
// This lets you transform data step-by-step without nesting callbacks.
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId, name: "Alice" }), 200);
  });
}

function getPostsForUser(user) {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { title: "Post 1", author: user.name },
          { title: "Post 2", author: user.name },
        ]),
      200
    );
  });
}

getUser(1)
  .then((user) => {
    console.log("[Exercise 3 – user]", user);
    return getPostsForUser(user); // return next promise to continue the chain
  })
  .then((posts) => {
    console.log("[Exercise 3 – posts]", posts);
  })
  .catch((err) => {
    console.error("[Exercise 3 – error]", err.message);
  });

// ------------------------------------------------------------------
// Exercise 4: Promise.all – run promises in parallel
// ------------------------------------------------------------------
// Promise.all() takes an array of promises and resolves when ALL of
// them have resolved, or rejects as soon as ANY one rejects.
const p1 = new Promise((resolve) => setTimeout(() => resolve("Result A"), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Result B"), 100));
const p3 = new Promise((resolve) => setTimeout(() => resolve("Result C"), 200));

Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("[Exercise 4 – Promise.all]", results);
  })
  .catch((err) => {
    console.error("[Exercise 4 – error]", err.message);
  });

// ------------------------------------------------------------------
// Exercise 5: Promise.race – first settled promise wins
// ------------------------------------------------------------------
// Promise.race() resolves or rejects with the value of the FIRST
// promise that settles, regardless of the others.
const slow = new Promise((resolve) =>
  setTimeout(() => resolve("Slow result"), 800)
);
const fast = new Promise((resolve) =>
  setTimeout(() => resolve("Fast result"), 100)
);

Promise.race([slow, fast])
  .then((winner) => {
    console.log("[Exercise 5 – Promise.race winner]", winner);
  })
  .catch((err) => {
    console.error("[Exercise 5 – error]", err.message);
  });

// ------------------------------------------------------------------
// Exercise 6: .finally() – runs regardless of outcome
// ------------------------------------------------------------------
// .finally() is useful for cleanup (e.g., hiding a loading spinner).
fetchData(10)
  .then((result) => {
    console.log("[Exercise 6 – result]", result);
  })
  .catch((err) => {
    console.error("[Exercise 6 – error]", err.message);
  })
  .finally(() => {
    console.log("[Exercise 6 – finally] Cleanup complete.");
  });

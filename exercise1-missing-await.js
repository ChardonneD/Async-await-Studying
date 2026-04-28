/**
 * Exercise 1: Missing `await` keyword
 *
 * BUG: The result of fetchUserName() is a Promise, not the resolved value.
 *      Find where `await` is missing and add it.
 *
 * Expected output:
 *   Hello, Alice!
 */

function fetchUserName() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Alice"), 500);
  });
}

async function greetUser() {
  const name = fetchUserName(); // BUG: missing `await`
  console.log(`Hello, ${name}!`);
}

greetUser();

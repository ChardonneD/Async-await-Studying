/**
 * Exercise 2: Function not marked `async`
 *
 * BUG: `await` can only be used inside an `async` function.
 *      The function below uses `await` but is missing the `async` keyword.
 *      Fix the function declaration so it works correctly.
 *
 * Expected output:
 *   Order received: Burger
 */

function fetchOrder() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Burger"), 400);
  });
}

function processOrder() { // BUG: missing `async`
  const order = await fetchOrder();
  console.log(`Order received: ${order}`);
}

processOrder();

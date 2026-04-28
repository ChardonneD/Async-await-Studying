/**
 * Exercise 5: Returning a value from an async function
 *
 * BUG: getScore() is async but the caller treats it like a synchronous function.
 *      The returned Promise is never awaited, so `score` is a Promise object,
 *      not the number.
 *      Fix the caller (printScore) so it properly awaits the result.
 *
 * Expected output:
 *   Your score is: 42
 */

async function getScore() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(42), 200);
  });
}

async function printScore() {
  const score = getScore(); // BUG: missing `await`
  console.log(`Your score is: ${score}`);
}

printScore();

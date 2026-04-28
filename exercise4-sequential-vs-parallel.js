/**
 * Exercise 4: Sequential awaits instead of parallel (slow code)
 *
 * BUG: fetchA() and fetchB() are independent — they don't need each other's
 *      result. Awaiting them one after another wastes time (600 ms total).
 *      Use Promise.all() to run them in parallel and cut the wait time in half.
 *
 * Expected output:
 *   Results: ValueA ValueB
 *   (should finish in ~300 ms, not ~600 ms)
 */

function fetchA() {
  return new Promise((resolve) => setTimeout(() => resolve("ValueA"), 300));
}

function fetchB() {
  return new Promise((resolve) => setTimeout(() => resolve("ValueB"), 300));
}

async function loadAll() {
  // BUG: sequential awaits — total wait is 300 + 300 = 600 ms
  const a = await fetchA();
  const b = await fetchB();
  console.log(`Results: ${a} ${b}`);
}

loadAll();

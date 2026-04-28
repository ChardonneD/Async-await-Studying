/**
 * Exercise 3: Unhandled promise rejection (missing try/catch)
 *
 * BUG: fetchData() randomly rejects with an error.
 *      Right now the error is unhandled and will crash the program.
 *      Wrap the await call in a try/catch block to handle the error gracefully.
 *
 * Expected output (on success):
 *   Data: {"id":1,"value":"important"}
 *
 * Expected output (on failure):
 *   Something went wrong: Network error
 */

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ id: 1, value: "important" });
      } else {
        reject(new Error("Network error"));
      }
    }, 300);
  });
}

async function loadData() {
  // BUG: no try/catch — an error here will crash without a helpful message
  const data = await fetchData();
  console.log("Data:", JSON.stringify(data));
}

loadData();

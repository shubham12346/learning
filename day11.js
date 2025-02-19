// Implement Promise any

/**
 * Implement a polyfill of promise .any() function . And you should not use
 * thhe built in function directly for the problem , instead write your
 * own version
 *
 * Promise .any is a helper function that runs multiple promises in a prallel and
 * resolves to the value of the first sucessfully resolved promise from input array of promises
 *
 */

const promiseAny = (promises) => {
  if (promises.length === 0) return Promise.resolve([]);
  let errorCount = 0;
  let error = [];
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          errorCount++;
          error.push(err);
          if (errorCount === promises.length) {
            reject(error);
          }
        });
    }
  });
};

let promise1 = Promise.resolve(5);
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello"), 4000);
});
let promise3 = new Promise((resolve, reject) => {
  reject(new Error("Error "));
});
let promise4 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello there"), 2000);
});

let allResult = promiseAny([promise3, promise4, promise1, promise2]);
allResult.then((values) => console.log(values));

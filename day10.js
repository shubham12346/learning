/**
 *  Implement a polyfill of Promise.all Settled funnctionn.
 *  And you should not use the built inn functionn directly
 *  for the problem
 * instead write your own version.
 *
 * Promise.all settled is  a helper function that runs
 * multiple promises in parallel  and aggregates the setlled status
 * (either fulfilled or rejected) inyo a result array
 */

const promiseAllSettled = (promises) => {
  if (promises.length === 0) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    let results = [];
    let counter = 0;
    promises.forEach((promiseItem, index) => {
      Promise.resolve(promiseItem)
        .then((result) => {
          results[index] = { status: "fulfilled", value: result };
        })
        .catch((err) => {
          results[index] = { status: "rejected", reason: err };
        })
        .finally(() => {
          counter++;
          if (counter === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

let promise1 = Promise.resolve(5);
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello"), 4000);
});
let promise3 = new Promise((resolve, reject) => {
  reject(new Error("Error "));
});
let promise4 = Promise.reject("Error");

let allSetteldPromse = promiseAllSettled([
  promise1,
  promise2,
  promise3,
  promise4,
]);

allSetteldPromse.then((values) => console.log(values));

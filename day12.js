/**
 * Imlplement Promise race
 *
 * implement a polyfill of Promise.race() function And you shhould not use
 * the built in function directly for the problme , insted write you own
 *
 * Promise race () is a helper function that runs multile promises
 * in paralel and return a promise which resolve or rejects based on whichever
 * promise sttles first.
 *
 * Virtual Examples
 *
 * Cas1: Promise.race resolves with the value if the first settle is resolved
 *
 */

let promiseRace = (promises) => {
  if (promises.length === 0) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    for (let promise of promises) {
      Promise.resolve(promise)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }
  });
};

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello"), 4000);
});
let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject("world"), 100);
});

promiseRace([promise2, promise3])
  .then((values) => console.log("values", values))
  .catch((err) => console.log("err", err));

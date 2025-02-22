/**
 * Implement a polyfil of .finally() method of javascript promisies
 * And you should not use the built in function directly for the problem, instead write your own
 *
 * The finally() method of promise accepts a callback function
 * to be called when the promise is settled ( either fullfilled or
 *  or rejected ). The finally() method also return a new promise
 * The finally method also return a new promise  object which
 * ultimately allows you to chain calls of other promise
 * methods like then and catch
 *
 *
 *
 */

Promise.prototype.myFinally = function (callback) {
  return this.then(
    (result) => Promise.resolve(callback()).then(() => result),
    (err) =>
      Promise.resolve(callback()).then(() => {
        throw err;
      })
  );
};
let promiseFinally = new Promise((resolve, reject) => {
  setTimeout(() => {
    let random = Math.floor(Math.random() * 10);
    if (random % 2 === 0) {
      resolve("hello");
    } else {
      reject("world");
    }
  }, 2000);
});

promiseFinally
  .then((value) => console.log("value", value))
  .catch((err) => console.log("err", err))
  .myFinally(() => console.log("finally"));

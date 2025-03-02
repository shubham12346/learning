// Throttling Promises by Batching

// Problem Statement

// Implement a function 'throttlePromises()' which takes an
// array of functions as input and each of those functions return
// a promise object. We also pass a number 'max' which
// denotes the maximum promises that need to be processed
// concurrently.

// Scenario

// To understand this problem statement more clearly let's
// imagine this scenario first -

// As said, the function 'throttlePromises()' will take an array of
// functions which returns a promise.

// Now, assume each of the function calls make an API call and
// return a promise which either resolves/rejects. If you have a
// scenario you need to make 50 API calls concurrently. It would
// be a bad practice since we're overloading the server by
// making 50 API calls instantly.

// So, a better approach is to throttle it. Basically, we can make
// API calls in batches. The input 'max' passed to our function
// would be our batch size.

const createPromise = (id, delay) => {
  return () =>
    new Promise((resolve, reject) => {
      let random = Math.random() * 10;
      setTimeout(() => {
        if (random > 5) {
          resolve(`Promise ${id} resolved`);
        } else {
          reject(`Promise ${id} rejected`);
        }
      }, delay);
    });
};

const throttlePromise = (promises, max) => {
  return new Promise((resolve) => {
    let index = 0; // Start from 0 to process all promises
    let activeCount = 0;
    let results = new Array(promises.length);
    let completed = 0;

    function next() {
      if (completed === promises.length) {
        resolve(results);
        return;
      }

      while (activeCount < max && index < promises.length) {
        const currentIndex = index;
        const task = promises[index++](); // Start the promise
        activeCount++;

        task
          .then((res) => {
            console.log("res", res);
            results[currentIndex] = res;
          })
          .catch((err) => {
            console.log("res", err);
            results[currentIndex] = err;
          })
          .finally(() => {
            activeCount--;
            completed++;
            next(); // Start next promise when one finishes
          });
      }
    }

    next(); // Start first batch
  });
};

throttlePromise(
  [
    createPromise(1, 2000),
    createPromise(2, 1000),
    createPromise(3, 3000),
    createPromise(4, 1000),
    createPromise(5, 1000),
  ],
  2
)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err in final res", err);
  });

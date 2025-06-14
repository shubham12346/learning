// Write a function that retries an asynchronous operation (e.g., fetching data from an API) up to 3
// times if it fails. Each retry should wait 2 seconds before trying again.

function retryPromise(fn, retries = 3, delay = 3000) {
  return new Promise((resolve, reject) => {
    function attempt(counter) {
      const promise = typeof fn === "function" ? fn() : fn;

      promise.then(resolve).catch((err) => {
        if (counter === 0) return reject(err);
        counter--;
        console.log(`Retrying... attempts left: ${counter}`);

        setTimeout(() => {
          attempt(counter);
        }, delay);
      });
    }
    attempt(retries);
  });
}

// Example usage:

function helperFunction(fails = 1) {
  let attempt = 0;
  return () => {
    return new Promise((resolve, reject) => {
      attempt++;
      if (attempt < fails) {
        reject(new Error("errro"));
      } else {
        resolve("Success");
      }
    });
  };
}

// console.log("Test 1: Should succeed immediately");
// const fn1 = helperFunction(2);
// const result1 = await retryPromise(fn1);
// console.log("Success:", result1);

// mimic js promise method

class MyPromise {
  constructor(fn) {
    this.value = null;
    this.reason = null;
    this.state = "pending";
    this.onFullfilledCalbacks = [];
    this.onRejectCallbacks = [];

    const reject = (val) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = val;
        this.onRejectCallbacks?.forEach((callback) => callback(val));
      }
    };

    const resolve = (val) => {
      if (this.state === "pending") {
        this.state = "fullfilled";
        this.value = val;
        this.onFullfilledCalbacks?.forEach((callback) => callback(val));
      }
    };

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFullfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFullfilled = (value) => {
        try {
          if (typeof onFullfilled === "function") {
            resolve(onFullfilled(value));
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            reject(onRejected(reason));
          } else {
            reject(reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === "fullfilled") {
        setTimeout(() => handleFullfilled(this.value), 0);
      } else if (this.state === "rejected") {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.onFullfilledCalbacks.push((value) => {
          setTimeout(() => handleFullfilled(this.value), 0);
        });

        this.onRejectCallbacks.push((value) => {
          setTimeout(() => handleRejected(this.value), 0);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

function log() {
  setTimeout(() => {
    console.log("hello");
    return 5;
  }, 2000);
}
new MyPromise((resolve) => {
  setTimeout(() => {
    console.log("3 sec");
    resolve(4);
  }, 3000);
}).then((res) => console.log("res", res));

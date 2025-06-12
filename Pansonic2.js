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

console.log("Test 1: Should succeed immediately");
const fn1 = helperFunction(2);
const result1 = await retryPromise(fn1);
console.log("Success:", result1);

// mimic js promise method

class MyPromise {
  constructor(exe) {
    this.onResolve = null;
    this.onReject = null;
    this.status = "pending";
    this.value = null;
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fullfilled";
        this.value = value;
        this.onResolve?.(value);
      }
    };

    const reject = (err) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.value = err;
        this.onReject?.(value);
      }
    };
    try {
      exe(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(callback) {
    this.onResolve = callback;
    return this;
  }
  catch(callback) {
    this.onReject = callback;
    return this;
  }
}

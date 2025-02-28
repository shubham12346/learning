class MyPromise {
  constructor(executor) {
    // Initial state of the promise
    this.state = "pending"; // Can be "pending", "fulfilled", or "rejected"
    this.value = undefined; // Stores the resolved value
    this.reason = undefined; // Stores the rejection reason
    this.onFulfilledCallbacks = []; // Callbacks for when promise is resolved
    this.onRejectedCallbacks = []; // Callbacks for when promise is rejected

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        try {
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "rejected") {
        try {
          const result = onRejected ? onRejected(this.reason) : this.reason;
          reject(result);
        } catch (error) {
          reject(error);
        }
      } else {
        // Store callbacks if promise is still pending
        this.onFulfilledCallbacks.push(() => {
          try {
            const result = onFulfilled ? onFulfilled(this.value) : this.value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            const result = onRejected ? onRejected(this.reason) : this.reason;
            reject(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback(); // Executes regardless of fulfillment or rejection
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    ).then(
      (value) => value,
      (reason) => {
        throw reason;
      }
    );
  }
}

// Example usage:
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 1000);
});

promise
  .then((value) => {
    console.log("Resolved with:", value);
  })
  .catch((error) => {
    console.error("Rejected with:", error);
  })
  .finally(() => {
    console.log("Promise is settled.");
  })
  .then(() => {
    console.log("Chained after finally");
  });

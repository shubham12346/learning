// Implement a custo js promise

const states = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
class MyPromise {
  constructor(executorFun) {
    this.state = states.PENDING;
    this.value = null;
    this.successCallbacks = [];
    this.failureCallbacks = [];

    try {
      executorFun(
        (val) => this.resolve(val),
        (val) => this.reject(val)
      );
    } catch (e) {
      this.reject(e);
    }
  }

  reject(val) {
    if (this.state !== states.PENDING) return;
    this.state = states.REJECTED;
    this.value = val;
    this.failureCallbacks.forEach((cb) => cb());
  }

  resolve(val) {
    if (this.state !== states.PENDING) return;
    this.state = states.RESOLVED;
    this.value = val;
    this.successCallbacks.forEach((cb) => cb());
  }

  then(onResolve, onReject) {
    return new MyPromise((resolve, reject) => {
      const sucessCaller = () => {
        if (!onResolve) return resolve(this.value);

        try {
          let val = onResolve(this.value);
          resolve(val);
        } catch (err) {
          reject(err);
        }
      };

      const failedCaller = () => {
        if (!onReject) return reject(this.value);
        try {
          let val = onReject(this.value);
          resolve(val);
        } catch (err) {
          reject(err);
        }
      };
      switch (this.state) {
        case states.PENDING:
          this.successCallbacks.push(sucessCaller);
          this.failureCallbacks.push(failedCaller);
          break;
        case states.RESOLVED:
          sucessCaller();
          break;
        case states.REJECTED:
          failedCaller();
          break;
        default:
          throw new Error("States Not found ");
          break;
      }
    });
  }
  catch(onReject) {
    return this.then(null, onReject);
  }
}

function testPromise() {
  return new MyPromise((resolve, reject) => {
    let mathRandom = Math.random() * 10;
    setTimeout(() => {
      if (mathRandom > 5) {
        console.log("mathRandom", mathRandom);
        resolve("Success");
      } else {
        console.log(`mathRandom`, mathRandom);
        reject("Failed");
      }
    }, 2000);
  });
}

testPromise()
  .then((val) => {
    console.log("Success", val);
  })
  .catch((val) => {
    console.log("Failed", val);
  });

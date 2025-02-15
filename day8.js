// Impement a fetch autoretry functionwhich will atomatically retry
// to fetch when errors occurs until the maximum retry limit is reached

let counter = 1;
const fetchWithAutoRetry = async (promiseFunction, maxLimit) => {
  for (let index = 0; index < maxLimit; index++) {
    try {
      const res = await promiseFunction(3);
      console.log(`Passed in ${index + 1} attempt  `, res);
      return res;
    } catch (err) {
      console.log(`err ${index + 1} attempt failed `, err);
    }
  }
  throw "All the attempts failed";
};

const fetchPromise = async (failLimit) => {
  counter++;
  return new Promise((resolve, reject) => {
    if (counter > failLimit) {
      setTimeout(() => {
        resolve("promise resolved after 3 seconds");
      }, 2000);
    } else {
      setTimeout(() => {
        reject("rejected ");
      }, 1000);
    }
  });
};

fetchWithAutoRetry(fetchPromise, 6);

// Implement Promise .all

// Problem Description
/*
Implement a polyfill of Promise.all function .And you should not use the built in function directly 
for the problem , instead write your own version 

 
 Promsise .all () is a helper functio provided by javascript to handle 
 multiple promises at once and get the results in a single aggregrated array.

 Visual Examples

 case 1 when al promises ae resolved or fullfilled.

*
*/

function promiseAll(promises) {
  if (promises.length === 0) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    let results = [];
    let completedPromises = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          completedPromises++;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

// Test Cases

let promise1 = Promise.resolve(5);
let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("hello"), 4000);
});

let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("world"), 1000);
});

promiseAll([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // [5, "hello", "world"]
  })
  .catch((err) => console.log(err));

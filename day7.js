const sum = [1, 2, 3, 4, 5];
let initialValue = 0;
const res = sum.reduce((prev, num) => {
  return (prev += num);
}, initialValue);

console.log("initial value", initialValue, res);

// Implement a pipe function which chains some n number of function together to create a new function

const pipe =
  (...functions) =>
  (input) => {
    return functions.reduce((acc, fn) => fn(acc), input);
  };

const getName = (input) => input.name;
const convertItToUpperClass = (input) => input.toUpperCase();

const pipedFun = pipe(getName, convertItToUpperClass);

console.log(pipedFun({ name: "shub" }));

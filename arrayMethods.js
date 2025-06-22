// array.reduce((accumulator, currentValue) => {
//   // logic
//   return updatedAccumulator;
// }, initialValue);

const nums = [10, 42, 35, 87, 23];

const max = nums.reduce((prev, curr) => {
  return prev > curr ? prev : curr;
}, 0);

console.log(max);
const sum = nums.reduce((prev, curr) => prev + curr, 0);
console.log(sum);

// Count Occurrences of Elements
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const Elements = fruits.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

console.log("elements", Elements);

// Flatten a Nested Array
const nested = [[1, 2], [3, 4], [5], 5, 9];

const flatArr = nested.reduce((acc, curr) => {
  if (typeof curr === "object") {
    acc?.push(...curr);
  } else {
    acc.push(curr);
  }

  return acc;
}, []);

console.log("flatArr", flatArr);

//
const users = [
  { name: "A", role: "admin" },
  { name: "B", role: "user" },
  { name: "C", role: "admin" },
];

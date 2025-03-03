// Implement Custom Deep Equal

// Problem Statement

// Implement a function `deepEqual()' which takes in two
// arguments as input which deeply compares both arguments
// and returns a boolean which determines if they are equal.

// In the Lodash library, we have an utility function `isEqual()'
// which is useful when you want to compare complex data
// types by value and not by reference.

// Our problem statement is to implement our own custom
// version of the similar `isEqual()' utility method.

// The two arguments passed to the `deepEqual() can be of
// 1. Primitives (undefined, boolean, string, number, null)
// 2. Object Literals
// 3. Arrays

// Note: In JavaScript `null' is considered as a primitive value
// because it's behavior is seemingly primitive. Although, typeof
// null is returned as an `object'.

// Example

// const input1 = { a: 'Hello' };

/* *
Deep compare in js is a method where we compare and check each key and vaues and nested properties
to have equal values.
we can use json.stringify and recurssion to implement js deep compare method.



*/

/**
 *
 * first method cannot handle function and undefined values ,regex ,dates
 * order of keys also matters in the first method
 */
function deepCompare(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function deepCompareUsingRecurrssion(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  for (let key of keys1) {
    if (
      !keys2.includes(key) ||
      !deepCompareUsingRecurrssion(obj1[key], obj2[key])
    ) {
      return false;
    }
  }
  return true;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log("with Json compare method", deepCompare(obj1, obj2)); // true
console.log("with recursion ", deepCompareUsingRecurrssion(obj1, obj2)); // true

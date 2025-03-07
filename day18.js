// Implement Custom Object.assign

// Problem Statement

// Implement a function 'objectAssign()' which is a polyfill of the
// built-in 'Object.assign()' function. And you should not use the
// built-in function directly for the problem, instead write your
// own version.

// What does 'Object.assign()' do?

// By definition, it copies all enumerable own properties from
// one or more source objects to a target object and returns the
// target object.

// So, the 'Object.assign()' will be passed a target object and
// any number of source objects as inputs.

// Note:

// > Enumerable - Enumerability refers to whether a property
// can be iterated over or accessed using iteration methods
// like Object.keys or for .. in loop
// > Own (Ownership) - Ownership determines whether a
// property belongs to the object directly or is inherited from
// its prototype chain.

// We'll talk about these in great depth below.

function objectAssign(target, ...sources) {
  if (target === null) {
    throw Error("Cannot convert null into object");
  }
  let to = Object(target);
  for (let source of sources) {
    if (source !== null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          console.log("", Object.prototype.hasOwnProperty.call(source, key));
          to[key] = source[key];
        }
      }
    }
  }
  return to;
}

// Example usage:
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };
const result = objectAssign({}, obj1, obj2, obj3);
console.log(result); // { a: 1, b: 2, c: 3 }

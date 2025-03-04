// Implement Custom Object.assign

// Problem Statement

// Implement a function 'objectAssign()' which is a polyfill of the
// built-in 'Object.assign() function. And you should not use the
// built-in function directly for the problem, instead write your
// own version.

// What does 'Object.assign()' do?

// By definition, it copies all enumerable own properties from
// one or more )
// console.log("result",result) objects to a target object and returns the
// target object.

// So, the 'Object.assign()' will be passed a target object and
// any number of source objects as inputs.

// Note:

// >Enumerable - Enumerability refers to whether a property
// can be iterated over or accessed using iteration methods
// like Object.keys or for .. in loop
// >Own (Ownership) - Ownership determines whether a
// property belongs to the object directly or is inherited from
// its prototype chain.

const objectAssign = (target, ...sources) => {
  if (target === null) {
    throw new Error(`Target cannot be null`);
  }

  let to = Object(target);
  for (let source of sources) {
    if (source != null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key];
        }
      }
    }
  }
  return to;
};

let source = { a: 2, b: 3, c: 4 };
let tar = objectAssign({}, source);
console.log("tar", tar);

// Example usage
const target = { a: 1 };
const source1 = { b: 2, c: 3 };
const source2 = { c: 4, d: 5 };

const result = objectAssign(target, source1);
console.log("result", result);

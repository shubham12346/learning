// Implement Custom JSON.parse

// Problem Statement

// Implement a function 'parseJSON()' which is a polyfill of the
// built-in 'JSON.parse()'. And you should not use the built-in
// function directly for the problem, instead write your own
// version.

// 'JSON.parse()' method takes a valid JSON string (serialized
// or stringified version) as input and converts it to a valid
// Javascript value.

// The idea of JSON.parse is to deserialize the serialized or
// stringified data back to the Javascript value as represented in
// the JSON string.

// Example

// const obj = {
// name: 'Peter',
// age: 29,
// spiderman: true,
// movies: ['Spiderman', 'Amazing Spiderman', 'Far From Home'],
// address: {
// city: 'New york',
// state: 'NY'

function JSONparse(value) {}

function stringfy2(value) {
  if (value == null) return null;
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (typeof value === "undefined" || typeof value === "function")
    return undefined; // Handles undefined & functions

  if (Array.isArray(value)) {
    return `[${value.map((item) => stringfy2(item)).join(",")}]`;
  }

  if (typeof value === "object") {
    let entries = Object.keys(value)
      .filter(
        (key) => value[key] !== undefined && typeof value[key] !== "function"
      )
      .map((key) => `"${key}":${stringify(value[key])}`);

    return `{${entries.join(",")}}`;
  }
  return undefined;
}

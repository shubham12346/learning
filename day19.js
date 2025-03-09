// Implement Custom JSON.stringify

// Problem Statement

// Implement a function 'stringify()' which is a polyfill of the
// built-in `JSON.stringify()'. And you should not use the built-in
// function directly for the problem, instead write your own
// version.

// 'JSON.stringify()' method converts a Javascript value or
// Object to a JSON string version which can then later also be
// parsed back to a Javascript value or object using the
// 'JSON.parse()' method.

// The idea of JSON.stringify is to serialize the data and
// JSON.parse to de-serialize it.

// Use Case

// We might have seen a lot of use cases of using it in our
// day-to-day development work, where we use it for Deep
// cloning objects, or using the stringified version to send as
// data over the network.

// Syntax

const obj = { name: "Peter", age: 29 };
const sampleObj = {
  name: "Juan",
  age: 29,
  address: {
    street: "Street 1",
    number: 3,
  },
};

function Stringify(object) {
  let objString = "";
  // get last key
  let lastKey = Object.keys(object).pop();

  if (typeof object == "object") {
    objString += "{ ";
    for (let key in object) {
      objString += ` "${key}" : "${Stringify(object[key])}" `;

      if (key !== lastKey) {
        objString += `,`;
      }
    }
    objString += `}`;
  } else if (typeof object == "number" || typeof object == "string") {
    objString += `${object} `;
  }
  return objString;
}

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
      .map((key) => `"${key}":${Stringify(value[key])}`);

    return `{${entries.join(",")}}`;
  }
  return undefined;
}

console.log("Stringify", Stringify(obj));
console.log("Stringify", Stringify(sampleObj));

console.log(
  stringfy2({
    name: "Juan",
    age: 29,
    address: { street: "Street 1", number: 3 },
  })
);
console.log(stringfy2([1, "hello", true, null, { a: 5 }]));
console.log(stringfy2(null));
console.log(stringfy2(undefined)); // should return undefined
console.log(stringfy2({ key: undefined })); // should return "{}"

class JSONstringify {
  constructor() {}

  stringify(value) {
    if (value == null) return "null";
    if (typeof value === "string") return `"${value}"`;
    if (typeof value === "number" || typeof value === "boolean")
      return `"${String(value)}"`;
    if (value === undefined || typeof value === "function") return undefined;

    if (Array.isArray(value)) {
      return `[${value?.map((item) => this.stringify(item)).join(",")}]`;
    }

    if (typeof value === "object") {
      let entries = Object.keys(value)
        .filter(
          (item) => value[item] != undefined || typeof value[item] != "function"
        )
        .map((item) => `"${item}":"${this.stringify(value[item])}"`);

      return `{${entries.join(",")}}`;
    }
    return undefined;
  }
}

const newJson = new JSONstringify();
console.log("----------------------------");
console.log(newJson.stringify([1, "hello", true, null, { a: 5 }]));
console.log(newJson.stringify(null));
console.log(newJson.stringify(undefined)); // should return undefined
console.log(newJson.stringify({ key: undefined })); // should return "{}"

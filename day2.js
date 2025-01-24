// Deep Flatten I

/**
 * You need to flatten a deeply nested  array.
 * The original array given as input contains either nested arrays or
 * primitive values
 */

const arr = [1, [2], [3, [4]]];

let deepFlatten = (arr, answerArr) => {
  for (let ele of arr) {
    if (typeof ele === "object") {
      deepFlatten(ele, answerArr);
    } else {
      answerArr.push(ele);
    }
  }
};

let ansArray = [];
deepFlatten(arr, ansArray);
console.log("ansArray", ansArray);

// Original arr which needs to be flatten up to the given depth
// depth is passed as second argument
// if no depth passed as argument , bu default depth is 1
// flatten(arr,1);

function flatten(arr, depth = 1) {
  let ansArray = [];
  for (let ele of arr) {
    if (typeof ele === "object" && depth > 0) {
      let DeepFlattenArr = flatten(ele, --depth);
      ansArray.push(...DeepFlattenArr);
      depth++;
    } else {
      ansArray.push(ele);
    }
  }
  return ansArray;
}

const newArrAns = flatten(arr, 1);
console.log("newArr", newArrAns);

// Depth Flatten II
/**
 * You need to flatten a deeply nested Object. The Original Object given as input contains
 * either nested Objects or primitive values
 *
 */

const obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

const obj2 = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: {
      g: 5,
      h: 6,
    },
  },
};

const flattenObj = (obj) => {
  let ansObject = {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      let newObj = flattenObj(obj[key]);
      Object.assign(ansObject, newObj);
    } else {
      ansObject[key] = obj[key];
    }
  }
  return ansObject;
};

// console.log("ansObjec", flattenObj(obj2));
// console.log("ansObject 2 ", flattenObj(obj1));

// Deep Flatten III

const flattenWithPrefix = (obj, parent = "") => {
  let ansObject = {};
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      const newKey = parent ? parent + "." + key : key;
      let newObj = flattenWithPrefix(obj[key], newKey);
      Object.assign(ansObject, newObj);
    } else {
      const newKey = parent ? parent + "." + key : key;
      ansObject[newKey] = obj[key];
    }
  }
  return ansObject;
};

console.log("ansObjec", flattenWithPrefix(obj2, ""));
console.log("ansObject 2 ", flattenWithPrefix(obj1, ""));

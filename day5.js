// create a function for deep flattenning  input can be an array or an object or primitive values

const input = {
  a: 1,
  b: [2, 3, [4, 5], { c: 6, d: [7, 8] }],
  e: { f: 9, g: { h: 10, i: [11, 12] } },
};

// using stack
const deepFlatteningWithStack = (input) => {
  let ansArray = [];

  let stack = [input];
  while (stack.length > 0) {
    let currentELE = stack.pop();

    if (Array.isArray(currentELE)) {
      stack.push(...currentELE);
    } else if (typeof currentELE === "object" && currentELE !== null) {
      stack.push(...Object.values(currentELE));
    } else {
      ansArray.push(currentELE);
    }
  }
  return ansArray.reverse();
};

// console.log("deepFalttened", deepFlatteningWithStack(input));

// using recursion

const deepFlatteningWithRecurrion = (input) => {
  const ansArray = [];
  if (Array.isArray(input)) {
    for (let ele of input) {
      ansArray.push(...deepFlatteningWithRecurrion(ele));
    }
  } else if (typeof input == "object" && input !== null) {
    for (let obj of Object.values(input)) {
      ansArray.push(...deepFlatteningWithRecurrion(obj));
    }
  } else {
    ansArray.push(input);
  }

  return ansArray;
};

console.log("deepFalttened", deepFlatteningWithRecurrion(input));

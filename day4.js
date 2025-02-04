// create a function for deep flattenning  input can be an array or an object or primitive values

const input = {
  a: 1,
  b: [2, 3, [4, 5], { c: 6, d: [7, 8] }],
  e: { f: 9, g: { h: 10, i: [11, 12] } },
};

//   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] answer

// function deepFlattening(nums) {
//   let ansArray = [];
//   for (let ele in nums) {
//     if (Array.isArray(nums[ele])) {
//       let deStuctureArr = deepFlatteningArray(nums[ele]);
//       ansArray.push(...deStuctureArr);
//     } else if (typeof nums[ele] === "object") {
//       let deStructureObject = deepFlatteningObject(nums[ele], ele);
//       ansArray.push(...deStructureObject);
//     } else {
//       ansArray.push(nums[ele]);
//     }
//   }

//   console.log(ansArray);
// }

// function deepFlatteningArray(nums) {
//   let ansArray = [];
//   console.log(nums);
//   if(!Array.isArray(nums)){}
//   for (let ele of nums) {
//     if (typeof ele === "object") {
//       let destrcuturedEles = deepFlatteningArray(ele);
//       ansArray.push(...destrcuturedEles);
//     } else {
//       ansArray.push(ele);
//     }
//   }
//   return ansArray;
// }

// function deepFlatteningObject(nums, parent = "") {
//   let flattenObject = {};
//   for (key in nums) {
//     if (typeof key === "object") {
//       let flatDeep = deepFlatteningObject(nums[key], key);
//       flattenObject = { ...flatDeep, ...flattenObject };
//     } else {
//       let checkParent = parent ? `${parent}.${key}` : key;
//       flattenObject[checkParent] = nums[key];
//     }
//   }
//   return flattenObject;
// }

function deepFlattening(nums) {
  let ansArray = [];
  if (Array.isArray(nums)) {
    for (let items of input) {
      ansArray.push(...deepFlattening(item));
    }
  } else if (typeof input === "object" && input !== null) {
    for (let key in input) {
      ansArray.push(...deepFlattening(input[key]));
    }
  } else {
    ansArray.push(input);
  }
  return ansArray;
}

deepFlattening(input);

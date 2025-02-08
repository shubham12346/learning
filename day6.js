// Negative Indexing in Arrays (Proxies)

// Problem Statement
//  Implement a wrapper function wrap() which make's negative indexning possible

const letters = ["a", "b", "c", "d", "e"];

// console.log(letters[-2]);

// function wrap(index, array) {
//   let abs = Math.abs(index);
//   if (abs > array.length) {
//     return;
//   }
//   return array[array.length - abs];
// }

// console.log("arr", wrap(-2, letters));

function warapper(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && /^-?\d+$/.test(prop)) {
        const index = parseInt(prop, 10);
        if (index < 0) {
          return target[target.length + index];
        }
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const newLetters = warapper(letters);
console.log("newLetters", newLetters[-4], newLetters[-2]);

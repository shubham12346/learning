// //
// Given a functiin fn and a t in miliseconds . you need to return a debounced version of that function

// debounce function

const debounce = (fn, t) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, t);
  };
};

function sayHelloDebounde() {
  console.log("Hello debounce");
}
function sayHelloThrottle() {
  console.log("hello throttle");
}

const debounceHello = debounce(sayHelloDebounde, 3000);

debounceHello();
debounceHello();
debounceHello();
debounceHello();
// it delays a function call for given time and if the function is called again within the time it resets the timer and delays the function call again

// Implement Throttle
let throttle = (fn, t) => {
  let timer;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, t);
  };
};

const throttleHello = throttle(sayHelloThrottle, 3000);

throttleHello();
throttleHello();
throttleHello();
throttleHello();
// it limits the rate of function calls to once per given time

// Implement Currying
// Implement a curry function which accepts a function as an input and returns a curried version of that function passes as a input
// return curried version of that function passed as input

function sum(agr1) {
  return (arg2) => {
    return (arg3) => {
      return agr1 + agr1 + arg3;
    };
  };
}

let s = sum(2)(3)(4);
console.log("s", s);

// Implement a curry function which also supports placeholders.
// So your curried functiion call can also be passed to replace those
// Argument which are placeholder with values

const _ = Symbol("placeholder");

function curry(fn) {
  const curried = (...args) => {
    // check if all required argumenst are filled (non-placeholder values)
    const filledArgs = args.filter((arg) => arg !== _);
    console.log("filledArgs", filledArgs);
    console.log("fn", fn);
    if (filledArgs.length >= fn.length) {
      const finalArgs = args.reduce(
        (acc, arg, index) => {
          acc[index] = arg === _ ? acc[index] : arg;

          return acc;
        },
        [...finalArgs]
      );

      return fn(...finalArgs);
    }

    return (...newArgs) => {
      const mergedArgs = args
        ?.map((arg) =>
          arg === _ && newArgs.length > 0 ? newArgs.shift() : arg
        )
        .concat(newArgs);

      return curried(...mergedArgs);
    };
  };
}

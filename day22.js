// Implement Custom setTimeout

// Problem Statement

// Implement a custom function mySetTimeout() and
// 'myClearTimeout()' which are polyfills for the in-built
// 'setTimeout and 'clearTimeout functions.

// And you should not use the built-in function directly for the
// problem, instead write your own version.

// The `setTimeout' function is utilized to introduce a delay to
// execute a function call after a specified amount of time has
// passed.

// The `setTimeout' function returns a distinct identifier that can
// be used to pass as input to the 'clearTimeout function, where
// the 'clearTimeout' function stops the execution of that
// function call which was scheduled to be called after the
// specified delay.

// At last we can pass any number of parameters to our
// 'setInterval' function which needs to be passed to the
// callback function.

// // Syntax

// // Schedule a timer for the function 'fn' to be executed after

const mySetTimeout = (fn, delay, ...args) => {};

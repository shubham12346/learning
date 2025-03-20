// Implement Custom typeof operator

// Problem Statement

// Implement a function getTypeOf() which is a polyfill for the
// built-in 'typeof operator. And you should not use the built-in
// function directly for the problem, instead write your own
// version.

// The thing is Javascript's `typeof operator is not used as a
// function call instead follows the below syntax :

// // Original syntax
// typeof data;

// But in our case we would define a custom function and make
// it behave exactly like the 'typeof operator.

// Now here, we have two challenges that need to be solved.

// 1. We should return the correct datatype of whatever data
// we get.
// 2. We should not use the built-in `typeof operator of
// Javascript in our custom function.

// Concept

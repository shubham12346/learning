// Implement Promise any

/**
 * Implement a polyfill of promise .any() function . And you should not use
 * thhe built in function directly for the problem , instead write your
 * own version
 *
 * Promise .any is a helper function that runs multiple promises in a prallel and
 * resolves to the value of the first sucessfully resolved promise from input array of promises
 *
 * However,if all the promises in the input array are rejected or
 * if the array is empty, thne Promise.any() rejects with an Aggregate Error
 * containing all the rejection reasons of the input promises.
 *
 */

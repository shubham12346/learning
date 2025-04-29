// 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597

const findFibonaci = (n) => {
  if (n < 2) {
    return 1;
  } else {
    return findFibonaci(n - 1) + findFibonaci(n - 2);
  }
};

// console.log(findFibonaci(10));
// console.log(findFibonaci(10));

// console.log(findFibonaci(10));

const findFibonacciMemo = (n, memo = {}) => {
  if (memo[n]) return memo[n];
  if (n < 2) return 1;
  memo[n] = findFibonacciMemo(n - 1, memo) + findFibonacciMemo(n - 2, memo);
  return memo[n];
};

console.log(findFibonacciMemo(100));

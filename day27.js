// Given a string s consisting of opening and closing parenthesis '(' and ')'.
//  Find the length of the longest valid parenthesis substring.

console.log(longestValidParentheses("()(()))))")); // Output: 6
console.log(longestValidParentheses("()"));
// console.log("a", a, b);
function longestValidParentheses(s) {
  let stack = [-1];
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLen;
}

var a = "hello";
let b = "dd";

// Print the first shortest root to leaf path in a Binary Tree
// Given a Binary Tree with distinct values, the task is to find the first smallest root to
// leaf path.We basically need to find the leftmost root to leaf path that has the minimum number of nodes.

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function printShortestRootToLeafPath(root) {
  if (!root) return;

  const queue = [[root, [root.data]]];
  while (queue.length > 0) {
    const [current, path] = queue.shift();

    if (!current.left && !current.right) {
      console.log("shortest path", path.join("->"));
      return;
    }

    if (current.left) {
      queue.push([current.left, [...path, current.left.data]]);
    }

    if (current.right) {
      queue.push([current.right, [...path, current.right.data]]);
    }
  }
}

// Construct the tree
const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.right.left = new Node(4);
root.right.right = new Node(5);

// Call the function
printShortestRootToLeafPath(root);

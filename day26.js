const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }

  return maxSum;
}

console.log(maxSubarraySum(nums)); // Output: 6 (subarray: [4, -1, 2, 1])

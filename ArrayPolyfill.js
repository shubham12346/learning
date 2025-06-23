let nums = [1, 2, 3];

Array.prototype.map = function (callback) {
  let results = [];
  for (let i = 0; i < this.length; i++) {
    console.log("i", i, this[i], callback);
    results.push(callback(this[i], i, this));
  }
  return results;
};

let nums2 = nums.map((item) => item * 2);
console.log("nums2", nums2);

Array.prototype.filter = function (callback) {
  let result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      console.log("this", this[i]);
      result.push(this[i]);
    }
  }
  console.log("res", result);
  return result;
};
let ages = [12, 13, 15, 31, 12, 45, 43];
let allAges = ages.filter((age) => age > 18);

Array.prototype.reduce = function (acc, currentValue) {};

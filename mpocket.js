// how to share common funtion in two objects
// 1. shared function
// 2. prototype shared method
// 3. class ES6 syntax

function commonFunction() {
  console.log(
    "say hello bro  i am here using acommon function",
    this.firstName
  );
}

const commonWithProto = {
  sayHello: function () {
    console.log("this is with use of proto", this.firstName);
  },
};
const p1 = {
  firstName: "shubham",
  greet: commonFunction,
  __proto__: commonWithProto,
};

const p2 = {
  firstName: "Vaibhab",
  greet: commonFunction,
  __proto__: commonWithProto,
};

p1.greet();
p2.greet();
p1.sayHello();
p2.sayHello();

class Greet {
  constructor(firstName) {
    this.firstName = firstName;
  }
  sayHello() {
    console.log(`hey man`, this.firstName);
  }
}

const n1 = new Greet("shubham");
const n2 = new Greet("vaib");
n1.sayHello();
n2.sayHello();

// create a memoize functions

function memoize(fn) {
  let cache = {};

  return function (arg) {
    if (cache[arg]) {
      console.log("return from cached");
      return cache[arg];
    }
    let newValue = fn(arg);
    cache[arg] = newValue;
    console.log("calculated value");
    return newValue;
  };
}

function square(num) {
  return num * num;
}

const sumMemoized = memoize(square);
sumMemoized(5);
sumMemoized(5);
sumMemoized(5);

// suppose you have flex property if you have one div to to take some width and reaining to other

<div className="flex">
  <div>1</div>
  <div>2</div>
</div>;

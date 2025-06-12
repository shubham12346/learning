//  Create a TypeScript enum representing different shipping methods (e.g., Express, Standard,
// // Overnight). Then, write a function that takes a shipping method and returns a string describing the
// // delivery speed. Use a type guard to improve type safety.

enum ShippingMethod {
  Express = "Express",
  Standard = "Standard",
  Overnight = "Overnight",
}

// type

const isShippingMethod = (method: any): method is ShippingMethod => {
  return Object.values(ShippingMethod).includes(method);
};

function getShipingMethod(method: ShippingMethod) {
  switch (method) {
    case ShippingMethod.Express:
      console.log("helo");
      return;
    default:
      throw new Error("Shiiping method not found");
  }
}

// Write a generic TypeScript function that takes two arguments of the same type and returns their
// sum. The function should only accept arguments that implement a plus method. If the arguments
// don't implement plus, the compiler should issue an error.
// TypeScript: TypeScript Proficiency

interface Addable<T> {
  plus: (other: T) => T;
}

function add<T extends Addable<T>>(a: T, b: T) {
  return a.plus(b);
}

class MyNumber implements Addable<MyNumber> {
  constructor(private value: number) {}
  plus(other: MyNumber) {
    return new MyNumber(this.value + other.value);
  }

  toString(): string {
    return this.value.toString();
  }
}

// 4. Use the function
const num1 = new MyNumber(10);
const num2 = new MyNumber(20);
const result = add(num1, num2);

console.log(result.toString()); // Output: 30

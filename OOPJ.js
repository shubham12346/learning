// Object in Javascript
var firstName = "aakash";
const person = {
  firstName: "shubham",
  greet: function () {
    console.log(this.firstName); // logs shubham
  },

  sayHello: () => {
    console.log(this.firstName); // logs undefined , can log aakash but if use  browser console ,
    // logs undefined in node js and in strict mode
  },
};

// person.greet();
// person.sayHello();

function Persons(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.greet = () => {
    console.log(`hello this is ${firstName} ${lastName}`);
  };
}

const shub = new Persons("shubham", "Agrahari");
shub.greet();
const vaibh = new Persons("vaibhav", "mishra");
vaibh.greet();

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

// We’ll implement a basic banking system with:

// A BankAccount prototype (base)

// A SavingsAccount that inherits from BankAccount

// Oop with protype
function BankAccount(owner, balance) {
  this.name = owner;
  this.balance = balance;
}

BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
  console.log(`the toatl balance is  ${this.balance}`);
};

BankAccount.prototype.withDraw = function (amount) {
  if (amount > this.balance) {
    console.log(
      "amount is greater than balance so can't withdraw , current balance",
      this.balance
    );
  } else {
    this.balance -= amount;
    console.log(
      `${this.owner} withdrew ₹${amount}. New balance: ₹${this.balance}`
    );
  }
};

BankAccount.prototype.getBalance = function () {
  console.log(`the current balance is ${this.balance}`);
};

function SavingAccount(owner, balance, interestRate) {
  BankAccount.call(this, owner, balance);
  this.interestRate = interestRate;
}

SavingAccount.prototype = Object.create(BankAccount.prototype);
SavingAccount.prototype.constructor = SavingAccount;

SavingAccount.prototype.addInterest = function () {
  const interest = this.balance * this.interestRate;
  this.balance += interest;
  console.log(
    `Interest of ${interest.toFixed(2)} added . New balance is ${
      this.balance
    } of account name ${this.owner}`
  );
};

const acc1 = new BankAccount("shubham", 3000);
acc1.deposit(2000);
acc1.withDraw(1000);
acc1.getBalance();

const sav1 = new SavingAccount("shubham", 5000, 0.12);
sav1.deposit(2000);
sav1.getBalance();
sav1.addInterest(0.15);
sav1.getBalance();

let name = {
  firstName: "Akshay",
  lastName: "Saini",
};

let printFullName = function (hometown, state) {
  console.log(
    this.firstName + " " + this.lastName + " from " + hometown + " ," + state
  );
};

printFullName.call(name, "Delhi", "Delhi");
// name.printFullName();

let name2 = {
  firstName: "Jane",
  lastName: "Doe",
};
//  function borrowing
printFullName.call(name2, "Mumbai", "Maharashtra");

printFullName.apply(name2, ["Mumbai", "Maharashtra"]);

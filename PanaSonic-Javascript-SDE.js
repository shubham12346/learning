// Coding questions (8)

// Implement a React component that displays a list of tasks. The component should receive an array
// of task objects as a prop and render a list of task descriptions. The component should also have a
// button that allows the user to add a new task to the list.
// Frontend Frameworks: Fundamentals Concepts

// Write a function fetchData that takes a URL as an argument and returns a Promise. The function
// should fetch data from the given URL. If the request is successful, the Promise should resolve with
// the JSON response. If there's an error (e.g., network error, 404), the Promise should reject with an
// error message.
// JavaScript: JavaScript Fundamentals

async function callApi() {
  try {
    const res = await fetch("");
    const data = await res.json();
    console.log("data", data);
  } catch (err) {
    if (err.status === "404") {
      console.log("un authorize");
    }
  }
}

// Write a generator function that yields numbers from 1 to 10, pausing after every 3 numbers.
// JavaScript: JavaScript Fundamentals

function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = numberGenerator();
console.log("next", gen.next());
console.log("next", gen.next());

// : Explain what hoisting is in JavaScript and provide an example demonstrating its behavior. What are
// the implications for code readability and maintainability?
// JavaScript: JavaScript Fundamentals
// HTML Basics 7/10

// Communication & Articulation 7/10

// Create a TypeScript enum representing different shipping methods (e.g., Express, Standard,
// Overnight). Then, write a function that takes a shipping method and returns a string describing the
// delivery speed. Use a type guard to improve type safety.
// TypeScript: TypeScript Proficiency

// Write a generic TypeScript function that takes two arguments of the same type and returns their
// sum. The function should only accept arguments that implement a plus method. If the arguments
// don't implement plus, the compiler should issue an error.
// TypeScript: TypeScript Proficiency

// Create a simple HTML page that displays a heading "Welcome to My Website!" and a paragraph with
// the text "This is a simple website created by me."
// HTML/CSS: HTML Basics

// Describe, in pseudocode or high-level steps, how you would securely generate a session ID. Don't
// use a built -in library; describe the process.

// Create a TypeScript enum representing different shipping methods (e.g., Express, Standard,
// Overnight). Then, write a function that takes a shipping method and returns a string describing the
// delivery speed. Use a type guard to improve type safety.
// TypeScript: TypeScript Proficiency

// Write a generic TypeScript function that takes two arguments of the same type and returns their
// sum. The function should only accept arguments that implement a plus method. If the arguments
// don't implement plus, the compiler should issue an error.
// TypeScript: TypeScript Proficiency

// Create a simple HTML page that displays a heading "Welcome to My Website!" and a paragraph with
// the text "This is a simple website created by me."
// HTML/CSS: HTML Basics

// Describe, in pseudocode or high-level steps, how you would securely generate a session ID. Don't
// use a built-in library; describe the process.

// Theory / Scenario-based questions (3)
// 1.Explain how event handling works in React(or your chosen framework).How do you prevent the
//  default browser behavior of an event ?

// 2. Describe the typical flow of events when a user logs into a web application, in terms of session
// reation.What happens on the server - side ? What happens on the client - side ?

// 3. How would you handle notifying a user that their session is about to expire (e.g., a "Your session will
// expire in 2 minutes" message)? What are the implementation considerations ?

// Reverse a String
const str = "hello";
let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}

console.log("Reversed:", reversed);

// Task 2: Replace spaces with dashes

const sentence = "this is a test";
const withDashes = sentence.replace(/ /g, "-");
console.log(withDashes); // "this-is-a-test"

// Use template literals to log custom message
const user = "Nikita";
const score = 85;
console.log(`Hello ${user}, your score is ${score}/100.`);

function validUsername(username) {
  if (username.length <= 6) {
    console.log("Username must be longer than 6 characters.");
  } else if (username.includes(" ")) {
    console.log("Username must not contain spaces.");
  } else {
    console.log(`Welcome, ${username}! Your username is valid.`);
  }
}
validUsername("NikitaKanwar");

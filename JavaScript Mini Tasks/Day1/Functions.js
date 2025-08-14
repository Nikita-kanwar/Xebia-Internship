// Mini Task 1: sum() in All 3 Ways

// Function Declaration 
function sumDec(a, b) {
  return a + b;
};
console.log("Total Dec:", sumDec(3, 4)); 


// Function Expression
const sumExp = function (a, b) {
  return a + b;
};
console.log("Total Exp:", sumExp(3, 4)); 


// // Arrow Function
const sumArrow = (a, b) => a + b;
console.log("Total Arrow:", sumArrow(3, 4)); 



// Mini Task 2: Log a variable before and after declaration to show hoisting
console.log(x); // undefined/not error
var x = 10;
console.log(x);


// console.log(y); //ReferenceError
let y = 20;
console.log(y);



// Mini Task 3: Create a nested function and demonstrate scope
function outer() {
  const outerVar = "I am outer";

  function inner() {
    const innerVar = "I am inner";
    console.log(outerVar); // Access outer variable
    console.log(innerVar); //  Access inner variable
  }
  inner();
  // console.log(innerVar); Error: innerVar is not defined here
}
outer();



// Combined Task: Greet User App

greetUser();//function Call

function greetUser() {
  const name = prompt("What is your name?");
  const hour = new Date().getHours();//Get the Time 24 Hours
  let greeting;

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  alert(`${greeting}, ${name}!`);
}
// Practice  of DataTypes

console.log(typeof "Nikita");
console.log(typeof 20);
console.log(typeof true);
console.log(typeof false);
console.log(typeof "44abdc24");
console.log(Number(typeof "44abdc24"));

let num = "22abc";
console.log(parseInt(num));
console.log(num);

// Type of DataType
console.log(typeof Number);
console.log(typeof Boolean);
console.log(typeof String);
console.log(typeof BigInt);
console.log(typeof Symbol);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);

// Practice of Variables
// Let, var, const

let firstName = "Nikita";
let lastName = "Kanwar";
let age = 22;
let isHappy = true;
let a; //undefined

let userIntro = "Hi i am " + firstName + " " + lastName;
console.log(userIntro);

console.log(a);

const hours = 24;
// hours = 33// we can not change a constant/const
console.log(hours);

// const num;//we have to initialize const
// num =5;
// console.log(num);

// var is not understand scope of a block / in new versions of js we do not use it instead of it we used let.
// let is block scoped and var is function scoped

// We can use var before initailization of it , but not the let and const

console.log(varEx);// is shows undefined but not error
var varEx = 23;

// console.log(letEx);//it shows error and as it is same const does
// let letEx = 20;

// Temporal dead zone
// Debugger in JavaScript


// Dialog Boxes in JavaScript


// Closures, Lexical Scope, IIFE

// Lexical scope // child can access parent's variables but parnent does not access child's , and two childs are also not share their vaiables
// function Outer(){
//     let userName = "Nikita";
//     console.log(otherName);//Parent can not access child's variables

//     function Inner(){
//         let otherName = "Kanwar"
//         console.log("inner",userName);
//         console.log(otherName);

//     }
//     Inner()
// }
// Outer();
// // console.log("outer",userName);//Can not access

// Closure
// function makeFun() {
//   let name = "Nikita";

//   function displayName() {
//     console.log(name);
//   }
//   return displayName; //also returns the outer function
// }

// let myFun = makeFun();
// myFun();

//

// document.getElementById("orange").onclick =  function(){
//     document.body.style.backgroundColor = "orange"
// }

// document.getElementById("green").onclick =  function(){
//     document.body.style.backgroundColor = "green"
// }

// function clickHandler(color) {
//   // document.body.style.backgroundColor = `${color}`
//   return function setColor() {
//     document.body.style.backgroundColor = `${color}`;
//   };
// }

// document.getElementById("orange").onclick = clickHandler("orange");

// document.getElementById("green").onclick = clickHandler("green");

// IIEF - immediately invoke function expression
// used when we do not want globel scope polution into unother function.
// USed for remove gobel scope polution problem

// (function one (){
//     // named IIFE
//     console.log(`DB Connected`);
// })();

// ( (name) => {
//         console.log(`my name is,${name}`);

//     })('nikita')






// Tasks-1
// Counter Using closure

function createCounter() {
  let count = 0;
  function counter() {
    count++;
    console.log(count); 
  }
  return counter;
}

let myFun = createCounter();
myFun();
myFun();
myFun();
myFun();


// Task-2
// Use IIFE to log a message instantly

(function(name){
    console.log(`My Name is ${name}`);
})("Nikita");

// Task-2
//Show lexical scope with nested functions

function displayName(){
  let name = "Nikita"
  let lastName  = "Kanwar"
    function myName1(){
      console.log(name);
    }
    myName1();
    function myName2(){
      console.log(lastName);
    }
    myName2();
}

displayName();
// // Practice  of DataTypes

// console.log(typeof "Nikita");
// console.log(typeof 20);
// console.log(typeof true);
// console.log(typeof false);
// console.log(typeof "44abdc24");
// console.log(Number(typeof "44abdc24"));

// let num = "22abc";
// console.log(parseInt(num));
// console.log(num);

// // Type of DataType
// console.log(typeof Number);
// console.log(typeof Boolean);
// console.log(typeof String);
// console.log(typeof BigInt);
// console.log(typeof Symbol);
// console.log(typeof undefined);
// console.log(typeof null);
// console.log(typeof NaN);

// // Practice of Variables
// // Let, var, const

// let firstName = "Nikita";
// let lastName = "Kanwar";
// let age = 22;
// let isHappy = true;
// let a; //undefined

// let userIntro = "Hi i am " + firstName + " " + lastName;
// console.log(userIntro);

// console.log(a);

// const hours = 24;
// // hours = 33// we can not change a constant/const
// console.log(hours);

// // const num;//we have to initialize const
// // num =5;
// // console.log(num);

// // var is not understand scope of a block / in new versions of js we do not use it instead of it we used let.
// // let is block scoped and var is function scoped

// // We can use var before initailization of it , but not the let and const

// console.log(varEx);// is shows undefined but not error
// var varEx = 23;

// // console.log(letEx);//it shows error and as it is same const does
// // let letEx = 20;

// // Temporal dead zone
// // Debugger in JavaScript


// // Dialog Boxes in JavaScript - Three type of dialog boxes


// // const al = alert("This is a alert Message");
// //  const isConfirm = confirm("Would you like to proceed?")
// // const num =prompt("This is a Prompt Message")

// // console.log(al);
// // console.log(isConfirm);
// // console.log(num);

// Template Literals

// String - String Methods
// 1.Without Argument - 
// 2 With Argument -

// let str = "Hello";
// console.log(str.length); 

// let str1 = "Hello";
// console.log(str1.charAt(1));    
// console.log(str1.charCodeAt(1));
// console.log(str1.at(-1));       

// let str2 = "Hello";
// console.log(str2.toUpperCase()); 
// console.log(str2.toLowerCase()); 

// let text = "JavaScript is awesome";
// console.log(text.indexOf("is"));      
// console.log(text.lastIndexOf("a"));   
// console.log(text.includes("awesome"));
// console.log(text.startsWith("Java"));
// console.log(text.endsWith("some"));  
// console.log(text.search(/awesome/i));


// let str3 = "JavaScript";
// console.log(str3.slice(0, 4));     
// console.log(str3.slice(-6, -1));    
// console.log(str3.substring(4, 0)); 
// console.log(str3.substr(4, 6));     


// let str4 = "JavaScript";
// console.log(str4.slice(0, 4));      
// console.log(str4.slice(-6, -1));    
// console.log(str4.substring(4, 0));  
// console.log(str4.substr(4, 6));     


// // Math Object in JavaScript
// // Mathemetical Operators 
// console.log(Math.PI);
// console.log(Math.sqrt(16));
// console.log(Math.floor(3.535));
// console.log(Math.random());


// // Truthy and Falsy Values in JavaScript
// console.log(Boolean(1))
// console.log(Boolean(-22))
// console.log(Boolean(0))//Falsy
// console.log(Boolean(-0))//Falsy
// console.log(Boolean(NaN))//Falsy
// console.log(Boolean(Infinity))
// console.log(Boolean(undefined));//Falsy
// console.log(Boolean(null));//Falsy


// Comparison Operator
// const user1 = 18
// const user2 = 20
// console.log(user1== user2);

// Implicite Conversion - Automatically

// Strict equality check: ==== // also check data type // we have to do explicit conversion - parseInt()


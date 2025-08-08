


// Objects, Destructuring, Spread/Rest

// Mini Task 1: Destructure Object and Log Values

// const student = {
//   id: 101,
//   name: "Nikita",
//   grade: "A",
// };

// // Destructuring
// const { id, name, grade } = student;

// console.log("ID:", id);
// console.log("Name:", name);
// console.log("Grade:", grade);

// Create a function that uses rest parameters to sum numbers

// function sumAll(...numbers)//rest Parameter
//  {
//   return numbers.reduce((acc, num) => acc + num, 0);
// }

// console.log(sumAll(10, 20, 30)); 

// clone and merge two objects Using spread
// const obj1 = { a: 1, b: 2 };
// const obj2 = { c: 3, d: 4 };

// console.log(obj1);
// console.log(obj2);


// // Clone obj1
// const clone = { ...obj1 };
// console.log("Clone:", clone); 

// // Merge both
// const merged = { ...obj1, ...obj2 };
// console.log("Merged:", merged); 


// Combined Object - user profile app
// Step 1: Create user object
// const user = {
//   name: "Nikita",
//   age: 24,
//   email: "nikita@example.com",
//   city: "Mumbai"
// };

// // Step 2: Destructure values from user
// const { name, email } = user;
// console.log(`User: ${name}`);
// console.log(`Email: ${email}`);

// // Step 3: Update data using spread without modifying original
// const updatedUser = {
//   ...user,             
//   age: 25,             
//   city: "Delhi",       
//   country: "India"     
// };

// // Step 4: Show updated object
// console.log("Updated User:", updatedUser);

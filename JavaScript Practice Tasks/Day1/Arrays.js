// Arrays  Tasks
//Use map to square array of numbers
const nums = [1, 2, 3, 4];
const squares = nums.map(n => n * n);
console.log(squares); 

// Use filter to return even numbers
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); 

// Use reduce to get sum
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); 



// Combined Task: Student Score Manager

const marks = [30,45,25,50];

// 1. Increase each mark by 5
const updatedMarks = marks.map(mark => mark + 5); 

// 2. Filter passing marks > 40
const passingMarks = updatedMarks.filter(mark => mark > 40); 

// 3. Get total of passing marks
const total = passingMarks.reduce((sum, mark) => sum + mark, 0);

console.log("Original:", marks);
console.log("After Update Marks:", updatedMarks);
console.log("Passing Marks:", passingMarks);
console.log("Total of Passing Marks:", total);

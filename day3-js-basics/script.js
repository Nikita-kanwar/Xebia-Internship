let birthYear = prompt("Enter you Birth Year : ");
let birthMonth = prompt("Enter your Birth Month : ");

let currDate = new Date();

let currYear = currDate.getFullYear();
let currMonth = currDate.getMonth() + 1;

let AgeY = currYear - birthYear;
let AgeM = currMonth - birthMonth;

alert(`Your age is: ${AgeY} years and ${AgeM} months.`);

if (AgeY >= 18) {
  alert("You are eligible to vote");
} 
else {
  alert("Not eligible to vote");
}

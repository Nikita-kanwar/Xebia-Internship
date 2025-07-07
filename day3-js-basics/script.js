let birthYear 

while (true) {
  birthYear = prompt("Enter your Birth Year (4 digits): ");
  if (birthYear && !isNaN(birthYear) && birthYear.length === 4) {
    break;
  } 
  else {
    alert("Please enter a valid 4-digit year.");
  }
}

let birthMonth;

while (true) {
  birthMonth = prompt("Enter your Birth Month (1 to 12): ");

  if (birthMonth >= 0 && birthMonth <= 12) {
    break;
  } else {
    alert("Please enter a valid month between 1 and 12.");
  }
}

let currDate = new Date();

let currYear = currDate.getFullYear();
let currMonth = currDate.getMonth() + 1;

let AgeY = currYear - birthYear;
let AgeM = currMonth - birthMonth;

alert(`Your age is: ${AgeY} years and ${AgeM} months.`);

if (AgeY >= 18) {
  alert("You are eligible to vote");
} else {
  alert("Not eligible to vote");
}

let birthYear;

while (true) {
  birthYear = prompt(
    "Enter your Birth Year (4 digits between 1900 and the current year): "
  );
  if (
    birthYear &&
    !isNaN(birthYear) &&
    birthYear.length === 4 &&
    birthYear >= 1900 &&
    birthYear <= new Date().getFullYear()
  ) {
    break;
  } else {
    alert(
      "Please enter a valid 4-digit year between 1900 and the current year."
    );
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

AgeY = Math.floor(AgeY + AgeM / 12);

alert(`Your age is: ${AgeY} years.`);

if (AgeY >= 18) {
  alert("You are eligible to vote");
} else {
  alert("Not eligible to vote");
}

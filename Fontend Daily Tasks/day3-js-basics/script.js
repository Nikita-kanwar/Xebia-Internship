
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("checkBtn");
  const output = document.getElementById("output");

  btn.addEventListener("click", () => {
    
    let birthYear = parseInt(document.getElementById("birthYear").value);
    let birthMonth = parseInt(document.getElementById("birthMonth").value);

    // Check Birth Year
    if (
      !(birthYear && !isNaN(birthYear) && birthYear >= 1900 && birthYear <= new Date().getFullYear())
    ) {
      output.textContent = "Please enter a valid 4-digit year between 1900 and the current year.";
      output.style.color = "red";
      return;
    }

    console.log(`Your Birth Year is : ${birthYear}`);

    // Check Birth Month
    if (!(birthMonth >= 1 && birthMonth <= 12)) {
      output.textContent = " Please enter a valid month between 1 and 12.";
      output.style.color = "red";
      return;
    }

    console.log(`Your Birth Month is : ${birthMonth}`);

    // Calculate age
    let currDate = new Date();
    let currYear = currDate.getFullYear();
    let currMonth = currDate.getMonth() + 1;
    let ageYear = currYear - birthYear;
    let ageMonth = currMonth - birthMonth;

    ageYear = Math.floor(ageYear + ageMonth / 12);

    console.log(`Your Age is : ${ageYear}`);
    output.textContent = `Your Age is : ${ageYear} |`;
    output.style.color = "green";

    if (ageYear >= 18) {
      console.log("You are eligible to vote");
      output.textContent += " You are eligible to vote.";
    } else {
      console.log("Not eligible");
      output.textContent += " You are not eligible to vote.";
    }
  });
});

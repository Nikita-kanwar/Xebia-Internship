let num1 = parseFloat(prompt("Enter the first number:"));
let operator = prompt("Enter the operator (+, -, *, /):");
let num2 = parseFloat(prompt("Enter the second number:"));

let result;

if (isNaN(num1) || isNaN(num2)) {
  alert("Invalid input. Please enter valid numbers.");
} else {
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        result = "Cannot divide by zero.";
      } else {
        result = num1 / num2;
      }
      break;
    default:
      result = "Invalid operator. Use +, -, *, or /.";
  }

  alert("Result: " + result);
  console.log("Result:", result);
}

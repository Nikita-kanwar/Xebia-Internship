// Task 1: Create 3 elements dynamically and append to DOM
const container = document.getElementById("container");

const element1 = document.createElement("p");
element1.textContent = "I am paragraph 1 (created dynamically).";

const element2 = document.createElement("p");
element2.textContent = "I am paragraph 2 (created dynamically).";

const element3 = document.createElement("h3");
element3.textContent = "I am heading 3 (created dynamically).";

// Append elements to container
container.appendChild(element1);
container.appendChild(element2);
container.appendChild(element3);

// Task 2: Add/remove a class on button click
const toggleClassBtn = document.getElementById("toggleClassBtn");
const mainHeading = document.getElementById("mainHeading");

toggleClassBtn.addEventListener("click", () => {
    mainHeading.classList.toggle("highlight");
});

// Task 3: Change text content of an element
const changeTextBtn = document.getElementById("changeTextBtn");

changeTextBtn.addEventListener("click", () => {
    mainHeading.textContent = "Heading Text Changed!";
});

// FAQ Data
const faqData = [
    {
        question: "What is JavaScript?",
        answer: "JavaScript is a programming language used to create dynamic and interactive websites."
    },
    {
        question: "What is DOM manipulation?",
        answer: "DOM manipulation is the process of dynamically changing the content, structure, and style of a webpage using JavaScript."
    },
    {
        question: "What is an API?",
        answer: "An API (Application Programming Interface) allows different software applications to communicate with each other."
    }
];

// Select container
const faqContainer = document.getElementById("faqContainer");

// Create FAQ items dynamically
faqData.forEach(item => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const question = document.createElement("div");
    question.classList.add("faq-question");
    question.textContent = item.question;

    const answer = document.createElement("div");
    answer.classList.add("faq-answer");
    answer.textContent = item.answer;

    faqItem.appendChild(question);
    faqItem.appendChild(answer);
    faqContainer.appendChild(faqItem);

    // Toggle open/close on click
    question.addEventListener("click", () => {
        faqItem.classList.toggle("active");
    });
});

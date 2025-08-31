document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.getElementById("inputbox");
  const addBtn = document.getElementById("addbtn");
  const todoList = document.querySelector(".todoList");

  addBtn.addEventListener("click", () => {
    const taskText = inputBox.value.trim();

    if (taskText !== "") {
      const newTask = document.createElement("li");

      newTask.innerHTML = ` <p>${taskText}</p><button class="btn deletebtn">Cancel</button>`;

      todoList.appendChild(newTask);

      inputBox.value = "";

      checkEmptyList();
    }
  });

  inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });

  todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("deletebtn")) {
      const confirmation = confirm(
        "Are you sure you want to delete this task?"
      );
      if (confirmation) {
        event.target.parentElement.remove();
        checkEmptyList();
      }
    }
  });

  function checkEmptyList() {
    const noTasksMessage = document.getElementById("noTasksMessage");

    if (todoList.children.length === 0) {
      noTasksMessage.style.display = "block";
    } else {
      noTasksMessage.style.display = "none";
    }
  }

  checkEmptyList();
});

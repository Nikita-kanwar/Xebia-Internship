 
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    addBtn.addEventListener('click', () => {
      const taskText = todoInput.value.trim();
      if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="task-text">${taskText}</span>
          <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
      }
    });

    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
      }

      if (e.target.classList.contains('task-text')) {
        const li = e.target.parentElement;
        li.classList.add('clicked');
        setTimeout(() => li.classList.remove('clicked'), 300);
      }
    });
  
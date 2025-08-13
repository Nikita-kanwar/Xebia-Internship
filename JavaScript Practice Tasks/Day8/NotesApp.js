    const noteInput = document.getElementById('note-input');
    const addBtn = document.getElementById('add-btn');
    const notesList = document.getElementById('notes-list');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    renderNotes();

    addBtn.addEventListener('click', () => {
      const noteText = noteInput.value.trim();
      if (noteText !== '') {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
      }
    });

    notesList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
      }
    });

    function renderNotes() {
      notesList.innerHTML = '';
      notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${note} <button data-index="${index}">Delete</button>
        `;
        notesList.appendChild(li);
      });
    }

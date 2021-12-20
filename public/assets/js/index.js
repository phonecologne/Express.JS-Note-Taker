let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    saveNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');
}

//to show an element
const show = (elem) => {
    elem.style.display = 'inline';
};

//now let's hide an element
const hide = (elem) => {
    elem.style.display ='none';
};

//tracking user's notes in the TextArea will be done in the Active Note field below
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
fetch('/api/notes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
});

const deleteNote = (id) =>
fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
});

const renderActiveNote = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
        noteTitle.setAttribute('readonly', true);
        noteText.setAttribute('readonly', true);
        noteTitle.vaule = activeNote.title;
        noteText.vaule = activeNote.text;
    } else {
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
        noteTitle.vaule = '';
        noteText.vaule = '';
    }
};

const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.vaule,
        text: noteText.vaule,
    };
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//we want to allow the user to delete certain notes
const handleNoteDelete = (e) => {
    //this will prevent the user from clicking and accidently deleting their note when clicking more than once
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    });
};

//now we should code the active note and it will show up on the page
const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
};

//lets not forget to set the note field as blank at the start so the user can input their notes into the fields
const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
};

const handleRenderSaveBtn = () => {
    if (!noteTitle.vaule.trim() || !noteText.vaule.trim()) {
        hide(saveNoteBtn);
    } else {
        show(saveNoteBtn);
    }
};

//creating the list of user inputted notes
const renderNoteList = async (notes) => {
    let jsonNotes = await notes.json();
    if (window.location.pathname === '/notes') {
        noteList.forEach((el) => (el.innerHTML = ''));
    }

    let noteListItmes = [];

    //now lets go back to the HTML page and not have to click on delete
    const createLi = (text, delBtn = true) => {
        const liEl = document.createElement('li');
        liEl.classList.add('list-group-item');

        const spanEl = document.createElement('span');
        spanEl.innerText = text;
        spanEl.addEventListener('click', handleNoteView);

        liEl.append(spanEl);

        if (delBtn) {
            const delBtnEl = document.createElement('i');
            delBtnEl.classList.add(
                'fas',
                'fa-trash-alt',
                'float-right',
                'text-danger',
                'delete-note'
            );
            delBtnEl.addEventListener('click', handleNoteDelete);

            liEl.append(delBtnEl);
        }

        
    }
}
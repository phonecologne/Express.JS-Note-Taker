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


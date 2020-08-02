const textArea = document.getElementById("write-note");
const noteBtn = document.getElementById("create-note");
const myNotes = document.getElementById("my-notes");

const trashBtn = document.querySelector(".trash-note");
const colorPicker = document.querySelector("#color");
const note = document.querySelector(".note-contents");

let color;

//event listeners
colorPicker.addEventListener("change", changeBgColor);
noteBtn.addEventListener("click", createNote);
document.addEventListener("click", removeNote);
document.addEventListener("DOMContentLoaded", getNotesAndColor);

//functions

function createNote(e) {
  e.preventDefault();
  const text = textArea.value;
  console.log(text);
  if (text == "") {
    return;
  }
  // create new elemts to append to where we need to put the notes
  var myNoteDiv = document.createElement("div");
  myNoteDiv.classList.add("notes");
  myNoteDiv.style.backgroundColor = color;

  let noteContainer = document.createElement("div");
  noteContainer.classList.add("note-contents");

  let individualNote = document.createElement("p");
  individualNote.classList.add("note-text");
  individualNote.innerText = text;
  noteContainer.appendChild(individualNote);

  // add todo
  saveToLocalStorage(text, color);

  let noteBtn = document.createElement("button");
  noteBtn.classList.add("trash-note");
  noteBtn.innerHTML = `<i class='fa fa-trash fa-lg'></i>`;
  noteBtn.style.backgroundColor = color;
  noteContainer.appendChild(noteBtn);

  // append everything to myNotes div already on html
  myNoteDiv.appendChild(noteContainer);
  myNotes.appendChild(myNoteDiv);

  textArea.value = "";
}

function removeNote(e) {
  let item = e.target;
  let selectedNote = e.target.parentElement.parentElement;
  if (item.classList[0] == "trash-note") {
    selectedNote.remove();
  }
}

function changeBgColor() {
  color = colorPicker.value;
  console.log(color);
  return color;
}

function saveToLocalStorage(text, color) {
  // check if there is currently a local storage
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = []; // creates an array for it
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  let hexColor;
  if (localStorage.getItem("hexColor") === null) {
    hexColor = [];
  } else {
    hexColor = JSON.parse(localStorage.getItem("hexColor"));
  }
  notes.push(text); //push the noteText into my array
  localStorage.setItem("notes", JSON.stringify(notes, hexColor));

  // create local color;

  hexColor.push(color);
  localStorage.setItem("hexColor", JSON.stringify(hexColor));
}

function getNotesAndColor() {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = []; // creates an array for it
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  let hexColor;
  if (localStorage.getItem("hexColor") === null) {
    hexColor = [];
  } else {
    hexColor = JSON.parse(localStorage.getItem("hexColor"));
  }

  notes.forEach((note) => {
    let myNoteDiv = document.createElement("div");
    myNoteDiv.classList.add("notes");
    myNoteDiv.style.backgroundColor = color;

    let noteContainer = document.createElement("div");
    noteContainer.classList.add("note-contents");

    let individualNote = document.createElement("p");
    individualNote.classList.add("note-text");
    individualNote.innerText = note;
    noteContainer.appendChild(individualNote);

    // add todo

    let noteBtn = document.createElement("button");
    noteBtn.classList.add("trash-note");
    noteBtn.innerHTML = `<i class='fa fa-trash fa-lg'></i>`;
    noteBtn.style.backgroundColor = color;
    noteContainer.appendChild(noteBtn);

    // append everything to myNotes div already on html
    myNoteDiv.appendChild(noteContainer);
    myNotes.appendChild(myNoteDiv);
  });
}

////////////////////////////////////////////////////////////////////////////          ↓↓↓ prevent printing note if inputs empty. else, print note ↓↓↓

function preventNote() {
  if (form.elements["title"].value == "") {
    alert("Title field empty!");
    return true;
  } else if (form.elements["Text1"].value == "") {
    alert("Text Area field empty!");
    return true;
  } else if (form.elements["date"].value == "") {
    alert("Date field empty!");
    return true;
  } else {
    return false;
  }
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ define limit of scroll to show page up button ↓↓↓

function scrollFunction() {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    scrollBackToTop.style.display = "block";
  } else {
    scrollBackToTop.style.display = "none";
  }
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ define page up ↓↓↓

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ remove tab from DOM ↓↓↓

function closetab(e) {
  noteCloseEvent = e.target.parentElement;
  // x.style.display = "none";
  noteCloseEvent.remove();
  return noteCloseEvent;
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ Remove tab from Local Storage ↓↓↓
function removeTabFromLocalStorage(e) {
  let notes = JSON.parse(window.localStorage.getItem("notes"));
  for (let removenote = 0; removenote < notes.length; removenote++) {
    if (notes[removenote].id == e.target.id) {
      notes.splice(removenote, 1);
      window.localStorage.setItem("notes", JSON.stringify(notes));
    }
  }
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ note counter for note and local storage ID cross ↓↓↓

function notesCounter() {
  counter++;
  console.log(counter);
  return counter;
}
function saveCounterToLocalStorage(counter) {
  JSON.parse(window.localStorage.getItem("counter"));
  window.localStorage.setItem("counter", JSON.stringify(counter));
}

////////////////////////////////////////////////////////////////////////////          ↓↓↓ create and add note to DOM and local storage ↓↓↓

function addNoteOnClick() {
  if (!preventNote()) {
    notesCounter(counter);
    saveCounterToLocalStorage(counter);
    let newNote = getValFromDOM();
    saveNoteValuesToLocalStorage(newNote);
    createNote(newNote);
  }
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ get values from inputs ↓↓↓
function getValFromDOM() {
  let title = document.getElementById("title").value;

  let disc = document.getElementById("textarea").value;

  let date = document.getElementById("date").value;

  let hour = document.getElementById("hour").value;

  let id = counter;

  return { title, disc, date, hour, id };
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ save note values into local storage ↓↓↓

function saveNoteValuesToLocalStorage(newNote) {
  let notes = JSON.parse(window.localStorage.getItem("notes"));
  notes.push(newNote);
  window.localStorage.setItem("notes", JSON.stringify(notes));
}

////////////////////////////////////////////////////////////////////////////          ↓↓↓ reverse Date ↓↓↓

function reverseDate(date) {
  let reverseDate = date;
  return reverseDate.split("-").reverse().join("-");
}
////////////////////////////////////////////////////////////////////////////          ↓↓↓ create new sticky note ↓↓↓

function createNote(newNote) {
  //time div
  let parDate = document.createElement("p");
  parDate.setAttribute("class", "lead");
  parDate.setAttribute("class", "logdate");
  parDate.textContent = reverseDate(newNote.date);

  let parHour = document.createElement("p");
  parHour.setAttribute("class", "lead");
  parHour.setAttribute("class", "logtime");
  parHour.textContent = newNote.hour;

  let divTime = document.createElement("div");
  divTime.setAttribute("class", "time");
  divTime.appendChild(parDate);
  divTime.appendChild(parHour);

  //content div
  let parDisc = document.createElement("p");
  parDisc.setAttribute("class", "lead");
  parDisc.setAttribute("class", "notedisc");
  parDisc.textContent = newNote.disc;

  let headTitle = document.createElement("h5");
  headTitle.setAttribute("class", "display-4");
  headTitle.setAttribute("class", "notetitle");
  headTitle.textContent = newNote.title;

  let divNotecontent = document.createElement("div");
  divNotecontent.setAttribute("class", "notewords");
  divNotecontent.appendChild(headTitle);
  divNotecontent.appendChild(parDisc);

  //create X with font awesome to close tab
  let closeTabIcon = document.createElement("i");
  closeTabIcon.setAttribute("class", "closex fas fa-times fa-2x");
  closeTabIcon.setAttribute("id", counter);
  closeTabIcon.style = "cursor: pointer";
  closeTabIcon.id;

  closeTabIcon.addEventListener("click", closetab);
  closeTabIcon.addEventListener("click", removeTabFromLocalStorage);

  //card div
  let divNote = document.createElement("div");
  divNote.setAttribute("class", "note");
  divNote.appendChild(divNotecontent);
  divNote.appendChild(divTime);
  divNote.appendChild(closeTabIcon);

  let divNotecontainer = document.getElementById("noteContainer");
  divNotecontainer.appendChild(divNote);
}
//FUNCTIONS ABOVE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CODE BELOW

let counter;
// check if local storage counter is empty. if so, create counter key.
if (localStorage.getItem("counter") === null) {
  counter = 0;
  window.localStorage.setItem("counter", JSON.stringify([]));
}

// check if local storage is empty. if not, get data from local storage to DOM
if (localStorage.getItem("notes") === null) {
  window.localStorage.setItem("notes", JSON.stringify([]));
} else {
  let fetchNotes = JSON.parse(window.localStorage.getItem("notes"));

  // for (let i = 0; i < fetchNotes.length; i++) {
  //   createNote(fetchNotes[i]);
  // }
  for (const newNote of fetchNotes) {
    createNote(newNote);
  }
}
scrollBackToTop = document.getElementById("pageup");
window.onscroll = function () {
  scrollFunction();
};
document.getElementById("add").addEventListener("click", addNoteOnClick);
document.getElementById("pageup").addEventListener("click", topFunction);

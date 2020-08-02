function preventNote() {
  if (form.elements["title"].value == "") {
    alert("Title field empty!");
  } else if (form.elements["Text1"].value == "") {
    alert("Text Area field empty!");
  } else if (form.elements["date"].value == "") {
    alert("Date field empty!");
  } else {
    addTask();
  }
}

function scrollFunction() {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function closetab(e) {
  x = e.target.parentElement;
  // x.style.display = "none";
  x.remove();
}

function addTask() {
  ////////////////////////////////////////////////////////////////////      get values from inputs
  let title = document.getElementById("title").value;

  let disc = document.getElementById("textarea").value;

  let date = document.getElementById("date").value;

  let hour = document.getElementById("hour").value;

  ///////////////////////////////////////////////////////////////////       reverse Date
  function reverseDate() {
    let reverseDate = date;
    return reverseDate.split("-").reverse().join("-");
  }
  ////////////////////////////////////////////////////////////////////     create new sticky note

  //time div
  let parDate = document.createElement("p");
  parDate.setAttribute("class", "lead");
  parDate.setAttribute("class", "logdate");
  parDate.textContent = reverseDate();

  let parHour = document.createElement("p");
  parHour.setAttribute("class", "lead");
  parHour.setAttribute("class", "logtime");
  parHour.textContent = hour;

  let divTime = document.createElement("div");
  divTime.setAttribute("class", "time");
  divTime.appendChild(parDate);
  divTime.appendChild(parHour);

  //content div
  let parDisc = document.createElement("p");
  parDisc.setAttribute("class", "lead");
  parDisc.setAttribute("class", "notedisc");
  parDisc.textContent = disc;

  let headTitle = document.createElement("h5");
  headTitle.setAttribute("class", "display-5");
  headTitle.setAttribute("class", "notetitle");
  headTitle.textContent = title;

  let divNotecontent = document.createElement("div");
  divNotecontent.setAttribute("class", "notewords");
  divNotecontent.appendChild(headTitle);
  divNotecontent.appendChild(parDisc);

  //create X with font awesome to close tab
  let span = document.createElement("i");
  span.setAttribute("class", "closex fas fa-times fa-2x");
  span.addEventListener("click", closetab);

  //card div
  let divNote = document.createElement("div");
  divNote.setAttribute("class", "note");
  divNote.appendChild(divNotecontent);
  divNote.appendChild(divTime);
  divNote.appendChild(span);

  let divNotecontainer = document.getElementById("noteContainer");
  divNotecontainer.appendChild(divNote);
}
///////////////////////////////////////////////////////////////////////////////////////
mybutton = document.getElementById("pageup");

window.onscroll = function () {
  scrollFunction();
};
document.getElementById("add").addEventListener("click", preventNote);
document.getElementById("pageup").addEventListener("click", topFunction);

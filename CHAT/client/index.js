//
// index.js
//
//     Copyright (C) CGSG of PML30. All rights reserved.
//
// Main client module.
//

// Base variables
let socket = null,
  initSocket = false;
let elem = document.getElementById("users text");

// Set event to load page
window.addEventListener("load", () => {});

// Initialize communication function
function initializeCommunication() {
  socket = new WebSocket("ws://localhost:8080");

  // Opening socket processing
  socket.onopen = (event) => {
    console.log("Socket open");
    initSocket = true;
  };

  // Message from server processing
  socket.onmessage = (event) => {
    const elem = document.getElementById("users text");
    elem.innerHTML = event.data;
  };
} // End of 'initializeCommunication' function

// Init communication calling
initializeCommunication();

// Clicking key event processing function
function inputKeyUp(event) {
  if (event.key === "Enter") {
    document.getElementById("myButton").click();
  }
}

// Clicking key event processing function
function inputKeyUp1(event) {
  if (event.key === "Enter") {
    document.getElementById("myButton1").click();
  }
}

// Button click processing function
function onClickButton() {
  if (initSocket == true) {
    let element = document.getElementById("myInput");
    if (element.value == "") return;
    let name = document.getElementById("myName").value;
    if (name == "") name = "Anonymous";
    const text = "SM<p> (" + name + ") " + element.value + " </p>";
    element.value = "";
    socket.send(text);
  }
} // End of 'onClickButton' function

// Button click processing function
function onClickButton1() {
  if (initSocket == true) {
    let element = document.getElementById("myImage");
    if (element.value == "") return;
    let name = document.getElementById("myName").value;
    if (name == "") name = "Anonymous";
    const text = "SM<p> (" + name + `) <img src="` + element.value + `" </p>`;
    element.value = "";
    socket.send(text);
  }
} // End of 'onClickButton' function

// END OF 'index.js' FILE

"use strict";
const sendButton = document.getElementById("sendButton");
const confirmationWindow = document.getElementById("confirmationWindow");
const confirmButton = document.getElementById("confirmButton");

sendButton.addEventListener("click", (event) => {   //send message listener
  event.preventDefault();
  console.log("000")
  console.log(document.getElementById("message"));
  jsonString = JSON.stringify({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("messageBox").value,
  });
  fetch("/contactUs", { //fetch send contact request
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  });

  confirmationWindow.classList.remove("d-none"); //show ok window
});

confirmButton.addEventListener("click", (event) => {   //hide ok window
  event.preventDefault();

  
  confirmationWindow.classList.add("d-none");
});

const sendButton = document.getElementById("sendButton");
const confirmationWindow = document.getElementById("confirmationWindow");
const confirmButton = document.getElementById("confirmButton");

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("000")
  console.log(document.getElementById("message"));
  jsonString = JSON.stringify({
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("messageBox").value,
  });
  fetch("/contactUs", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  });

  confirmationWindow.classList.remove("d-none");
});

confirmButton.addEventListener("click", (event) => {
  event.preventDefault();

  
  confirmationWindow.classList.add("d-none");
});

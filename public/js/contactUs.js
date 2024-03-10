const sendButton = document.getElementById("sendButton");
const confirmationWindow = document.getElementById("confirmationWindow");
const confirmButton = document.getElementById("confirmButton");

sendButton.addEventListener("click", (event) => {
    event.preventDefault();
    //Send Message
    confirmationWindow.classList.remove("d-none");
    
  });

  confirmButton.addEventListener("click", (event) => {

    event.preventDefault();
    confirmationWindow.classList.add("d-none");
  });
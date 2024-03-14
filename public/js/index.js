
const registerWindowButton = document.getElementById("signup-button");

const loginWindow = document.getElementById("login-window");
const loginButton = document.getElementById("login-button");
const loginWithGoogle = document.getElementById("login-with-google");

const registerWindow = document.getElementById("register-window");
const registerButton = document.getElementById("register-button");
const registerBackButton = document.getElementById("back-button");


registerWindowButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerWindow.classList.remove("d-none");
  loginWindow.classList.add("d-none");
});

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});



registerBackButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerWindow.classList.add("d-none");
  loginWindow.classList.remove("d-none");
});

loginWithGoogle.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});


const loginWindowButton = document.getElementById("loginButton");
const registerWindowButton = document.getElementById("registerButton");

const loginWindow = document.getElementById("loginWindow");
const loginButton = document.getElementById("LoginAttempt");
const loginBackButton = document.getElementById("LoginBackButton");
const loginWithGoogle = document.getElementById("loginWithGoogle");

const registerWindow = document.getElementById("registerWindow");
const registerButton = document.getElementById("RegiserAttempt");
const registerBackButton = document.getElementById("RegisterBackButton");
const registerWithGoogle = document.getElementById("registerWithGoogle");

loginWindowButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginWindow.classList.remove("d-none");
  loginWindowButton.classList.add("d-none");
  registerWindowButton.classList.add("d-none");
});

registerWindowButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerWindow.classList.remove("d-none");

  loginWindowButton.classList.add("d-none");
  registerWindowButton.classList.add("d-none");
});

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});

loginBackButton.addEventListener("click", (event) => {
  event.preventDefault();
  loginWindow.classList.add("d-none");
  loginWindowButton.classList.remove("d-none");
  registerWindowButton.classList.remove("d-none");
});

registerBackButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerWindow.classList.add("d-none");
  loginWindowButton.classList.remove("d-none");
  registerWindowButton.classList.remove("d-none");
});

loginWithGoogle.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});

registerWithGoogle.addEventListener("click", (event) => {    
  event.preventDefault();
  document.location.href = "/mainPage";
});
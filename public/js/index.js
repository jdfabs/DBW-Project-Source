const registerWindowButton = document.getElementById("signup-button");

const loginWindow = document.getElementById("login-window");
const registerWindow = document.getElementById("register-window");
const registerBackButton = document.getElementById("back-button");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginWithGoogle = document.getElementById("login-with-google");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const jsonString = JSON.stringify(formDataObject);

  fetch("/login", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url; // Redirect
    } else {
      res.json().then((data) => {
        if (res.status === 401) {
          // Authentication failed
          const errorMessage = data.message;
          alert(errorMessage);
        }
      });
    }
  });
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  //Pre Check
  let isValid = true;
  let preCheckAlert = "";

  const usernameRegex = /^[a-zA-Z0-9_-]{5,16}$/;
  const passwordRegex = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if(!usernameRegex.test(formDataObject.username)){
    alert("Username must be between 5 and 16 characters long and can only contain letters, numbers, underscores, or hyphens.");
    isValid = false;
  }
  if(!passwordRegex.test(formDataObject.password)){
    alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
    isValid = false;
    alert(formDataObject.password);
  }
  if(!emailRegex.test(formDataObject.email)){
    alert("Please enter a valid email address.");
    isValid = false;
  }
  if(formDataObject.password != formDataObject.passwordCheck) {
    alert("Passwords don't match.");
    isValid = false;
  }

  if (!isValid) return;

  const jsonString = JSON.stringify(formDataObject);

  fetch("/register", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.redirected) {
      window.location.href = res.url; // Redirect
    } else {
      res.json().then((data) => {
        if (res.status === 400) {
          // Register failed
          alert(data.message.message);
        }
      });
    }
  });
});

registerWindowButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerWindow.classList.remove("d-none");
  loginWindow.classList.add("d-none");
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

/*
loginForm.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});*/
/*
registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.location.href = "/mainPage";
});*/


document.getElementById("forgotPassword").addEventListener("click", (event) => {
  event.preventDefault();  
  jsonString = JSON.stringify({username : document.getElementById("username").value});
  
fetch("/forgotPassword", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  })
});
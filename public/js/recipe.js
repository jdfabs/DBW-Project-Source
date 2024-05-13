"use strict";
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const recipe = document.querySelector("#recipe");

const pages = document.querySelectorAll(".paper");

//Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//Logic
let currentLocation = 1;
let numOfPages = pages.length;
let maxLocation = numOfPages + 1;

function openBook() {
  recipe.style.transform = "translateX(50%)"; //move book to center
  prevBtn.style.transform = "translateX(-175px)";
  nextBtn.style.transform = "translateX(175px)";
}

function closeBook(isAtBeggining) {
  if (isAtBeggining) {
    recipe.style.transform = "translateX(0%)"; //move book to center
  } else {
    recipe.style.transform = "translateX(100%)"; 
  }

  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    if (currentLocation == 1) {
      openBook(true);
    }
    if (currentLocation == numOfPages) {
      closeBook(false);
    }
    pages[currentLocation - 1].classList.add("flipped");
    pages[currentLocation - 1].style.zIndex = currentLocation;
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    if (currentLocation == 2) {
      closeBook(true);
    }
    if (currentLocation == numOfPages + 1) {
      openBook(false);
    }
    pages[currentLocation - 2].classList.remove("flipped");
    pages[currentLocation - 2].style.zIndex = numOfPages - currentLocation + 3;

    currentLocation--;
  }
}

document.getElementById("commentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const newComment = { comment: document.getElementById("comment").value };

  fetch(window.location.pathname + "/comment", {
    method: "POST",
    body: JSON.stringify(newComment), // Convert the object to JSON string
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          console.log(data);
          const commentList = document.getElementById("commentList");
          const newCommentElement = document.createElement("div");
          newCommentElement.innerHTML = `
          <div class="d-flex"> 
            <strong class="mx-2">${data.user}: </strong>
            ${data.comment}
          </div>`;
          commentList.prepend(newCommentElement);
          document.getElementById("comment").value = "";
        });
      } else {
        console.log("Failed to add comment");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.getElementById("likeBtn").addEventListener("click", (event) => {
  event.preventDefault();
  fetch(window.location.pathname + "/like", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("Like response");
    if (res.status == 200) {
      const icon = document.getElementById("likeIcon");
      if(icon.classList[1] == "bi-hand-thumbs-up"){
        icon.classList.remove("bi-hand-thumbs-up");
        icon.classList.add("bi-hand-thumbs-up-fill");
      }
      else {
        icon.classList.remove("bi-hand-thumbs-up-fill");
        icon.classList.add("bi-hand-thumbs-up");
      }
    } else {
      console.log("Failed to add comment");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
});

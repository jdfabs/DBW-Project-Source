"use strict";
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const recepie = document.querySelector("#recepie");

const pages = document.querySelectorAll(".paper");

//Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//Logic
let currentLocation = 1;
let numOfPages = pages.length;
let maxLocation = numOfPages + 1;

function openBook() {
  recepie.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-175px)";
  nextBtn.style.transform = "translateX(175px)";
}

function closeBook(isAtBeggining) {
  if (isAtBeggining) {
    recepie.style.transform = "translateX(0%)";
  } else {
    recepie.style.transform = "translateX(100%)";
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

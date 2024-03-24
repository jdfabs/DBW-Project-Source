"use strict";
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const recepie = document.querySelector("#recepie");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4");

//Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

//Logic
let currentLocation = 1;
let numOfPages = 4;
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
    switch (currentLocation) {
      case 1:
        openBook(true);
        paper1.classList.add("flipped");
        paper1.style.zIndex = 1;
        break;
      case 2:
        paper2.classList.add("flipped");
        paper2.style.zIndex = 2;
        break;
      case 3:
        paper3.classList.add("flipped");
        paper3.style.zIndex = 3;

        break;
      case 4:
        paper4.classList.add("flipped");
        paper4.style.zIndex = 4;
        closeBook(false);
        break;
      default:
        new Error("unknown state");
    }
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    switch (currentLocation) {
      case 2:
        paper1.classList.remove("flipped");
        paper1.style.zIndex = 5;
        closeBook(true);
        break;
      case 3:
        paper2.classList.remove("flipped");
        paper2.style.zIndex = 4;
        break;
      case 4:
        paper3.classList.remove("flipped");
        paper3.style.zIndex = 3;

        break;
      case 5:
        paper4.classList.remove("flipped");
        paper4.style.zIndex = 2;

        openBook(false);
        break;
      default:
        new Error("unknown state");
    }
    currentLocation--;
  }
}

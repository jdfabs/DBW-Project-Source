"use strict";
import {
  submitUserInputToServer,
  receiveFromServer,
  changeRoom,
} from "./socketHandler.js";
import { form, topic } from "./ui.js";

form[0].addEventListener("submit", function (event) {
  //socketHandler files should be merged ¯\_(ツ)_/¯
  event.preventDefault();
  submitUserInputToServer(window.username); //send message
});

topic.onchange = function () {
  changeRoom(topic.value);
}; //listener to change room
receiveFromServer();

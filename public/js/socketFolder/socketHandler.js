"use strict";
import { mensagem, chtbox } from "./ui.js";

let socket = io();
let currentRoom = "DefaultRoom";

export function submitUserInputToServer(username) {
  console.log("socketHandler Frontend - submitUserInputToServer");

  if (mensagem.value) {
    socket.emit("chat", {
      //if has message send
      username: username,
      message: mensagem.value,
      room: currentRoom,
    });
    mensagem.value = ""; //reset msg box
  }
}

export function receiveFromServer() {
  console.log("socketHandler Frontend - receiveFromServer");
  socket.on("clientChat", function (paraCliente) {
    //get new messge
    chtbox.innerHTML =
      chtbox.innerHTML +
      "<br>" +
      "user :" +
      paraCliente.socketID +
      "<br>" +
      "message :" +
      paraCliente.message +
      "<br>" +
      "date: " +
      Date();
  });
}

export async function changeRoom(room) {
  console.log("socketHandler Frontend - changeRoom");
  console.log("joining " + room);
  socket.emit("leaveRoom", currentRoom); //leave current
  socket.emit("joinRoom", room); //join new
  chtbox.innerHTML = ""; //reset chat window
  await fetch("/supportChat/" + room, {
    //get old msgs
    method: "POST",
    body: JSON.stringify({ roomname: room }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    //render old messages
    var a = res.json().then((value) => {
      value.forEach((element) => {
        console.log(element);
        chtbox.innerHTML = chtbox.innerHTML + "user: " + element.user + "<br>";
        chtbox.innerHTML =
          chtbox.innerHTML + "message: " + element.message + "<br>";
        chtbox.innerHTML =
          chtbox.innerHTML + "date: " + element.timestamp + "<br>";
        chtbox.innerHTML = chtbox.innerHTML + "<br>";
      });
    });
  });
  currentRoom = room;
}

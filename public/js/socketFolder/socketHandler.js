import{mensagem,chtbox}from"./ui.js";


let socket=io();

let currentRoom = "DefaultRoom";

export function submitUserInputToServer(){
    if(mensagem.value){
        socket.emit("chat",{message: mensagem.value, room: currentRoom});
        mensagem.value="";
    }
}

export function receiveFromServer(){
    socket.on("clientChat", function(paraCliente){
    chtbox.innerHTML=
    chtbox.innerHTML + 
    "<br>" + 
    "ID:"+
    paraCliente.socketID+
    "<br>"+
    "Message:"+
    paraCliente.message;
    }); 
}

export function changeRoom(room) {
    console.log("joining " + room);
    socket.emit("leaveRoom", currentRoom); 
    socket.emit("joinRoom", room);
    chtbox.innerHTML =
    "<h3>"+
    "Bem vindo ao chat!"+
    "</h3>"; 
    currentRoom = room;
}

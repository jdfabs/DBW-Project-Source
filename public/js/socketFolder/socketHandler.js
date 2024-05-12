import{mensagem,chtbox}from"./ui.js";



let socket=io();

let currentRoom = "DefaultRoom";



export function submitUserInputToServer(username){
    console.log( " CLIENTE mensagem.value " + mensagem.value);
    if(mensagem.value){
        console.log( " CLIENTE username:username " + username);

        socket.emit("chat",{username:username, message: mensagem.value, room: currentRoom});
        mensagem.value="";
    }
}


/*export function submitUserInputToServer(){
    if(mensagem.value){
        socket.emit("chat",{message: mensagem.value, room: currentRoom});
        mensagem.value="";
    }
}*/

export function receiveFromServer(){
    socket.on("clientChat", function(paraCliente){
    chtbox.innerHTML=
    chtbox.innerHTML + 
    "<br>" + 
    "user :"+
    paraCliente.socketID+
    "<br>"+
    "message :"+
    paraCliente.message+
    "<br>"+
    "date: "+Date()
    }); 
}

export async function changeRoom(room) {
    console.log("joining " + room);
    socket.emit("leaveRoom", currentRoom); 
    socket.emit("joinRoom", room);
    chtbox.innerHTML = "";
    await fetch("/supportChat/" + room, {
        method: "POST",
        body: JSON.stringify({roomname:room}),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) =>{
            var a = res.json().then((value)=>{value.forEach(element => {
                console.log(element)
                chtbox.innerHTML = chtbox.innerHTML + "user: "+ element.user + "<br>"
                chtbox.innerHTML = chtbox.innerHTML + "message: " + element.message + "<br>"
                chtbox.innerHTML = chtbox.innerHTML + "date: " + element.timestamp + "<br>"
                chtbox.innerHTML = chtbox.innerHTML + "<br>";

            });})
            console.log(a)
        })
    currentRoom = room;
}

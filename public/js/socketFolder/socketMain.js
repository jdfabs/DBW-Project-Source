import{submitUserInputToServer,receiveFromServer,changeRoom}from"./socketHandler.js";
import{form,topic}from"./ui.js";


console.log("conected");


const username = window.username;
console.log(username); // Now you can use the username variable here


form[0].addEventListener("submit", function(event){
    event.preventDefault();
    submitUserInputToServer(username);
});

topic.onchange = function () { changeRoom(topic.value) };
receiveFromServer();    


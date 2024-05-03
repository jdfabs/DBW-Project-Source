console.log("conected");
import{submitUserInputToServer,receiveFromServer,changeRoom}from"./socketHandler.js";
import{form,topic}from"./ui.js";

form[0].addEventListener("submit", function(event){
    event.preventDefault();
    submitUserInputToServer();
});

topic.onchange = function () { changeRoom(topic.value) };
receiveFromServer();    
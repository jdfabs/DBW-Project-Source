"use strict"
const express = require("express"); //View engine
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan"); //Debug Tool

const config = require("./config"); //App Config File
const router = require("./routes/router");


const app = express(); //Instance of the app
/*
const openai = new OpenAIApi({
  api_key: config.openAI_API_Key,
});//Instance of OpenAI API
*/
//Setup
app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
}); //Listening port set on config file
app.set("view engine", "ejs"); //Setting up ejs

app.use(express.json()); //Use json format
app.use(express.static("public")); //Setting up public folder
app.use(morgan("dev")); //Setup debug tool

app.use(router);//App Router 
app.use(methodOverride("_method"));

mongoose.connect(
"mongodb+srv://skipper:2hfMiT2CJFTL9EJE@dbwrecepiegenerator.1gag8xs.mongodb.net/?retryWrites=true&w=majority&appName=DBWRecepieGenerator",
{ useUnifiedTopology: true, useNewUrlParser: true }
)
.then(() => {
console.log("Connected");
})
.catch((err) => {
console.log(err);
});



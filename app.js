"use strict"
const express = require("express"); //View engine
const morgan = require("morgan"); //Debug Tool

const config = require("./config"); //App Config File
const router = require("./routes/router");

const app = express(); //Instance of the app

//Setup
app.listen(config.port, () => {
  console.log("Server listening on port " + config.port);
}); //Listening port set on config file
app.set("view engine", "ejs"); //Setting up ejs

app.use(express.json()); //Use json format
app.use(express.static("public")); //Setting up public folder
app.use(morgan("dev")); //Setup debug tool

app.use(router);//App Router 

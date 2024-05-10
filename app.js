"use strict";
const express = require("express"); //View engine
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan"); //Debug Tool
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const bodyParser = require('body-parser');

const config = require("./config"); //App Config File
const router = require("./routes/router");
const user = require("./model/userModel");

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //Setting up public folder
app.use(morgan("dev")); //Setup debug tool
app.use(methodOverride("_method"));

mongoose
  .connect(
    "mongodb+srv://" +
      config.dbUser +
      ":" +
      config.dbPassword +
      "@dbwrecipegenerator.1gag8xs.mongodb.net/?retryWrites=true&w=majority&appName=DBWrecipeGenerator",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


//Express-session middleware. Guarda a sessão do utilizador no lado do servidor
app.use(
  session({
    secret: "your-secret-key",
    //é usado para encriptar dados da sessão
    resave: false,
    saveUninitialized: false,
  })
);
//PASSPORT CONFIG//////
app.use(passport.initialize());
//inicializa passport
app.use(passport.session());
//Irá aceder a sessão do cliente guardado no “session-express”. É Éusado para restaurar uma sessão de utilizador. Isso permitirá que o website mantenha a autenticação do utilizador em todas as solicitações usando dados de sessão
passport.use(new localStrategy(user.authenticate()));
//Authenticate é adicionado automaticamente pelo plugin
passport.serializeUser(user.serializeUser());
//guarda um utilizador na sessão
passport.deserializeUser(user.deserializeUser());
//retira um utilizador na sessão




app.use(router); //App Router


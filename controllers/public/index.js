"use strict";
const User = require("../../model/userModel");
const passport = require("passport");

const indexGet = function (req, res) {
  console.log("indexGet");
  res.render("index", { title: "Index" });
};

const loginPost = async function (req, res, next) {
  const { username, password } = req.body;
  console.log("loginPost");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed, redirect to login page or handle it accordingly
      return res.status(401).json({ message: info.message });
    }
    // Authentication successful, log the user in
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("User authenticated:", user);
      res.redirect("/mainPage");
    });
  })(req, res, next);
};

const registerPost = async function (req, res) {
  console.log("registerPost");
  const { email, username, password, passwordCheck } = req.body;


  //verificar info

  try {
    const user = new User({ accountInfo: { email }, username });
    // cria um novo utilizador
    await User.register(user, password);
    //guarda os dados na BD. Register() vem do “plugin” de passport-local-mongoose
    loginPost(req, res);
  } catch (err) {
    console.log("Register Error");
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

//FAZER LOGOUT DA PÁGINA
const logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = { indexGet, loginPost, registerPost, logout };

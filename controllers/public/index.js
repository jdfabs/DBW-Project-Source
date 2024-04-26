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
  console.log(req.body);
  console.log(username);
  console.log(password);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed, redirect to login page or handle it accordingly
      console.log("Authentication failed");
      return res.redirect("/");
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
  const { email, username, password } = req.body;
  try {
    const user = new User({ accountInfo: { email }, username });
    // cria um novo utilizador
    await User.register(user, password);
    //guarda os dados na BD. Register() vem do “plugin” de passport-local-mongoose
    res.redirect("/mainPage");
  } catch (err) {
    console.log("Register Error");
    console.log(err);
    res.send();
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

module.exports = { indexGet, loginPost, registerPost ,logout};

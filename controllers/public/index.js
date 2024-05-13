"use strict";
const User = require("../../model/userModel");
const passport = require("passport");
const nodemailer = require("nodemailer");
const config = require("../../config");

const indexGet = function (req, res) {
  //render and send
  console.log("Index Controller - indexGet");
  res.render("index", {
    title: "Index",
    isAuthenticated: req.body.isAuthenticated,
  });
};

const loginPost = async function (req, res, next) {
  //Login request
  console.log("Index Controller - loginPost");
  passport.authenticate("local", (err, user, info) => {
    //Use password to authenticate the user
    if (err) {
      return next(err);
    }
    if (!user) {
      // Authentication failed - send message
      return res.status(401).json({ message: info.message });
    }
    // Authentication successful, log the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("User authenticated:", user);
      res.redirect("/mainPage"); //redirect
    });
  })(req, res, next);
};

const registerPost = async function (req, res) {
  //Register request
  console.log("Index Controller - registerPost");
  const { email, username, password } = req.body;
  try {
    const user = new User({ accountInfo: { email }, username }); //new User
    await User.register(user, password); //register user into DB passport-local-mongoose
    loginPost(req, res); //if success also login
  } catch (err) {
    console.log("Register Error");
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

//FAZER LOGOUT DA PÁGINA
const logout = function (req, res, next) {
  //logout
  console.log("Index Controller - logout");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const forgotPassword = async function (req, res, next) {
  console.log("Index Controller - forgotPassword");
  try {
    const user = await User.findByUsername(req.body.username); //get user with that username

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPassword = generateNewPassword(); //new password

    user.setPassword(newPassword, async function () {
      //save new password
      user.save();

      await sendPasswordRecoveryEmail(user.accountInfo.email, newPassword); //send mail with new password to account's email -- this is not same at all
      console.log("User new password: " + newPassword); //for easy debug, since it's a shit approach
      res.status(200).json({ message: "password reset successful" });
    });
  } catch (err) {
    console.error("Error recovering password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function generateNewPassword() {
  //password generation aux fucntion
  return Math.random().toString(36).slice(-8); // random 8 char string
}

async function sendPasswordRecoveryEmail(email, newPassword) {
  // send email aux function
  console.log("Index Controller - forgotPassword");
  try {
    const transporter = nodemailer.createTransport({
      //set mail options
      // Configure your email service here
      service: "gmail",
      auth: {
        user: config.supportEmail,
        pass: config.supportEmailPassword,
      },
    });

    const mailOptions = {
      //assemble email
      from: config.supportEmail,
      to: email,
      subject: "Password Recovery",
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions); //send and wait
  } catch (err) {
    console.error("Error sending password recovery email:", err);
    throw err;
  }
}

module.exports = { indexGet, loginPost, registerPost, logout, forgotPassword };

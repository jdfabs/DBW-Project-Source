"use strict";
const User = require("../../model/userModel");
const passport = require("passport");
const nodemailer = require("nodemailer");

const indexGet = function (req, res) {
  console.log("indexGet");
  res.render("index", {
    title: "Index",
    isAuthenticated: req.body.isAuthenticated,
  });
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

const forgotPassword = async function (req, res, next) {
  try {
    // Find the user by their username
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new password (you can use any method you prefer)
    const newPassword = generateNewPassword();

    // Update user's password in the database
    user.password = newPassword;
    await user.save();

    // Send an email containing the new password to the user's email address
    await sendPasswordRecoveryEmail(user.accountInfo.email, newPassword);

    res
      .status(200)
      .json({ message: "Password recovery email sent successfully" });
  } catch (err) {
    console.error("Error recovering password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to generate a new random password
function generateNewPassword() {
  // Logic to generate a random password
  return Math.random().toString(36).slice(-8); // Generate an 8-character random string
}

// Function to send password recovery email
async function sendPasswordRecoveryEmail(email, newPassword) {
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      service: "gmail",
      auth: {
        user: config.supportEmail,
        pass: config.supportEmailPassword,
      },
    });

    const mailOptions = {
      from: config.supportEmail,
      to: email,
      subject: "Password Recovery",
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending password recovery email:", err);
    throw err;
  }
}

module.exports = { indexGet, loginPost, registerPost, logout, forgotPassword };

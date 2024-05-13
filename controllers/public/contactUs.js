"use strict";
const config = require("../../config");

const nodemailer = require("nodemailer");

const contactUsGet = function (req, res) { //render and send
  console.log("ContactUs Controller - contactUsGet");
  res.render("contactUs", {
    title: "Constact Us",
    isAuthenticated: req.body.isAuthenticated,
  });
};
const contactUsPost = async function (req, res) { //send message request
  console.log("ContactUs Controller - contactUsPost");
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      service: "gmail",
      auth: {
        user: config.supportEmail,
        pass: config.supportEmailPassword,
      },
    });

    const mailOptions = { //setup email to be sent
      from: req.body.email,
      to: config.supportEmail,
      subject: "Client Message " + req.body.name + " email: "+ req.body.email,
      text: req.body.message,
    };

    await transporter.sendMail(mailOptions); //send mail 
  } catch (err) {
    console.error("Error sending password recovery email:", err);
    throw err;
  }
};

module.exports = { contactUsGet, contactUsPost };

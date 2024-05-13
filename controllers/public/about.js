"use strict";

const aboutGet = function (req, res) { //render and send page
  console.log("About Controller - aboutGet");
  res.render("about", {
    title: "About",
    isAuthenticated: req.body.isAuthenticated,
  });
};

module.exports = { aboutGet };
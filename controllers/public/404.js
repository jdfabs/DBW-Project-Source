"use strict";

const indexGet = function (req, res) {
  //render and send page -- name should be changed!
  console.log("404 Controller - indexGet");
  res.render("404", {
    title: "404 Page not found",
    isAuthenticated: req.body.isAuthenticated,
  });
};

module.exports = { indexGet };

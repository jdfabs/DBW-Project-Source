"use strict";


const aboutGet = function (req, res) {
    res.render("404", { title: "404 Page not found" });
  };

module.exports = {  aboutGet};
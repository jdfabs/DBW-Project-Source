"use strict";


const aboutGet = function (req, res) {
    res.render("about", { title: "About" });
  };

module.exports = {  aboutGet};
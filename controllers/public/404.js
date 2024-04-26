"use strict";


const indexGet = function (req, res) {
    res.render("404", { title: "404 Page not found" });
  };

module.exports = { indexGet};
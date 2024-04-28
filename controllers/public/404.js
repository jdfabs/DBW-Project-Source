"use strict";


const indexGet = function (req, res) {
    res.render("404", { title: "404 Page not found" , isAuthenticated: req.body.isAuthenticated });
  };

module.exports = { indexGet};
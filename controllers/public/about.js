"use strict";


const aboutGet = function (req, res) {
    res.render("about", { title: "About", isAuthenticated: req.body.isAuthenticated  });
  };

module.exports = {  aboutGet};
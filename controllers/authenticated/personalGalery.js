"use strict";


const personalGaleryGet = function (req, res) {
    res.render("personalGalery", { title: "Personal Galery" ,  isAuthenticated: req.body.isAuthenticated });
  };

module.exports = { personalGaleryGet};
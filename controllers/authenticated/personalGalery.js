"use strict";


const personalGaleryGet = function (req, res) {
    res.render("personalGalery", { title: "Personal Galery" });
  };

module.exports = { personalGaleryGet};
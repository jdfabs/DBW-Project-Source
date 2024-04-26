"use strict";


const contactUsGet = function (req, res) {
    console.log("indexGet");
    res.render("index", { title: "Index" });
  };


  module.exports={contactUsGet};
"use strict";


const faqGet = function (req, res) {
    console.log("indexGet");
    res.render("index", { title: "Index" });
  };


  module.exports={faqGet};
"use strict";


const contactUsGet = function (req, res) {
   
    res.render("constactUs", { title: "Constact Us" });
  };


  module.exports={contactUsGet};
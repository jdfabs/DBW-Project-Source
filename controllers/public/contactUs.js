"use strict";


const contactUsGet = function (req, res) {
   
    res.render("contactUs", { title: "Constact Us",  isAuthenticated: req.body.isAuthenticated });
  };


  module.exports={contactUsGet};
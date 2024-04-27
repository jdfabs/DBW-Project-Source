"use strict";


const contactUsGet = function (req, res) {
   
    res.render("constactUs", { title: "Constact Us",  isAuthenticated: req.body.isAuthenticated });
  };


  module.exports={contactUsGet};
"use strict";


const faqGet = function (req, res) {
    
    res.render("faq", { title: "FAQ" ,  isAuthenticated: req.body.isAuthenticated });
  };


  module.exports={faqGet};
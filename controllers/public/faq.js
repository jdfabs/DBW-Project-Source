"use strict";


const faqGet = function (req, res) {// render and send
  console.log("FAQ Controller - faqGet");
    
    res.render("faq", { title: "FAQ" ,  isAuthenticated: req.body.isAuthenticated });
  };


  module.exports={faqGet};
"use strict";


const faqGet = function (req, res) {
    
    res.render("faq", { title: "FAQ" });
  };


  module.exports={faqGet};
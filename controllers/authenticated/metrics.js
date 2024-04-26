"use strict";


const metricsGet = function (req, res) {
    
    res.render("metrics", { title: "Metrics" });
  };


  module.exports={metricsGet};
"use strict";


const metricsGet = function (req, res) {
    
    res.render("metrics", { title: "Metrics",  isAuthenticated: req.body.isAuthenticated });
  };


  module.exports={metricsGet};
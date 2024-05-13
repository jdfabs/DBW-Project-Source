"use strict";

const metricsGet = function (req, res) {
  //render and send metrics
  console.log("Metrics Controller - metricsGet");
  res.render("metrics", {
    title: "Metrics",
    isAuthenticated: req.body.isAuthenticated,
  });
};

module.exports = { metricsGet };

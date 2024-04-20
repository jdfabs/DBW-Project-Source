"use strict";

const metricController = require('../../controler/authenticatedController/metricsController');

module.exports = (req, res) => {
    const metric = metricController.metric;
    res.render("metrics", { title: "Metrics" });
};
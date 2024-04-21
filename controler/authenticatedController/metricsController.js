"use strict";

const metric = require('../authenticatedController/metricsController');

const metricsController = (req, res) => {
    res.render("metrics", { title: "Metrics" });
};

module.exports = { metricsController, metric };

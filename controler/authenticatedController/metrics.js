"use strict";

const metric = require('./metrics');

const metricsController = (req, res) => {
    res.render("metrics", { title: "Metrics" });
};

module.exports = { metricsController, metric };

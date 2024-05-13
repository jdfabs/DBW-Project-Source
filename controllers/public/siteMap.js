"use strict";

const siteMapGet = function (req, res) {
  res.render("siteMap", { title: "Site Map",  isAuthenticated: req.body.isAuthenticated });
};

module.exports = { siteMapGet };

"use strict";

const siteMapGet = function (req, res) {
  res.render("siteMap", { title: "Site Map" });
};

module.exports = { siteMapGet };

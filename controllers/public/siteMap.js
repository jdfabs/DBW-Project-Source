"use strict";

const siteMapGet = function (req, res) {
  //render page and send
  console.log("site Map Controller - siteMapGet ");
  res.render("siteMap", {
    title: "Site Map",
    isAuthenticated: req.body.isAuthenticated,
  });
};

module.exports = { siteMapGet };

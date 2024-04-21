"use strict";

const renderSiteMapPage = (req, res) => {
  res.render("siteMap", { title: "Site Map" });
};

module.exports = {
    renderSiteMapPage
};

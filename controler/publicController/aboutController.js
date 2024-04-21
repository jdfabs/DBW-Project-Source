"use strict";

const renderAboutPage = (req, res) => {
  res.render("about", { title: "About Us" });
};

module.exports = {
  renderAboutPage
};
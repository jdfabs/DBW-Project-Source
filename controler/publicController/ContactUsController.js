"use strict";

const renderContactUsPage = (req, res) => {
  res.render("contactUs", { title: "Contact Us" });
};

module.exports = {
  renderContactUsPage
};

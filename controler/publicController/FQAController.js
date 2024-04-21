"use strict";

const renderFAQPage = (req, res) => {
  res.render("faq", { title: "FAQ" });
};

module.exports = {
  renderFAQPage
};

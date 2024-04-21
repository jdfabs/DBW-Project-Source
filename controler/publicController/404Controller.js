"use strict";

const render404Page = (req, res) => {
  res.render("404", { title: "404 Page not found" });
};

module.exports = {
  render404Page
};

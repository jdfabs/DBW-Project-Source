"use strict";

const renderIndexPage = (req, res) => {
  res.render("index", { title: "Index" });
};

module.exports = {
    renderIndexPage
};

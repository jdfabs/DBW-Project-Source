"use strict";
const controller = require("./../../controler/mainPageController");

module.exports = (req, res) => {
  controller.indexView(req, res); 
};

"use strict";
const debug = require("../../debugTools");
const controller = require("./../../controler/mainPageController");

module.exports = async (req, res) => {
  debug.log(1, "Main Page Router - indexView");  
  res.render("mainPage", { title: "Main Page", recipes: await controller.getRecipes()  });

};

"use strict";
const debug = require("../../debugTools");
const controller = require("./../../controler/mainPageController");

const loadMainPage = async function(req, res)  {
  debug.log(1, "Main Page Router - loadMainPage");  
  res.render("mainPage", { title: "Main Page", recipes: await controller.getRecipes()  });

};

const getNextRecipe = async function(req, res)  {
  debug.log(1, "Main Page Router - getNextRecipe");
  console.log(req.body);
  const recipe = await controller.getRecipeByIndex(req.body,req.params.index)
  
  res.json(recipe);
};

module.exports = {loadMainPage,getNextRecipe}
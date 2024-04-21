"use strict";

const generator = require("../../middlewares/recipeGenerator");
const validator = require("../../middlewares/dbValidation");
const dbManager = require("../../middlewares/dbManager");

const loadRecipeGenerator = function (req, res) {
  const recipes = [];
  res.render("recipeGenerator", { title: "recipe Generator", recipes });
};

const generateRecipe = async function (req, res) {
  const recipe = await generator.newRecipe(req.body);
  //const recipe2 =  await generator.newRecipe(req.body);
  //const recipe3 =  await generator.newRecipe(req.body);

  //const [recipe1, recipe2, recipe3] = await Promise.all([recipe1Promise, recipe2Promise, recipe3Promise]);

  const recipeList = [recipe];

  res.send(recipeList);
};

const saveRecipe = async function (req, res) {
  if (validator.isRecipeValid(req.body)) {
    console.log("Saving recipe");
    const recipeToload = req.body;
    const id = await dbManager.saveRecipe(recipeToload);
    
    res.json({ id: id });
  } else {
    // Handle validation error (e.g., display error message)
    res.status(400).send("Invalid recipe data");
  }
};

module.exports = { loadRecipeGenerator, generateRecipe, saveRecipe };

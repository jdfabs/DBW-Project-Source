"use strict";
const dbManager = require("../../middlewares/dbManager");

const recipeGet = async function (req, res) {
  const result = await dbManager.getRandomRecipe();
  const recipe = result[0];

  res.render("recipe", { title: "Recipe", recipe ,  isAuthenticated: req.body.isAuthenticated });
};

const recipeIdGet = async function (req, res) {
  try {
    const recipeId = req.params.id;
    // Fetch the recipe details from the database using the recipeId
    const recipe = await dbManager.getRecipeById(recipeId);
    console.log(recipe);
    if (!recipe) {
      // If the recipe with the given ID is not found, render an error page
      return res.status(404).render("404", { title: "Not Found" ,  isAuthenticated: req.body.isAuthenticated });
    }
    // Render a page to display the recipe details
    res.render("recipe", { title: "Recipe", recipe ,  isAuthenticated: req.body.isAuthenticated });
  } catch (error) {
    console.error(error);
    res.status(500).render("404", { title: "Internal Server Error" ,  isAuthenticated: req.body.isAuthenticated });
  }
};
module.exports = { recipeGet, recipeIdGet };

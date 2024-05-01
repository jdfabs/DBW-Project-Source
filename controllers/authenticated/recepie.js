"use strict";
const dbManager = require("../../middlewares/dbManager");

const recipeGet = async function (req, res) {
  const result = await dbManager.getRandomRecipe();
  const recipe = result[0];

  let isOwner;
  if (recipe.creator == req.user) isOwner = true;
  else isOwner = false;

  res.render("recipe", {
    title: "Recipe",
    recipe,
    isAuthenticated: req.body.isAuthenticated,
    isOwner,
  });
};

const recipeIdGet = async function (req, res) {
  try {
    const recipeId = req.params.id;
    // Fetch the recipe details from the database using the recipeId
    const recipe = await dbManager.getRecipeById(recipeId);
    if (!recipe) {
      // If the recipe with the given ID is not found, render an error page
      return res.status(404).render("404", {
        title: "Not Found",
        isAuthenticated: req.body.isAuthenticated,
      });
    }

    let isOwner;
    if (recipe.creator == req.user.username) isOwner = true;
    else isOwner = false;

    // Render a page to display the recipe details
    res.render("recipe", {
      title: "Recipe",
      recipe,
      isAuthenticated: req.body.isAuthenticated,
      isOwner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("404", {
      title: "Internal Server Error",
      isAuthenticated: req.body.isAuthenticated,
    });
  }
};

const recipeCommentPost = async function (req, res) {
  const recipeId = req.params.id;
  try {
    const recipe = await dbManager.getRecipeById(recipeId);
    const newComment = {
      user: req.user.username,
      comment: req.body.comment,
    };
    recipe.comments.push(newComment);
    await dbManager.updateRecipe(recipe)
    res.status(200).json(recipe.comments[recipe.comments.length-1]);

  } catch(error) {
    console.log(error);
    res.status(500) //internal error
  }
};
module.exports = { recipeGet, recipeIdGet, recipeCommentPost };

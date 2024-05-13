"use strict";
const dbManager = require("../../middlewares/dbManager");

const recipeGet = async function (req, res) {
  const result = await dbManager.getRandomRecipe();
  const recipe = result[0];

  let isOwner;
  if (recipe.creator == req.user) isOwner = true;
  else isOwner = false;

  const reqUser = req.user.username;


  res.render("recipe", {
    title: "Recipe",
    clientUsername: reqUser,
    recipe,
    isAuthenticated: req.body.isAuthenticated,
    isOwner,
  });
};

const recipeIdGet = async function (req, res) {
  try {
    const recipeId = req.params.id;
    const reqUser = req.user.username;
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
      clientUsername: reqUser,
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
    await dbManager.updateRecipe(recipe);
    res.status(200).json(recipe.comments[recipe.comments.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500); //internal error
  }
};

const recipeIdLike = async function (req, res) {
  const recipeId = req.params.id;
  console.log("000");

  try {
    const recipe = await dbManager.getRecipeById(recipeId);
    const userRatingIndex = recipe.userRatings.findIndex((rating) => rating.user === req.user.username);

    if (userRatingIndex !== -1) {
      console.log("Found like from this user");
      // Remove like
      recipe.userRatings.splice(userRatingIndex, 1);
      await dbManager.updateRecipe(recipe);
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      // Add like
      const newRating = {
        user: req.user.username,
      };
      recipe.userRatings.push(newRating);
      await dbManager.updateRecipe(recipe);
      res.status(200).json({ message: "Like added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { recipeGet, recipeIdGet, recipeCommentPost, recipeIdLike };

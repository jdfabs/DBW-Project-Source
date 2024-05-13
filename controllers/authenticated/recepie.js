"use strict";
const dbManager = require("../../middlewares/dbManager");

const recipeGet = async function (req, res) {
  //render and load recipe - random recipe
  console.log("Recipe Controller - recipeGet");
  const result = await dbManager.getRandomRecipe();
  const recipe = result[0];

  let isOwner; // extra options if client if the owner of the recipe
  if (recipe.creator == req.user) isOwner = true;
  else isOwner = false;

  res.render("recipe", {
    title: "Recipe",
    clientUsername: req.user.username,
    recipe,
    isAuthenticated: req.body.isAuthenticated,
    isOwner,
  });
};

const recipeIdGet = async function (req, res) {
  //get recipe by id and render and send page
  console.log("Recipe Controller - recipeIdGet");
  try {
    // Fetch the recipe details from the database using the recipeId
    const recipe = await dbManager.getRecipeById(req.params.id);
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
      clientUsername: req.user.username,
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
  //post a comment request
  console.log("Recipe Controller - recipeCommentPost");
  const recipeId = req.params.id;
  try {
    const recipe = await dbManager.getRecipeById(recipeId); //get recipe
    const newComment = {
      //create new coment object
      user: req.user.username,
      comment: req.body.comment,
    };
    recipe.comments.push(newComment); //add to comments array
    await dbManager.updateRecipe(recipe); //update DB data with new comment
    res.status(200).json(recipe.comments[recipe.comments.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500); //internal error
  }
};

const recipeIdLike = async function (req, res) {
  //like/dislike toggle
  console.log("Recipe Controller - recipeIdLike");
  const recipeId = req.params.id;
  console.log("000");

  try {
    const recipe = await dbManager.getRecipeById(recipeId);
    const userRatingIndex = recipe.userRatings.findIndex(
      (rating) => rating.user === req.user.username
    );

    if (userRatingIndex !== -1) {
      //if like found, remove like
      console.log("Found like from this user");
      // Remove like
      recipe.userRatings.splice(userRatingIndex, 1);
      await dbManager.updateRecipe(recipe); //update DB
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      // Add like
      const newRating = {
        user: req.user.username,
      };
      recipe.userRatings.push(newRating);
      await dbManager.updateRecipe(recipe); //update DB
      res.status(200).json({ message: "Like added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { recipeGet, recipeIdGet, recipeCommentPost, recipeIdLike };

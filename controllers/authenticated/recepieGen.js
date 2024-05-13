"use strict";
const validator = require("../../middlewares/dbValidation");
const generator = require("../../middlewares/recipeGenerator");
const dbManager = require("../../middlewares/dbManager");

const recipeGenGet = async (req, res) => {
  //render and send generator page
  console.log("Recipe Generator Controller - recipeGenGet");
  res.render("recipeGenerator", {
    title: "recipe Generator",
    isAuthenticated: req.body.isAuthenticated,
  });
};

const recipeGenPost = async (req, res) => {
  //request new recipe based on input
  console.log("Recipe Generator Controller - recipeGenPost");
  const recipe = await generator.newRecipe(req.body); //send to the generator to create new recipe
  res.send(recipe);
};

const recipeGenSavePost = async (req, res) => {
  //Save recipe request
  console.log("Recipe Generator Controller - recipeGenPost");
  req.body.creator = req.user.username; //add creator
  if (validator.isRecipeValid(req.body)) {
    //if recipe is valid
    const id = await dbManager.saveRecipe(req.body); //save recipe
    res.json({ id: id }); //return id to client
  } else {
    res.status(400).send("Invalid recipe data");
  }
};
module.exports = { recipeGenGet, recipeGenPost, recipeGenSavePost };

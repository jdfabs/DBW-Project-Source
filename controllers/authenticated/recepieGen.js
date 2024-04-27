"use strict";
const validator = require("../../middlewares/dbValidation");
const generator = require("../../middlewares/recipeGenerator");
const dbManager = require("../../middlewares/dbManager");

const recipeGenGet = async (req, res) => {
  res.render("recipeGenerator", {
    title: "recipe Generator",
    isAuthenticated: req.body.isAuthenticated,
  });
};

const recipeGenPost = async (req, res) => {
  const recipe = await generator.newRecipe(req.body);
  res.send(recipe);
};

const recipeGenSavePost = async (req, res) => {
    req.body.creator = req.user.username;
    if (validator.isRecipeValid(req.body)) {
      const id = await dbManager.saveRecipe(req.body);
      res.json({ id: id });
    } else {
      res.status(400).send("Invalid recipe data");
    }
  }
module.exports = { recipeGenGet, recipeGenPost,recipeGenSavePost };

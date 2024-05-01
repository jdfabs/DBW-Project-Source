"use strict";

const recipeModel = require("../../model/recipeModel").RecipeModel;
const dataValidation = require("../../middlewares/dbValidation");
const debug = require("../../debugTools");

const getTopThreeRecipes = async function (req, res ) {
    debug.log(1, "Personal Galery Controller - getTopThreeRecipes");
    const recipes = await recipeModel.find({creator:req.user.username}).limit(3);
    console.log(recipes);
    console.log(req.user.username);
    return recipes;
};


const getRecipeByIndex = async function (filters, index, req) {
  debug.log(1, "Personal Galery Controller - getRecipeByIndex");

  const filterQuery = {};

  if (req.user && req.user.username && filters.searchBar) {
      filterQuery.$text = { $search: filters.searchBar };
  }

  if (req.user && req.user.username && filters.ingredients.length > 0) {
      const ingredientRegexArray = filters.ingredients.map(ingredient => new RegExp(ingredient, 'i'));
      filterQuery.ingredients = { $in: ingredientRegexArray };
  }

  if (req.user && req.user.username && filters.methods.length > 0) {
      filterQuery.methods = { $all: filters.methods };
  }

  return await recipeModel.find(filterQuery);
};



const personalGaleryGet = async function (req, res) {
  const recipes= await getTopThreeRecipes (req, res );
  console.log(recipes);
    res.render("personalGalery", { title: "Personal Galery", recipes, isAuthenticated: req.body.isAuthenticated });


};

const personalGaleryIDGet = async function (req, res) {
    const recipe = await getRecipeByIndex(
        req.body,
        req.params.index
    );
    res.json(recipe);
};



module.exports = { personalGaleryGet, getTopThreeRecipes, getRecipeByIndex, personalGaleryIDGet };

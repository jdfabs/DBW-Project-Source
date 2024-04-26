

"use strict";
const recipeModel = require("../../model/recipeModel").RecipeModel;
const dataValidation = require("../../middlewares/dbValidation");
const debug = require("../../debugTools");




const getRecipes = async function () {
  debug.log(1, "Main Page Controller - getRecipes");
  const recipes = await getTopThreeRecipes();
  return recipes;
};

const getTopThreeRecipes = async function (filters) {
  debug.log(1, "Main Page Controller - getTopTenrecipes");
  const recipes = await recipeModel.find({}).limit(3);
  //console.log(recipe);

  return recipes;
};

const getRecipeByIndex = async function(filters, index) {
  debug.log(1, "Main Page Controller - getRecipeByIndex");

  // Constructing the filter query based on the provided filters
  const filterQuery = {};

  // Adding filter for search bar text if available
  if (filters.searchBar) {
    filterQuery.$text = { $search: filters.searchBar };
  }

  // Adding filter for ingredients if available
  if (filters.ingredients.length > 0) {
    filterQuery.ingredients = { $all: filters.ingredients };
  }

  // Adding filter for methods if available
  if (filters.methods.length > 0) {
    filterQuery.methods = { $all: filters.methods };
  }

  console.log(filterQuery);
  // Executing the query with filters applied
  const recipe = await recipeModel.find(filterQuery).skip(index).limit(1);
  return recipe[0];
}


const mainPageGet = async function(req, res){
  res.render("mainPage", {
    title: "Main Page",
    recipes: await getRecipes(),
  });
}


const mainPageIDGet = async function (req, res) {
  const recipe = await getRecipeByIndex(
    req.body,
    req.params.index
  );
  res.json(recipe);
};

module.exports = { mainPageGet,mainPageIDGet};




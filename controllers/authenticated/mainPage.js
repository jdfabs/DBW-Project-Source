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

const getRecipeByIndex = async function (filters, index) {
  let filterArray = filters.searchBar.split(" ");

  filters.ingredients.forEach((filter) => {
    filterArray.push(filter);
  });
  filters.methods.forEach((filter) => {
    filterArray.push(filter);
  });

  let filterQueries = filterArray.map((filter) => {
    const regex = new RegExp(filter.trim(), "i");
    return {
      $or: [
        { recipeName: { $regex: regex } },
        { ingredients: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    };
  });

  // Combine individual filter queries using logical OR
  const combinedQuery = { $or: filterQueries };

  try {
    // Search the database for recipes matching any of the filters
    const recipe = await recipeModel.find(combinedQuery).skip(index).limit(1);
    return recipe[0];
  } catch (error) {
    console.error("Error while fetching recipes:", error);
    throw error;
  }
};

const mainPageGet = async function (req, res) {
  res.render("mainPage", {
    title: "Main Page",
    recipes: await getRecipes(),
    isAuthenticated: req.body.isAuthenticated,
  });
};

const mainPageIDGet = async function (req, res) {
  const recipe = await getRecipeByIndex(req.body, req.params.index);
  res.json(recipe);
};

module.exports = { mainPageGet, mainPageIDGet };

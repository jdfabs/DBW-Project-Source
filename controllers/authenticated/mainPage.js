"use strict";
const recipeModel = require("../../model/recipeModel").RecipeModel;

const getTopThreeRecipes = async function (filters) {
  console.log("Main Page Controller - getTopTenrecipes");
  const recipes = await recipeModel.find({}).limit(3); //get 3 recipes from DB
  //console.log(recipe);

  return recipes;
};

const getRecipeByIndex = async function (filters, index) {
  console.log("Main Page Controller - getRecipeByIndex");
  let filterArray = filters.searchBar.split(" "); //Split search bar into individual words

  filters.ingredients.forEach((filter) => {
    //for each ingredient in filter add to filters
    filterArray.push(filter);
  });
  filters.methods.forEach((filter) => {
    //for each methods in filter add to filters
    filterArray.push(filter);
  });

  let filterQueries = filterArray.map((filter) => {
    //filters -> regex to search of any fields vaguely maching search words. ex: "tomato" -> all recipes with "tomato", "tomatoes", "Tomatoes", etc.
    const regex = new RegExp(filter.trim(), "i");
    return {
      $or: [
        //any of these
        { recipeName: { $regex: regex } },
        { ingredients: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    };
  });

  const combinedQuery = { $or: filterQueries };

  try {
    const recipe = await recipeModel.find(combinedQuery).skip(index).limit(1); // Get DB result
    return recipe[0]; // return the recipe object
  } catch (error) {
    console.error("Error while fetching recipes:", error);
    throw error;
  }
};

const mainPageGet = async function (req, res) {
  //Load page
  console.log("Main Page Controller - mainPageGet");

  res.render("mainPage", {
    //render and send page to client
    title: "Main Page",
    recipes: await getRecipes(),
    isAuthenticated: req.body.isAuthenticated, //for auth conditionals
  });
};

const getRecipes = async function () {
  //get 3 recipes function
  console.log("Main Page Controller - getRecipes");
  const recipes = await getTopThreeRecipes(); //pre-load 3 recipes
  return recipes;
};

const mainPageIDGet = async function (req, res) {
  //more recipes for infinite load request
  console.log("Main Page Controller - mainPageIDGet");
  const recipe = await getRecipeByIndex(req.body, req.params.index);
  res.json(recipe);
};

module.exports = { mainPageGet, mainPageIDGet };

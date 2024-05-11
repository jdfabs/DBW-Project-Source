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
  let filterArray = [];
  if(filters.searchBar) filterArray = filters.searchBar.split(" ");
  

  filters.ingredients.forEach((filter) => {
    filterArray.push(filter);
  });
  filters.methods.forEach((filter) => {
    filterArray.push(filter);
  });
  console.log(filterArray);
  let filterQueries = filterArray.map((filter) => {
    const regex = new RegExp(filter.trim(), "i");
    return {
      $and: [
        { recipeName: { $regex: regex } },
        { ingredients: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
    };
  });

  // Combine individual filter queries using logical OR
  let combinedQuery = { $or: filterQueries };

  try {
    // Search the database for recipes matching any of the filters
    let recipe = await recipeModel.find(combinedQuery).sort("asc").skip(index).limit(1);
    console.log(recipe)
    if(recipe[0]) return recipe[0];
    console.log("No more exact matches");
    try{
      filterQueries = filterArray.map((filter) => {
        const regex = new RegExp(filter.trim(), "i");
        return {
          $or: [
            { recipeName: { $regex: regex } },
            { ingredients: { $regex: regex } },
            { tags: { $regex: regex } },
          ],
        };
  
      });
      combinedQuery = { $or: filterQueries };
      recipe = await recipeModel.find(combinedQuery).sort("asc").skip(index).limit(1);
      return recipe[0];

    }
    catch (error){
console.log(error);
    }
     

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

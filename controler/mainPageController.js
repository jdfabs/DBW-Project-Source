

"use strict";
const recipeModel = require("../model/recipeModel").RecipeModel;
const dataValidation = require("../middlewares/dbValidation");
const debug = require("../debugTools");




const getRecipes = async function () {
  debug.log(1, "Main Page Controller - getRecipes");
 
 



  const recipes = await getTopTenrecipes();

  return recipes;
};

const getTopTenrecipes = async function (filters) {
  debug.log(1, "Main Page Controller - getTopTenrecipes");
  const recipes = await recipeModel.find({}).limit(3);
  //console.log(recipe);

  return recipes;
};

const getRecipeByIndex = async function(filters, index){
  debug.log(1, "Main Page Controller - getRecipeByIndex");
  
  const recipe = await recipeModel.find({}).skip(index).limit(1);
  return recipe[0];
}



module.exports = { getRecipes,getRecipeByIndex };




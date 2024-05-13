
"use strict";
const recipeModel = require("../model/recipeModel").RecipeModel;

const saveRecipe = async function (data) { //save recipe to DB
  console.log("DB manager Middleware - saveRecipe");
  const recipe = new recipeModel(data);  //new recipe
  try {
    const savedRecipe = await recipe.save();
    console.log("Recipe saved successfully");
    return savedRecipe._id;
  } catch (error) {
    console.log("Saving failed");
    console.error(error);
  }
};

const updateRecipe = async function(data) { //update recipe to DB
  console.log("DB manager Middleware - updateRecipe");
  try {
    //find recipe with id
    const updatedRecipe = await recipeModel.findByIdAndUpdate(data._id, data, { new: true });
    if (updatedRecipe) {
      console.log("Recipe updated successfully");
      return updatedRecipe._id;
    } else {
      console.log("Recipe not found");
      return null;
    }
  } catch (error) {
    console.log("Updating recipe failed");
    console.error(error);
  }
};


const getRecipeById = async function(id){
  console.log("DB manager Middleware - getRecipeById");
    const recipe = await recipeModel.findById(id).limit(1);
    return recipe
}

const getRandomRecipe = async function(){
  console.log("DB manager Middleware - getRandomRecipe");
    const recipe = await recipeModel.aggregate([{ $sample: { size: 1 } }]); //random recipe
    
    return recipe
};



module.exports = { saveRecipe,getRecipeById,getRandomRecipe,updateRecipe };

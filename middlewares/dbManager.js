const recipeModel = require("../model/recipeModel").RecipeModel;
const dataValidation = require("../middlewares/dbValidation");

const saveRecipe = async function (data) {
  console.log("Saving recipe");
  const recipe = new recipeModel(data);  
  try {
    const savedRecipe = await recipe.save();
    console.log("Recipe saved successfully");
    return savedRecipe._id;
  } catch (error) {
    console.log("Saving failed");
    console.error(error);
  }
};

const updateRecipe = async function(data) {
  try {
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
    const recipe = await recipeModel.findById(id).limit(1);
    return recipe
}

const getRandomRecipe = async function(){
    const recipe = await recipeModel.aggregate([{ $sample: { size: 1 } }]);
    
    return recipe
};



module.exports = { saveRecipe,getRecipeById,getRandomRecipe,updateRecipe };

const recipeModel = require("../model/recipeModel").RecipeModel;
const dataValidation = require("../middlewares/dbValidation");


const saveRecipe= async function(data){


   const recipe = new recipeModel(data[0]);
    try {
        
        await recipe.save();
        console.log("recipe Saved");
 
    } catch (error) {
        console.log("Saving failed");
        console.error(error);
    }
}


module.exports = {saveRecipe};
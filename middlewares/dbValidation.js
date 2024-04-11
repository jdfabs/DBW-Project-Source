"use strict";

const Ajv = require("ajv");
const recepieModel = require("../model/recepieModel");

const ajv = new Ajv();

const validateRecipe = async function (base) {    
    try {
        await recepieModel.validate(base);
        console.log(true);
    }
    catch (error){        
        const missingParams = Object.keys(error["errors"]);
        console.log(missingParams);
        console.log(false);
    }
 
};

const forceValidRecipe = async function (base) {

    base.recipeName = null;
    base.ingredients = null;
    base.instructions = null;
    base.description = null;
    base.difficultyLevel = null;
    base.preparationTime = null;
    base.cookingTime = null;
    base.totalTime = null;
    base.servings = null;
    base.cuisine = null;
    base.dietaryInformation = null;
    base.notes = null;
    base.allergenInformation = null;
    base.substitutions = null;
    base.equipmentNeeded = null;

    try {
        await recepieModel.validate(base);
        console.log(true);
    }
    catch (error){        
        const missingParams = Object.keys(error["errors"]);
        console.log(missingParams);
        console.log(false);

        missingParams.forEach(param => {
            //A Ideia é por cada um juntar para pedir ao OpenAI para gerar 
            //estes parametros e juntar á base para retornar uma recipe valida.
            switch(param) {
                case "recipeName":
                    // Handle missing recipeName 
                    break;
                case "description":
                    // Handle missing description
                    break;
                case "difficultyLevel":
                    // Handle missing difficultyLevel
                    break;
                case "preparationTime.value":
                    // Handle missing preparationTime value
                    break;
                case "preparationTime.unit":
                    // Handle missing preparationTime unit
                    break;
                case "cookingTime.value":
                    // Handle missing cookingTime value
                    break;
                case "cookingTime.unit":
                    // Handle missing cookingTime unit
                    break;
                case "totalTime.value":
                    // Handle missing totalTime value
                    break;
                case "totalTime.unit":
                    // Handle missing totalTime unit
                    break;
                case "servings":
                    // Handle missing servings
                    break;
                case "cuisine":
                    // Handle missing cuisine
                    break;
                default:
                    // Handle any other missing parameter
                    break;
            }
    });}


};

module.exports = { validateRecipe, forceValidRecipe };

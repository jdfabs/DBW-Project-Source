"use strict";
const recepieModel = require("../model/recepieModel");
const userModel = require ("../model/userModel");


const debug = require("../debugTools");

const isRecepieValid = async function (base) {    
    debug.log(1,"validateRecipe:");    
    try {
        await recepieModel.validate(base);
        debug.log(2,true);
        return true;
    }
    catch (error){        
        const missingParams = Object.keys(error["errors"]);
        debug.log(3,missingParams);
        debug.log(2,false);
        return false;
    }
 
};

const isUserValid = async function (user) {
    debug.log(1,"isUserValid:"); 
    try {
        await userModel.validate(user);
        debug.log(2,true);
        return true;
    }
    catch (error){        
        const missingParams = Object.keys(error["errors"]);
        debug.log(3,missingParams);
        debug.log(2,false);
        return false;
    }
}

const forceValidRecipe = async function (base) {
    debug.log(1,"forceValidRecipe:");
    const validRecipe = base;

    try {
        await recepieModel.validate(validRecipe);        
        debug.log(2,true);
        return validRecipe;
    }
    catch (error){        
        const missingParams = Object.keys(error["errors"]);
        debug.log(3,"Missing params:");
        debug.log(3,missingParams);
        debug.log(2,false);

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
    if(await isRecepieValid(validRecipe)){
        debug.log(3,JSON.stringify(validRecipe));
        return validRecipe;
    }
    else {
        debug.log(0,"FATAL ERROR - UNABLE TO FORCE VALID RECEPIE");
    }

    
};

module.exports = { isRecepieValid, isUserValid ,forceValidRecipe };

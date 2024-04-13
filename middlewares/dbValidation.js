"use strict";
const recepieModel = require("../model/recepieModel");
const userModel = require("../model/userModel");
const generator = require("./recipeGenerator");

const debug = require("../debugTools");

const isRecepieValid = async function (base) {
  debug.log(1, "validateRecipe:");
  try {
    await recepieModel.validate(base);
    return true;
  } catch  {
    return false;
  }    
  
};

const isUserValid = async function (user) {
  debug.log(1, "isUserValid:");
  try {
    await userModel.validate(user);
    debug.log(2, true);
    return true;
  } catch (error) {
    const missingParams = Object.keys(error["errors"]);
    debug.log(3, missingParams);
    debug.log(2, false);
    return false;
  }
};

const forceValidRecipe = async function (base) {
  debug.log(1, "forceValidRecipe:");
  let validRecipe = base;
  let isFixed = false;
  const limit = 5;
  let counter = 0;

  while (!isFixed && counter < limit) {
    try {
      await recepieModel.validate(validRecipe);
      isFixed = true;
    } catch (error) {
      const missingParams = Object.keys(error.errors);

      for (let param of missingParams) {
        let grandParent = "";
        let parent = "";
        //Separa a hierarquia
        if (param.indexOf(".") != -1) {
          parent = param.substring(0, param.indexOf("."));
          param = param.substring(param.indexOf(".") + 1, param.Length);
          if (param.indexOf(".") != -1) {
            grandParent = parent;
            parent = param.substring(0, param.indexOf("."));
            param = param.substring(param.indexOf(".") + 1, param.Length);
          }
        }
        //Verificar se todos os objectos da hierarquia existes, caso n existam gera um novo
        if (grandParent != "") {
          if (validRecipe[grandParent] === undefined) {
            validRecipe[grandParent] = {}; // Initialize the object if it doesn't exist
          }
        }
        if (parent != "") {
          if (grandParent != "") {
            if (validRecipe[grandParent][parent] === undefined) {
              validRecipe[grandParent][parent] = {};
            }
          } else if (validRecipe[parent] === undefined) {
            validRecipe[parent] = {};
          }
        }
        //Gerar campo em falta final a vazio
        if (parent != "") {
          if (grandParent != "") {
            if (validRecipe[grandParent][parent][param] === undefined) {
              validRecipe[grandParent][parent][param] = 0;
            }
          } else if (validRecipe[parent][param] === undefined) {
            validRecipe[parent][param] = 0;
          }
        } else {
          if (validRecipe[param] === undefined) {
            validRecipe[param] = 0;
          }
        }
      }
      //Manda o Gerador de Receitas criar os restantes
      //console.log(validRecipe);
      validRecipe = await recepieGenerator.generateMissingFields(
        missingParams,
        validRecipe,
        validRecipe
      );
    }
    counter++;
  }
  if (!isFixed) {
    console.log("@@@@@@@@@ FATAL ERROR - FAILED TO FORCE RECIPE VALIDATION");
  }
  return validRecipe;
};

module.exports = { isRecepieValid, isUserValid, forceValidRecipe };

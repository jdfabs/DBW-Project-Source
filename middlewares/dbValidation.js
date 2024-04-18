"use strict";
const recipeModel = require("../model/recipeModel");
const userModel = require("../model/userModel");
const debug = require("../debugTools");

const CYCLE_LIMIT = 5;

const isrecipeValid = async function (base) {
  debug.log(1, "validateRecipe:");
  try {
    await recipeModel.validate(base);
    return true;
  } catch {
    return false;
  }
};

const isUserValid = async function (user) {
  debug.log(1, "isUserValid:");
  try {
    await userModel.validate(user);
    return true;
  } catch (error) {
    const missingParams = Object.keys(error["errors"]);
    return false;
  }
};

/*
const forceValidRecipe = async function (base) {
  debug.log(1, "forceValidRecipe:");
  let validRecipe = base;
  let isFixed = false;
  let counter = 0;
  console.log(base);
  while (!isFixed && counter < CYCLE_LIMIT) {
    console.log("Loop num: " + counter);
    try {
      await recipeModel.validate(validRecipe);
      return validRecipe;
    } catch (error) {
      try {
        const missingParams = Object.keys(error.errors);
        console.log(Object.keys(error.errors));
        //Por cada campo em falta
        for (let param of missingParams) {
          // fixData return = valid JSON - recipe com este parametro arranjado
          validRecipe = await fixer.fixData(param, validRecipe);
        }
      } catch {
        validRecipe = await fixer.fixData(
          String(error).substring(
            String(error).indexOf("'") + 1,
            String(error).indexOf("')")
          ),
          validRecipe
        );
      }
    }
    console.log("Loop: " + counter + " result:");
    console.log(validRecipe);
    counter++;
  }
  if (!isFixed) {
    console.log("@@@@@@@@@ FATAL ERROR - FAILED TO FORCE RECIPE VALIDATION");
  }
  return validRecipe;
};*/

module.exports = { isrecipeValid, isUserValid };

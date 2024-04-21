"use strict";
const recipeModel = require("../model/recipeModel");
const userModel = require("../model/userModel");
const debug = require("../debugTools");


const isRecipeValid = async function (base) {
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

module.exports = { isRecipeValid, isUserValid };

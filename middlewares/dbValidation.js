"use strict";
const recipeModel = require("../model/recipeModel");
const userModel = require("../model/userModel");
const debug = require("../debugTools");

const isRecipeValid = async function (base) {
  console.log("DB validation Middleware - isRecipeValid");
  try {
    await recipeModel.validate(base);
    return true;
  } catch {
    return false;
  }
};

const isUserValid = async function (user) {
  console.log("DB validation Middleware - isUserValid");
  try {
    await userModel.validate(user);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { isRecipeValid, isUserValid };

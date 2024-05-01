"use strict";

const recipeModel = require("../../model/recipeModel").RecipeModel;
const dataValidation = require("../../middlewares/dbValidation");
const debug = require("../../debugTools");

const getTopThreeRecipes = async function (req, res ) {
    debug.log(1, "Personal Galery Controller - getTopThreeRecipes");
    const recipes = await recipeModel.find({creator:req.user.username}).limit(3);
    return recipes;
};


const getRecipeByIndex = async function ( index, req) {
  debug.log(1, "Personal Galery Controller - getRecipeByIndex");
console.log(index);
  return await recipeModel.find({creator:req.user.username}).skip(index).limit(3);;
};



const personalGaleryGet = async function (req, res) {
  const recipes= await getTopThreeRecipes (req, res );

    res.render("personalGalery", { title: "Personal Galery", recipes, isAuthenticated: req.body.isAuthenticated });


};

const personalGaleryIDGet = async function (req, res) {
    console.log("999");
    const recipes = await getRecipeByIndex(
        req.params.index,
        req
    );
    res.json(recipes);
};



module.exports = { personalGaleryGet, getTopThreeRecipes, getRecipeByIndex, personalGaleryIDGet };

"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const mainPage = require("../authenticated/mainPage");
const metrics = require("../authenticated/metrics");
const personalGalery = require("../authenticated/personalGalery");
const recipe = require("../authenticated/recipe");
const recipeGenerator = require("../authenticated/recipeGenerator");
const settings = require("../authenticated/settings");

router.get("/metrics", metrics);
router.get("/personalGalery",personalGalery);
router.get("/settings",settings);

router.get("/mainPage", mainPage.loadMainPage);
router.get("/mainPage/:index", mainPage.getNextRecipe);

router.get("/recipe/:id",recipe.loadRecipeById);

router.get("/recipeGenerator", recipeGenerator.loadRecipeGenerator);
router.post("/recipeGenerator", recipeGenerator.generateRecipe);
router.post("/recipeGenerator/save", recipeGenerator.saveRecipe);


module.exports = router;

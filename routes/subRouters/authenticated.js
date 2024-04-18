"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const mainPage = require("../authenticated/mainPage");
const metrics = require("../authenticated/metrics");
const personalGalery = require("../authenticated/personalGalery");
const recipe = require("../authenticated/recipe");
const recipeGenerator = require("../authenticated/recipeGenerator");
const settings = require("../authenticated/settings");

router.get("/mainPage", mainPage);
router.get("/metrics", metrics);
router.get("/personalGalery",personalGalery);
router.get("/recipe",recipe);
router.get("/recipeGenerator", recipeGenerator);
router.get("/settings",settings);

module.exports = router;

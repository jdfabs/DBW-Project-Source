"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const metricController = require("../../controllers/authenticated/metrics");
const personalGaleryController = require("../../controllers/authenticated/personalGalery");
const settingsController = require("../../controllers/authenticated/settings");
const mainPageController = require("../../controllers/authenticated/mainPage");
const recipeController = require("../../controllers/authenticated/recepie");

const generator = require("../../middlewares/recipeGenerator");
const validator = require("../../middlewares/dbValidation");

const dbManager = require("../../middlewares/dbManager");
//Routes for authenticated users

//metrics

const checkAuth = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // If not authenticated, redirect to the login page
    console.log("Unauthorized access detected!");
    return res.redirect("/");
  }
  // If authenticated, proceed to the next middleware/route handler
  req.body.isAuthenticated = true;
  next();
};

router.get("/metrics", checkAuth, metricController.metricsGet);

//personalGalery
router.get(
  "/personalGalery",
  checkAuth,
  personalGaleryController.personalGaleryGet
);

//settings
router.get("/settings", checkAuth, settingsController.settingsGet);

//mainPage
router.get("/mainPage", checkAuth, mainPageController.mainPageGet);
router.post("/mainPage/:index", checkAuth, mainPageController.mainPageIDGet);

//recipe
router.get("/recipe", checkAuth, recipeController.recipeGet);
router.get("/recipe/:id", checkAuth, recipeController.recipeIdGet);

//recipeGenerator
router.get("/recipeGenerator", checkAuth, (req, res) => {
  res.render("recipeGenerator", { title: "recipe Generator",  isAuthenticated: req.body.isAuthenticated });
});
router.post("/recipeGenerator", checkAuth, async (req, res) => {
  const recipe = await generator.newRecipe(req.body);
  res.send(recipe);
});
router.post("/recipeGenerator/save", checkAuth, async (req, res) => {
  if (validator.isRecipeValid(req.body)) {
    const id = await dbManager.saveRecipe(req.body);
    res.json({ id: id });
  } else {
    res.status(400).send("Invalid recipe data");
  }
});

module.exports = router;

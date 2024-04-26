"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const metricController = require("../../controllers/authenticated/metrics");
const personalGaleryController = require("../../controllers/authenticated/personalGalery");
const settingsController = require("../../controllers/authenticated/settings");
const mainPageController = require("../../controllers/authenticated/mainPage");

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
  next();
};

router.get("/metrics", checkAuth, (req, res) => {
  // Assuming metricController is properly defined
  const metric = metricController.metric;
  res.render("metrics", { title: "Metrics" });
});


//personalGalery
router.get("/personalGalery", checkAuth, (req, res) => {
  const personalGalery = personalGaleryController.personalGalery;
  res.render("personalGalery", { title: "Personal Galery" });
});

//settings
router.get("/settings", checkAuth, (req, res) => {
  const settings = settingsController.settings;
  res.render("settings", { title: "Settings" });
});

//mainPage
router.get("/mainPage", checkAuth, async (req, res) => {
  res.render("mainPage", {
    title: "Main Page",
    recipes: await mainPageController.getRecipes(),
  });
});
router.post("/mainPage/:index", checkAuth, async (req, res) => {
  const recipe = await mainPageController.getRecipeByIndex(
    req.body,
    req.params.index
  );
  res.json(recipe);
});

//recipe
router.get("/recipe", checkAuth, async (req, res) => {
  const result = await dbManager.getRandomRecipe();
  const recipe = result[0];

  res.render("recipe", { title: "Recipe", recipe });
});
router.get("/recipe/:id", checkAuth, async (req, res) => {
  try {
    const recipeId = req.params.id;
    // Fetch the recipe details from the database using the recipeId
    const recipe = await dbManager.getRecipeById(recipeId);
    if (!recipe) {
      // If the recipe with the given ID is not found, render an error page
      return res.status(404).render("404");
    }
    // Render a page to display the recipe details
    res.render("recipe", { title: "Recipe", recipe });
  } catch (error) {
    console.error(error);
    res.status(500).render("404", { title: "Internal Server Error" });
  }
});

//recipeGenerator
router.get("/recipeGenerator", checkAuth, (req, res) => {
  res.render("recipeGenerator", { title: "recipe Generator" });
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

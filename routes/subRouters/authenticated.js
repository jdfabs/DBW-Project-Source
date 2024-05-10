"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const metricController = require("../../controllers/authenticated/metrics");
const personalGaleryController = require("../../controllers/authenticated/personalGalery");
const settingsController = require("../../controllers/authenticated/settings");
const mainPageController = require("../../controllers/authenticated/mainPage");
const recipeController = require("../../controllers/authenticated/recepie");
const recipeGeneratorController = require("../../controllers/authenticated/recepieGen");

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
router.get( "/personalGalery",
checkAuth,
  personalGaleryController.personalGaleryGet);
router.post("/personalGalery/:index", checkAuth, personalGaleryController.personalGaleryIDGet);

//settings
router.get("/settings", checkAuth, settingsController.settingsGet);

//mainPage
router.get("/mainPage", checkAuth, mainPageController.mainPageGet);
router.post("/mainPage/:index", checkAuth, mainPageController.mainPageIDGet);

//recipe
router.get("/recipe", checkAuth, recipeController.recipeGet);
router.get("/recipe/:id", checkAuth, recipeController.recipeIdGet);
router.post("/recipe/:id/comment", checkAuth, recipeController.recipeCommentPost);
router.post("/recipe/:id/like", checkAuth, recipeController.recipeIdLike);

//para editar a receita

router.get("/recipe/:id/editar-receita", checkAuth, personalGaleryController.editarReceita);
//router.patch("/recipe/update/:id ", personalGaleryController.atlreceita);
router.patch("/recipe/update/:id", async (req, res) => {
  console.log('PATCH');
  await personalGaleryController.atlreceita(req, res)
});


//recipeGenerator
router.get(
  "/recipeGenerator",
  checkAuth,
  recipeGeneratorController.recipeGenGet
);
router.post(
  "/recipeGenerator",
  checkAuth,
  recipeGeneratorController.recipeGenPost
);
router.post(
  "/recipeGenerator/save",
  checkAuth,
  recipeGeneratorController.recipeGenSavePost
);

module.exports = router;

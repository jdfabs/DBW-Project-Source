"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const metricController = require("../../controllers/authenticated/metrics");
const personalGaleryController = require("../../controllers/authenticated/personalGalery");
const settingsController = require("../../controllers/authenticated/settings");
const mainPageController = require("../../controllers/authenticated/mainPage");
const recipeController = require("../../controllers/authenticated/recepie");
const recipeGeneratorController = require("../../controllers/authenticated/recepieGen");
const supportChatController = require("../../controllers/authenticated/supportChat");

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

//supportChat
router.get("/supportChat", checkAuth, supportChatController.supportChatGet);



router.post("/supportChat",function(req,res){
    console.log("Updating username");
    let userName = req.user.username;
    console.log("variable defined")
    console.log("username "+userName);
    console.log(req.user)
    console.log("Username updated");
    res.send(userName)
});

router.post("/supportChat/:room",  checkAuth, supportChatController.supportChatPost)

module.exports = router;

"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const contactUsController = require("../../controllers/public/contactUs");
const aboutController = require("../../controllers/public/about");
const faqController = require("../../controllers/public/faq");
const siteMapController = require("../../controllers/public/siteMap");
const c404Controller = require("../../controllers/public/404");
const indexController = require("../../controllers/public/index");

const checkAuth = function (req, res, next) {
  if (req.isAuthenticated()) req.body.isAuthenticated = true;
  else req.body.isAuthenticated = false;
  next();
};

//Public Routes
router.get("/contactUs", checkAuth, contactUsController.contactUsGet);
router.post("/contactUs", checkAuth, contactUsController.contactUsPost)

router.get("/about", checkAuth, aboutController.aboutGet);
router.get("/about-us", checkAuth, aboutController.aboutGet); //Redirect/MultipleRoutes example

router.get("/faq", checkAuth, faqController.faqGet);

router.get("/sitemap", checkAuth, siteMapController.siteMapGet);

router.get("/", checkAuth, indexController.indexGet);
router.post("/login", checkAuth, indexController.loginPost);
router.post("/register", checkAuth, indexController.registerPost);
router.get("/logout", checkAuth, indexController.logout);
router.post("/forgotPassword", checkAuth, indexController.forgotPassword)

router.use(c404Controller.indexGet);

module.exports = router;

"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const contactUsController = require("../../controllers/public/contactUs");
const aboutController = require("../../controllers/public/about");
const faqController = require("../../controllers/public/faq");
const siteMapController = require("../../controllers/public/siteMap");
const c404Controller = require("../../controllers/public/404");
const indexController = require("../../controllers/public/index");

//Public Routes
router.get("/contactUs", contactUsController.contactUsGet);

router.get("/about", aboutController.aboutGet);
router.get("/about-us", aboutController.aboutGet); //Redirect/MultipleRoutes example

router.get("/faq", faqController.faqGet);

router.get("/sitemap", siteMapController.siteMapGet);

router.get("/", indexController.indexGet);
router.post("/login", indexController.loginPost);
router.post("/register", indexController.registerPost);
router.get("/logout", indexController.logout);

router.use(c404Controller.indexGet);

module.exports = router;

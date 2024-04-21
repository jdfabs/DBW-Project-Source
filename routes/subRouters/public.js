"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router


const contactUsController = require("../../controllers/public/contactUs");
const  aboutController = require("../../controllers/public/about");
const  faqController = require("../../controllers/public/faq");
const  siteMapController  = require("../../controllers/public/siteMap");
const c404Controller  = require("../../controllers/public/404");

//Public Routes
//contactUs
router.get("/contactUs", (req, res) => {
  res.render("contactUs", { title: "Contact Us" });
});

//about
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});
router.get("/about-us", (req, res) => {
  res.status(301).redirect("about");
});//Redirect example

//faq
router.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQ" });
});

//siteMap
router.get("/sitemap", (req, res) => {
  res.render("siteMap", { title: "Site Map" });
});
//404
router.use((req, res) => {
  res.render("404", { title: "404 Page not found" });
});

module.exports = router;

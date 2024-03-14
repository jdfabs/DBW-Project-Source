"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const about = require("../public/about");
const contactUs = require("../public/contactUs");
const faq = require("../public/faq");
const siteMap = require("../public/siteMap");
const notFound = require("../public/404");

router.get("/contactUs", contactUs);

router.get("/about", about);
router.get("/about-us", (req, res) => {
  res.status(301).redirect("about");
});//Redirect example

router.get("/faq", faq);
router.get("/sitemap", siteMap);

router.use(notFound);

module.exports = router;

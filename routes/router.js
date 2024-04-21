"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const devRouter = require("./subRouters/dev");
const authenticatedRouter = require("./subRouters/authenticated");
const publicRouter = require("./subRouters/public");

const indexController = require("../controllers/public/index");

router.get("/", (req, res) => {
  res.render("index", { title: "Index" });
});

router.use(devRouter); //Sub router for Dev
router.use(authenticatedRouter); //Sub router for authenticated users
router.use(publicRouter); //Sub router for public pages

module.exports = router;

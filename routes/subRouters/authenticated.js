"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const mainPage = require("../authenticated/mainPage");
const metrics = require("../authenticated/metrics");
const personalGalery = require("../authenticated/personalGalery");
const recepie = require("../authenticated/recepie");
const recepieGenerator = require("../authenticated/recepieGenerator");
const settings = require("../authenticated/settings");

router.get("/mainPage", mainPage);
router.get("/metrics", metrics);
router.get("/personalGalery",personalGalery);
router.get("/recepie",recepie);
router.get("/recepieGenerator", recepieGenerator);
router.get("/settings",settings);

module.exports = router;

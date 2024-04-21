"use strict"

const express = require("express");
const router = express.Router();
const { renderAboutPage } = require("../../controler/publicController/aboutController");

router.get("/about", renderAboutPage);

module.exports = router;

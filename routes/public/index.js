
"use strict"

const express = require("express");
const router = express.Router();
const { renderIndexPage } = require("../../controler/publicController/indexController");

router.get("/", renderIndexPage );

module.exports = router;

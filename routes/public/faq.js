"use strict"

const express = require("express");
const router = express.Router();
const { renderFAQPage } = require("../../controler/publicController/FQAController");

router.get("/faq", renderFAQPage);

module.exports = router;

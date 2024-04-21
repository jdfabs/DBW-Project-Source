"use strict"

const express = require("express");
const router = express.Router();
const { renderSiteMapPage } = require("../../controler/publicController/siteMapController");

router.get("/siteMap", renderSiteMapPage );

module.exports = router;

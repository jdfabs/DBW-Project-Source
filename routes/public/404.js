"use strict";

const express = require("express");
const router = express.Router();
const { C404Controller } = require("../../controler/publicController/404Controller");

router.use((req, res, next) => {
  C404Controller.render404Page(req, res);
});

module.exports = router;

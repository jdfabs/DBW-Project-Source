"use strict";

const express = require('express');
const router = express.Router();
const personalGaleryController = require('../../controler/authenticatedController/personalGaleryCotroller');

router.get('/', personalGaleryController);

module.exports = router;
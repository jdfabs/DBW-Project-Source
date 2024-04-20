"use strict";

const express = require('express');
const router = express.Router();

// Importe o controlador de configurações
const settingsController = require('../../controler/authenticatedController/SettingsController');

// Rota para renderizar a página de configurações
router.get('/settings', settingsController);

module.exports = router;

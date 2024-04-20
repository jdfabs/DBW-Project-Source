"use strict";
const express = require('express');
const router = express.Router();

const recipeController = require('../../controler/authenticatedController/recepieController');


module.exports = (req, res) => {
    const receita = recipeController.recipe;
    res.render("recepie", { title: "Recepie", recepie:receita });
};


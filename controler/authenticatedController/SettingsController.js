"use strict";

// Defina a função do controlador
const settingsController = (req, res) => {
    // Renderize a página de configurações
    res.render("settings", { title: "Settings" });
};

// Exporte a função do controlador
module.exports = settingsController;
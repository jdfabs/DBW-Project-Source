"use strict";


const settingsGet = function (req, res) {
    res.render("settings", { title: "Settings" ,  isAuthenticated: req.body.isAuthenticated });
  };

module.exports = { settingsGet};
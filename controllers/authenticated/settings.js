"use strict";


const settingsGet = function (req, res) {
    res.render("settings", { title: "Settings" });
  };

module.exports = { settingsGet};
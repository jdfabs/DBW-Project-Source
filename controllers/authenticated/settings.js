"use strict";


const settingsGet = function (req, res) {//render and send page
  console.log("Settings Controller - settingsGet");
  
    res.render("settings", { title: "Settings" ,  isAuthenticated: req.body.isAuthenticated });
  };

module.exports = { settingsGet};
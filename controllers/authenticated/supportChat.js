"use strict";


const supportChatGet = function (req, res) {
    res.render("supportChat", { title: "Support Chat" ,  isAuthenticated: req.body.isAuthenticated });
  };

module.exports = { supportChatGet};
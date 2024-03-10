"use strict";

module.exports = (req, res) => {
    const recepies = [];
    res.render("recepieGenerator", { title: "Recepie Generator", recepies });
};

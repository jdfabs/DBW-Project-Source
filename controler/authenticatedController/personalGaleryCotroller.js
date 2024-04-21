"use strict";

const personalGaleryController = (req, res) => {
    res.render("personalGalery", { title: "Personal Galery" });
};

module.exports = personalGaleryController;
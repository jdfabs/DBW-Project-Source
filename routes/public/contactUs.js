"us strict"

const express = require("express");
const router = express.Router();
const { renderContactUsPage } = require("../../controler/publicController/ContactUsController");

router.get("/contactUs", renderContactUsPage);

module.exports = router;

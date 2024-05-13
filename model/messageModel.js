"use strict";
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: { type: String, default: "Default Room", required: true },
  user: { type: String, default: "Someone", required: true },
  message: {
    type: String,
    default: "Somatic Feautures of Great Importance",
    required: true,
  },
  timestamp: { type: String, default: "2", required: true },
});

//exporta o modelo para que possa ser usado noutros ficheiros
module.exports = mongoose.model("msg", messageSchema);

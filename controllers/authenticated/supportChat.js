"use strict";
const Mensagem = require("../../model/messageModel")

const supportChatGet = function (req, res) {//render and send page  
  console.log("Support Chat Controller - supportChatGet");
    res.render("supportChat", { title: "Support Chat" ,  isAuthenticated: req.body.isAuthenticated , username: req.user.username});
  };


const supportChatPost = async function(req,res){ //last messages from room request
  console.log("Support Chat Controller - supportChatPost");
  const messages = await Mensagem.find({room:req.body.roomname}).limit(5);
  res.json(messages)
}
module.exports = { supportChatGet,supportChatPost};
"use strict";
const Mensagem = require("../../model/messageModel")

const supportChatGet = function (req, res) {
    res.render("supportChat", { title: "Support Chat" ,  isAuthenticated: req.body.isAuthenticated , username: req.user.username});
  };


const supportChatPost = async function(req,res){
  console.log("Suport chat post")
  console.log(req.body.roomname)
  const messages = await Mensagem.find({room:req.body.roomname}).limit(5);
  res.json(messages)
}
module.exports = { supportChatGet,supportChatPost};
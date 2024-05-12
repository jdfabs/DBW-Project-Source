const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
{
    //room de onde foi lançada a mensagem e onde pode ser acedida
    room:{type:String, default:"Default Room", required:true},

    //nome do utilizador que mandou a mensagem
    user:{type:String, default:"Someone", required:true},

    //mensagem enviada pelo utilizador
    message:{type:String, default:"Somatic Feautures of Great Importance", required:true},

    //data e hora de quando a mensagem foi enviada
    timestamp:{type:String, default:"2", required:true}



})

//exporta o modelo para que possa ser usado noutros ficheiros
module.exports = mongoose.model('msg', messageSchema);

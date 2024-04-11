"use strict";
const config = require("./config");

/*
NIVEIS:
0 - aparece sempre - para funcionalidades gerais do programa
1 - primeiro nivel de debug - Geral inicial- para nomes de funções - para saber quais funções estao a ser chamadas
2 - Geral final - para retornos
3 - Especifico - para variaveis
4 - Full Debug
*/

const log = function (prio, message) {
  if (prio == 0) console.log(message);
  else if (config.devMode && prio <= config.devModeLevel) console.log(message);
};

module.exports = { log };

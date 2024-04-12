"use strict";

const buildRecipeName = async function (recipe) {
  debug.log(0, "Adding missing recipe Name");

  //LLM CALL
  let response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma:2b",
      prompt:
        "Generate, with creativity,  a 'recipeName' for this recipe: A classic Italian pasta dish made with eggs, bacon, and cheese. ```json ",
      format: "json",
      stream: false,
      options: {
        num_gpu: 40,
      },
    }),
  });
  const responseData = await response.json().response; //mensagem
  recipe.recipeName = JSON.parse(responseData).recipeName;
  return recipe;
};



module.exports = { buildRecipeName };

"use strict";
const express = require("express"); //View engine
const router = express.Router(); //Instance of the router

const config = require("../../config");

if (config.devMode) { //only work if in dev mode in config file
  console.log("@@@@@ Development Routes are Open @@@@@");

  router.route("/getOpenAIResponse").get(async (req, res) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "in any recepie you may freely include any basic spice./n Be extremely shot and precise on each section of the answer, respond only the the following template, without any excuses, '--' means a comment for you:/n/n Name: [RECEPIE NAME]/n/n Description Short: -- maximum 25 words/n/n Ingredients: [INGREDIENT 1], [INGREDIENT  2], .../n Preparation time: [TIME]/n Cooking time: [TIME]/n Difficulty: [DIFFICULTY] -- out of 10/n Portions: [NUMBER + UNIT]/n/n PREPARATION: -- create these steps for begginners, minimum 20 steps/n 1 - [STEP 1] /n 2 - [STEP 2] /n ...",
        },
        {
          role: "user",
          content:
            "generate me a recepie using these ingredients:/n colored bell peppers, chicken, cream cheese, dry ranch dressing,  cheddar cheese, bacon /n You may remove up to two of the previous ingredients then add two more new ingredients./n Using an oven, maximum 1h30m, easy dificulty",
        },
      ],
      max_tokens: 400,
    });
    console.log(response.choices[0]);
  });
}

module.exports = router;

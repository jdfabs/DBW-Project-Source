"use strict";
const express = require("express"); //View engine
const OpenAIApi = require("openai"); //Api OpenAi
const debug = require("../../debugTools");
const config = require("../../config");
const recepieModel = require("../../model/recepieModel");
const router = express.Router(); //Instance of the router
/*
const openai = new OpenAIApi({
  api_key: config.openAI_API_Key,
}); //Instance of OpenAI API
*/

if (config.devMode) {
  //only work if in dev mode in config file
  console.log("@@@@@ Development Routes are Open @@@@@");
  /* 
  router.route("/getOpenAIResponse").get(async (req, res) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },

      messages: [
        {
          role: "system",
          content:
            'You are a helpful assistant designed to output JSON. jsonTemplate = {"recipeName": &RECEPIENAME&, "ingredients": [ &INGREDIENT_ONE&, &INGREDIENT_TWO&, &INGREDIENT_THREE&, (...) ], "instructions": [ &INSTRUCTION_ONE&, &INSTRUCTION_TWO&, &INSTRUCTION_THREE&, (...) ],"description": &DESCRIPTION&, //minimum 200 words "difficultyLevel": &DIFICULTY&, //easy, medium, hard, chef "preparationTime": &PREPARATION_TIME&, "cookingTime": &COOKING_TIME&, "totalTime": &TOTAL_TIME&, //preparation time + cooking time "servings": &NUM_SERVINGS&, //number of servings "cuisine": &CUISINE_TYPE&, //american, mexican, etc "dietaryInformation": [ //keto, vegan, etc &DIETARY_INFO_ONE&, &DIETARY_INFO_TWO&, &DIETARY_INFO_THREE&, (...) ], "nutritionalInformation": { "calories": &CALORIES&, "fat": &FAT_GRAMS&, "carbohydrates": &CARBOHYDRATES_GRAMS&, "protein": &PROTEIN_GRAMS& }, "notes": &NOTES&, "allergenInformation": [ //dairy, nuts, etc   &ALLERGEN_ONE&, &ALLERGEN_TWO&, &ALLERGEN_THREE&, (...) ], "substitutions": [ //ingredient substitution &SUBSTITUTION_ONE&, &SUBSTITUTION_TWO&, &SUBSTITUTION_THREE&, (...) ], "equipmentNeeded": [ //baking dish, foil, etc   &EQUIPMENT_ONE&, &EQUIPMENT_TWO&, &EQUIPMENT_THREE&, (...) ], "mealType": [ //lunch, dinner, breakfast, dessert, snack, appetizer, drink &MEAL_TYPE_ONE&, &MEAL_TYPE_TWO&, &MEAL_TYPE_THREE&, (...) ] };',
        },
        {
          role: "user",
          content:
            "in any recepie you may freely include any basic spice./n Be extremely shot and precise on each section of the answer",
        },
        {
          role: "user",
          content:
            "generate me a recepie using these ingredients:/n potato,carrot, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon /n You may remove up to two of the previous ingredients then add two more new ingredients./n maximum 45min, easy dificulty",
        },
      ],
      max_tokens: 1000,// out of 5 stars 
    });
    console.log(response.choices[0].message.content);

    const json = JSON.parse(response.choices[0].message.content);

    const recepies = [
      {
        title: json.recipeName,
        description: json.description,
        ingredients: json.ingredients,
        tags: json.ingredients,
      },
    ];

    res.render("recepieGenerator", { title: "Recepie Generator", recepies });
  });
}

router.get("/test001", (req, res) => {
  console.log("hello from text endpoint");

  const OpenAIOutput =
    "{\n" +
    '  "RecipeName": "Stuffed Bell Peppers",\n' +
    '  "Ingredients": ["Colored bell peppers", "Chicken", "Cream cheese", "Cheddar cheese", "Bacon", "Garlic powder", "Onion powder"],\n' +
    '  "Instructions": ["Preheat oven to 375°F.", "Cook chicken and bacon, then chop into small pieces.", "Mix chicken, bacon, cream cheese, cheddar cheese, garlic powder, and onion powder in a bowl.", "Cut off the tops of the bell peppers and remove seeds.", "Stuff bell peppers with mixture.", "Bake in the oven for 30 minutes.", "Optional: top with extra cheese and bake for another 10 minutes until bubbly and golden."],\n' +
    '  "Difficulty Level": "easy",\n' +
    '  "Preparation Time": "20 minutes",\n' +
    '  "Cooking Time": "40 minutes",\n' +
    '  "Total Time": "1 hour",\n' +
    '  "Servings": 4,\n' +
    '  "Cuisine": "American",\n' +
    '  "Dietary Information": [],\n' +
    '  "Nutritional Information": {\n' +
    '    "Calories": 350,\n' +
    '    "Fat": 20,\n' +
    '    "Carbohydrates": 10,\n' +
    '    "Protein": 30\n' +
    "  },\n" +
    '  "Notes": "You can adjust the seasoning to your taste preferences.",\n' +
    '  "Rating/Reviews": "4.5 stars",\n' +
    '  "Allergen Information": ["Dairy"],\n' +
    '  "Substitutions": [],\n' +
    '  "Equipment Needed": ["Baking dish", "Knife", "Cutting board"],\n' +
    '  "Meal Type": ["Dinner"]\n' +
    "}";

  const jsonParsed = JSON.parse(OpenAIOutput);

  const json = {
    RecipeName: "Stuffed Bell Peppers",
    Ingredients: [
      "Colored bell peppers",
      "Chicken",
      "Cream cheese",
      "Cheddar cheese",
      "Bacon",
      "Garlic powder",
      "Onion powder",
    ],
    Instructions: [
      "Preheat oven to 375°F.",
      "Cook chicken and bacon, then chop into small pieces.",
      "Mix chicken, bacon, cream cheese, cheddar cheese, garlic powder, and onion powder in a bowl.",
      "Cut off the tops of the bell peppers and remove seeds.",
      "Stuff bell peppers with mixture.",
      "Bake in the oven for 30 minutes.",
      "Optional: top with extra cheese and bake for another 10 minutes until bubbly and golden.",
    ],
    Description:
      "Stuffed Bell Peppers is a delicious and easy dinner recipe that is perfect for a weeknight meal. The combination of chicken, bacon, and cheese makes for a flavorful and satisfying dish. The bell peppers are stuffed with a creamy mixture of chicken, bacon, cream cheese, and cheddar cheese, then baked until tender. This recipe is easy to prepare and can be customized to your taste preferences. You can adjust the seasoning to your liking and add extra cheese for a gooey and indulgent finish. Stuffed Bell Peppers are a great way to enjoy a comforting and hearty meal that the whole family will love.",
    "Difficulty Level": "easy",
    "Preparation Time": "20 minutes",
    "Cooking Time": "40 minutes",
    "Total Time": "1 hour",
    Servings: 4,
    Cuisine: "American",
    "Dietary Information": [],
    "Nutritional Information": {
      Calories: 350,
      Fat: 20,
      Carbohydrates: 10,
      Protein: 30,
    },
    Notes: "You can adjust the seasoning to your taste preferences.",
    "Rating/Reviews": "4.5 stars",
    "Allergen Information": ["Dairy"],
    Substitutions: [],
    "Equipment Needed": ["Baking dish", "Knife", "Cutting board"],
    "Meal Type": ["Dinner"],
  };
  //console.log(json);

  const recepies = [
    {
      title: json.RecipeName,
      description: json.Description,
      ingredients: json.Ingredients,
      tags: json.Ingredients,
    },
  ];

  res.render("recepieGenerator", { title: "Recepie Generator", recepies });
*/
}
router.get(
  "/test001",
  async (req, res) => {
    debug.log(1, "forceValidRecipe:");
    let validRecipe = base;

    let isFixed = false;
    const limit = 5;
    let counter = 0;

    while (!isFixed && counter < limit) {
      try {
        await recepieModel.validate(validRecipe);
        isFixed = true;
      } catch (error) {
        console.log(error);
        const missingParams = Object.keys(error.errors);

        console.log(missingParams);
        console.log(validRecipe);

        for (let param of missingParams) {

          let grandParent = "";
        let parent = "";

          if (param.indexOf(".") != -1) {
            parent = param.substring(0, param.indexOf("."));
            param = param.substring(param.indexOf(".") + 1, param.Length);
            if (param.indexOf(".") != -1) {
              grandParent = parent;
              parent = param.substring(0, param.indexOf("."));
              param = param.substring(param.indexOf(".") + 1, param.Length);
            }
          }

          if (grandParent != "") {
            if (validRecipe[grandParent] === undefined) {
              validRecipe[grandParent] = {}; // Initialize the object if it doesn't exist
            }
          }
          if (parent != "") {
            if (grandParent != "") {
              if (validRecipe[grandParent][parent] === undefined) {
                validRecipe[grandParent][parent] = {};
              }
            } else if (validRecipe[parent] === undefined) {
              validRecipe[parent] = {};
            }
          }
  
          if (parent != "") {
            if (grandParent != "") {
              if (validRecipe[grandParent][parent][param] === undefined) {
                validRecipe[grandParent][parent][param] = await generateField(validRecipe);
              }
            } else if (validRecipe[parent][param] === undefined) {
              validRecipe[parent][param] = await generateField(validRecipe);
            }
          } else {
            if (validRecipe[param] === undefined) {
              validRecipe[param] = await generateField(validRecipe);
            }
          }
        }
      }
      counter++;
    }
    if (!isFixed) {
      console.log("@@@@@@@@@ FATAL ERROR - FAILED TO FORCE RECIPE VALIDATION");
    }
    return validRecipe;    
  }
);

const generateField = async function (base) {
  //TO-DO
  return 10;
};

const isRecepieValid = async function (base) {
  debug.log(1, "validateRecipe:");
  try {
    await recepieModel.validate(base);
    debug.log(2, true);
    return true;
  } catch (error) {
    const missingParams = Object.keys(error);
    debug.log(3, missingParams);
    debug.log(2, false);
    return false;
  }
};
module.exports = router;

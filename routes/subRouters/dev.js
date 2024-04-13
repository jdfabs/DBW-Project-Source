"use strict";
const express = require("express"); //View engine
const OpenAIApi = require("openai"); //Api OpenAi
const debug = require("../../debugTools");
const config = require("../../config");
const recepieModel = require("../../model/recepieModel");
const router = express.Router(); //Instance of the router
const recepieGenerator = require("../../middlewares/recipeGenerator");

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
router.get("/test001", async (req, res) => {
  debug.log(1, "forceValidRecipe:");
  let validRecipe = {
    nutritionalInformation: {
      
      calories: { value: 10, unit: "sim" },
    },
  };

  let isFixed = false;
  const limit = 5;
  let counter = 0;

  while (!isFixed && counter < limit) {
    try {
      await recepieModel.validate(validRecipe);
      isFixed = true;
    } catch (error) {
      const missingParams = Object.keys(error.errors);
      
      for (let param of missingParams) {
        let grandParent = "";
        let parent = "";
        //Separa a hierarquia
        if (param.indexOf(".") != -1) {
          parent = param.substring(0, param.indexOf("."));
          param = param.substring(param.indexOf(".") + 1, param.Length);
          if (param.indexOf(".") != -1) {
            grandParent = parent;
            parent = param.substring(0, param.indexOf("."));
            param = param.substring(param.indexOf(".") + 1, param.Length);
          }
        }
        //Verificar se todos os objectos da hierarquia existes, caso n existam gera um novo
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
        //Gerar campo em falta final a vazio
        if (parent != "") {
          if (grandParent != "") {
            if (validRecipe[grandParent][parent][param] === undefined) {
              validRecipe[grandParent][parent][param] = 0;              
            }
          } else if (validRecipe[parent][param] === undefined) {
            validRecipe[parent][param] = 0;
          }
        } else {
          if (validRecipe[param] === undefined) {
            validRecipe[param] = 0;
          }
        }
      }
      //Manda o Gerador de Receitas criar os restantes
      //console.log(validRecipe);
      validRecipe = await recepieGenerator.generateMissingFields(
        missingParams,
        validRecipe,
        validRecipe
      );

    }
    counter++;
  }
  if (!isFixed) {
    console.log("@@@@@@@@@ FATAL ERROR - FAILED TO FORCE RECIPE VALIDATION");
  }
  return validRecipe;
});

router.get("/test002", async (req, res) => {
  
  recepieGenerator.tryFixInt("","","servings",JSON.parse(
    '{"recipeName": "Easy Beef and Vegetable Stir-Fry","ingredients": [{ "name": "potato", "quantity": "1", "unit": "" },{ "name": "carrot", "quantity": "2", "unit": "" },{ "name": "beef", "quantity": "1/4 pound", "unit": "" },{ "name": "onions", "quantity": "3", "unit": "" },{ "name": "olive oil", "quantity": "2 tablespoons", "unit": "" },{ "name": "cheese", "quantity": "1/4 cup shredded", "unit": "" },{ "name": "broccoli", "quantity": "1 cup chopped", "unit": "" },{ "name": "cinnamon", "quantity": "2 teaspoons ground", "unit": "" },{ "name": "lemon", "quantity": "1/4", "unit": "" }],"instructions": [{ "instruction": "Peel and chop the potato and carrot into small pieces." },{ "instruction": "Heat 1 tablespoon of olive oil in a large skillet over medium-high heat. Add the beef, onions, broccoli, cinnamon, and lemon juice to the skillet and cook until the beef is browned and the vegetables are tender.", "step": 1, "startTime": 1609459200 },{ "instruction": "Add 1/4 cup of water to the skillet and bring to a boil. Reduce the heat to low and simmer for 3-5 minutes, or until all the liquid is absorbed." },{ "instruction": "Season with salt and pepper to taste. Remove from heat.", "step": 2, "startTime": 1609472800 },{ "instruction": "Serve the stir-fry over rice or noodles." }],"description": "A simple and healthy meal made with potatoes, carrots, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon. Perfect for a quick dinner.","difficultyLevel": "easy","preparationTime": { "value": 20, "unit": "" },"cookingTime": { "value": 10, "unit": "" },"totalTime": {"value": 30, "unit": ""},"cuisine": "Asian","dietaryInformation": [{"name": "Gluten-free", "info": "The ingredients do not contain any gluten."}],"nutritionalInformation": {"calories": { "value": 250, "unit": "" },"proteins": {"value": 12, "unit": ""},"saturatedFats": {"value": 15, "unit": ""},"unSaturatedFats": {"value": 3, "unit": ""},"cholesterol": {"value": 10, "unit": ""},"carbohydrates": {"value": 50, "unit": ""},"sugar": {"value": 5, "unit": ""},"vitamins": [{"name": "Vitamin C", "info": "100% of the recommended daily value."}],"minerals": [{"name": "Iron", "info": "10% of the recommended daily value."}]},"notes": { "type": "string", "required": true }}'
  ));
});

module.exports = router;

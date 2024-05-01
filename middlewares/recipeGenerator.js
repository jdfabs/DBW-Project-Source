"use strict";
const config = require("../config");
const recipeModel = require("../model/recipeModel");
const OpenAIApi = require("openai"); //Api OpenAi
//const openai = new OpenAIApi(); //Instance of OpenAI API

const newRecipe = async function (data) {
if(config.mockData){
  console.log("MOCK DATA!!!");
  const recipeMock = {
    recipeName: 'Hearty Pasta Soup',
    ingredients: [
      'Olive oil',    'Garlic',
      'Onion',        'Salt',
      'Black pepper', 'Chicken broth',
      'Tomatoes',     'Pasta',
      'Eggs',         'Parmesan cheese',
      'Basil',        'Oregano'
    ],
    instructions: [
      { instruction: 'Heat olive oil in a large pot over medium heat.' },
      {
        instruction: 'Add minced garlic and diced onion, sauté until fragrant.'
      },
      { instruction: 'Season with salt and black pepper to taste.' },
      {
        instruction: 'Pour in chicken broth and bring to a gentle simmer.'
      },
      {
        instruction: 'Add chopped tomatoes and let them cook down slightly.'
      },
      { instruction: 'Stir in pasta and cook until al dente.' },
      {
        instruction: 'In a separate bowl, beat the eggs and slowly drizzle into the soup while stirring constantly.'
      },
      {
        instruction: 'Sprinkle Parmesan cheese over the soup and stir to combine.'
      },
      {
        instruction: 'Season with more salt and black pepper if needed.'
      },
      {
        instruction: 'Serve hot, garnished with fresh basil and oregano.'
      }
    ],
    description: 'A comforting and hearty pasta soup that is perfect for warming you up on a chilly day. This soup combines the richness of chicken broth with the heartiness of pasta, creating a delicious and flavorful meal. The addition of fresh tomatoes adds a burst of freshness, while the Parmesan cheese provides a creamy and cheesy finish. With a blend of basil and oregano, this soup is elevated with aromatic flavors that will leave you craving for more.',
    difficultyLevel: 'easy',
    preparationTime: 20,
    cookingTime: 40,
    servings: 4,
    cuisine: 'Italian',
    nutritionalInformation: {
      calories: 320,
      proteins: 15,
      saturated: 5,
      unsaturated: 8,
      cholesterol: 100,
      carbohydrates: 40,
      sugar: 5,
      vitamins: [ [Object], [Object] ],
      minerals: [ [Object], [Object] ]
    },
    notes: 'This Hearty Pasta Soup is a satisfying and nutritious meal that is sure to please your taste buds. The blend of flavors from the fresh ingredients and spices creates a comforting dish perfect for any time of the year.',
    allergenInformation: [ { name: 'Dairy', info: 'Contains Parmesan cheese' } ],
    substitutions: [
      { name: 'Vegetable broth', quantity: 1, unit: 'kg' },
      { name: 'Zucchini noodles', quantity: 200, unit: 'g' }
    ],
    equipmentNeeded: [ { name: 'Large pot' }, { name: 'Bowl' } ],
    mealType: 'Lunch',
    tags: [
      'lunch',        'italian',
      'olive oil',    'garlic',
      'onion',        'salt',
      'black pepper', 'chicken broth',
      'tomatoes',     'pasta',
      'eggs',         'parmesan cheese',
      'basil',        'oregano'
    ],
    isFeatured: false,
    visibility: 'private',
    createTime: 1713526494807,
    creator: 'Default User',
    isPublic: false,
    status: 'draft',
    userRatings: [],
    likes: 0,
    dislikes: 0,
    comments: []
  }

  return  recipeMock;
}
/*
  let recipe = recipeModel.newDefaultRecipe();

  recipe = await buildBase(data, recipe);
  data.recipeName = recipe.recipeName;
  data.description = recipe.description;

  recipe = await buildMainInfo(data, recipe);
  data.instructions = recipe.instructions;

  recipe = await buildSecondaryInfo(data, recipe);

  recipe = await buildTags(recipe);
  console.log(recipe);

  return recipe; */
};
/*
const buildBase = async function (data, base) {
  console.log("Building Base");

  let cleanDataString = generateReadableString(data);

  const setupPrompt = {
    role: "system",
    content:
      'You are a helpful assistant designed to output JSON. jsonTemplate = {"recipeName": &recipeNAME&, "ingredients": [ &INGREDIENT_ONE&, &INGREDIENT_TWO&, &INGREDIENT_THREE&, (...) ], description": &DESCRIPTION&, //minimum 200 words "difficultyLevel": &DIFICULTY&, //easy, medium, hard, chef ,"servings": &NUM_SERVINGS&, //number of servings "cuisine": &CUISINE_TYPE&, //american, mexican, etc };',
  };
  const instructionPrompt = {
    role: "system",
    content:
      "in any recipe you may freely include any basic spice. The descriptions must NOT include instruction, minimum of 50 words",
  };
  const dataPrompt = {
    role: "user",
    content:
      "generate me a recipe using the following information: " +
      cleanDataString,
  };

  const request = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },

    messages: [setupPrompt, instructionPrompt, dataPrompt],
    max_tokens: 1000,
    temperature: 1,
  });
  const response = JSON.parse(request.choices[0].message.content);

  //Se a resposta contem X, copia - else continua o default
  if (response.recipeName) base.recipeName = response.recipeName;
  if (response.ingredients) base.ingredients = response.ingredients;
  if (response.description) base.description = response.description;
  if (response.dificultyLevel) base.difficultyLevel = response.dificultyLevel;
  if (response.servings) base.servings = response.servings;
  if (response.cuisine) base.cuisine = response.cuisine;



  return base;
};

const buildMainInfo = async function (data, base) {
  //Request -- TODO promp engeneering
  console.log("Building Main Info");
  let cleanDataString = generateReadableString(data);

  const setupPrompt = {
    role: "system",
    content:
      'jsonSchema = {instructions: [{instruction: {type: String,required: true,},},],nutritionalInformation: {calories: { type: Number, default: -1, required: true },proteins: { type: Number, default: -1, required: true },saturated: { type: Number, default: -1, required: true },unsaturated: { type: Number, default: -1, required: true },cholesterol: { type: Number, default: -1, required: true },carbohydrates: { type: Number, default: -1, required: true },sugar: { type: Number, default: -1, required: true },vitamins: [{ name: { type: String, default: "Default Vitamin", required: true } },],minerals: [{ name: { type: String, default: "Default Mineral", required: true } },],}, mealType: {type: String,default: "Lunch",enum: ["Breakfast", "Brunch", "Lunch", "Snack", "Dinner"],required: true,},notes: "Default Notes",}',
  };

  const dataPrompt = {
    role: "user",
    content:
      "Create 10 steps for this recipe. Generate all nutritional info. Generates notes. Generate mealType. Use this as base: " +
      cleanDataString,
  };
  const request = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },

    messages: [setupPrompt, dataPrompt],
    max_tokens: 1000,
  });

  //Response
  const response = JSON.parse(request.choices[0].message.content);

  //Set new values
  if (response.instructions) base.instructions = response.instructions;
  if (response.nutritionalInformation)
    base.nutritionalInformation = response.nutritionalInformation;
  if (response.notes) base.notes = response.notes;
  if (response.mealType) base.mealType = response.mealType;

  return base;
};

const buildSecondaryInfo = async function (data, base) {
  //Request -- TODO promp engeneering
  let cleanDataString = generateReadableString(data);
  console.log("Building SecondaryInfo");

  const setupPrompt = {
    role: "system",
    content:
      'jsonSchema = {preparationTime: { type: Number, default: -1, required: true },cookingTime: { type: Number, default: -1, required: true },allergenInformation: [{name: { type: String, default: "Default name", required: true },info: { type: String, default: "Default info", required: true },},],substitutions: [{name: { type: String, default: "Default name", required: true },quantity: { type: Number, default: -1, required: true },unit: {type: String,enum: ["kg", "g", "lb", "un"],default: "un",required: true,},},],equipmentNeeded: [{ name: { type: String, default: "Default name", required: true } },],}',
  };

  const dataPrompt = {
    role: "user",
    content:
      "Generate preparationTime, cookingTime, AllergenInformation, substitutions and equipmentNeeded. Use this as base:" +
      cleanDataString,
  };
  const request = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },

    messages: [setupPrompt, dataPrompt],
    max_tokens: 1000,
  });

  //Response
  const response = JSON.parse(request.choices[0].message.content);

  //Set new values
  if (response.preparationTime) base.preparationTime = response.preparationTime;
  if (response.cookingTime) base.cookingTime = response.cookingTime;
  if (response.allergenInformation)
    base.allergenInformation = response.allergenInformation;
  if (response.substitutions) base.substitutions = response.substitutions;
  if (response.equipmentNeeded) base.equipmentNeeded = response.equipmentNeeded;

  return base;
};

const buildTags = async function (base) {
  // Extracting meal type, cuisine type, and ingredients
  console.log("Building Tags");
  const { mealType, cuisine, ingredients } = base;

  // Add meal type and cuisine type as tags
  base.tags.push(mealType.toLowerCase());
  base.tags.push(cuisine.toLowerCase());

  // Add ingredients as tags
  ingredients.forEach((ingredient) => {
    base.tags.push(ingredient.toLowerCase());
  });

  return base;
};

module.exports = {
  newRecipe,
  buildBase,
  buildMainInfo,
  buildSecondaryInfo,
  buildTags,
};
*/
//AUX

function generateReadableString(object) {
  let readableString = "";

  function traverseObject(obj, parentKey = "") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          traverseObject(obj[key], parentKey + key + ".");
        } else {
          if (obj[key] && obj[key] != -1) {
            readableString += `${parentKey}${key}: ${obj[key]}\n`;
          }
        }
      }
    }
  }

  traverseObject(object);
  return readableString;
}

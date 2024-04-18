"use strict";
const config = require("../config");
const recipeModel = require("../model/recipeModel");
const OpenAIApi = require("openai"); //Api OpenAi
const openai = new OpenAIApi(); //Instance of OpenAI API

const newRecipe = async function (data) {
  let recipe = recipeModel.newDefaultRecipe();

  recipe = await buildBase(data, recipe);
  data.recipeName = recipe.recipeName;
  data.description = recipe.description;

  recipe = await buildMainInfo(data, recipe);
  data.instructions = recipe.instructions;

  recipe = await buildSecondaryInfo(data, recipe);

  recipe = await buildTags(recipe);
  console.log(recipe);
};

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

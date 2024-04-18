"use strict";
const config = require("../config");
const recepieModel = require("../model/recepieModel");

const OpenAIApi = require("openai"); //Api OpenAi
const openai = new OpenAIApi(); //Instance of OpenAI API

//Modificar --- ???
/*const generateMissingFields = async function (
  missingParams,
  validIncompleteRecipe,
  baseRecepie
) {
  console.log("GeneratingMissingFields");

  //TO-DO
  //LLM CALL

  //recipeName em falta
  if (missingParams.includes("recipeName")) {
    if (!missingParams.includes("description")) {
      //receita já tinha descrição - criar nome
      //adicionar o nome ao field que está errado
      validIncompleteRecipe["recipeName"] = await fixer.fixData(
        "recipeName",
        baseRecepie
      );
      //Retira nome da receita da lista de problemas
      missingParams = missingParams.filter((item) => item !== "recipeName");
    } else {
      //sem nome nem descrição -- SEM INFO SUFECIENTE - receita nova com base nos dados existentes

      return await buildNewRecipe(baseRecepie);
      //Retorna a nova receita gerada a partir dos dados previamente existentes
    }
  } else if (
    missingParams.includes("description") &&
    !missingParams.includes("recipeName")
  ) {
    //receita já tinha tituto - criar descrição com base nos dados existentes
    //adicionar o descrição nova
    validIncompleteRecipe["description"] = await fixer.fixData(
      "description",
      baseRecepie
    );
    //Retira descrição da receita da lista de problemas

    missingParams = missingParams.filter((item) => item !== "description");
  }
  //RECEITA TEM NOME E DESCRIÇÃO NO MINIMO VVVVVVVVVVV

  for (let param of missingParams) {
    console.log("Generating: " + param);

    const slitPath = splitJSONPath(param);
    let grandParent = slitPath[0];
    let parent = slitPath[1];
    let child = slitPath[2];

    //Adiciona o novo valor ao parametro correcto
    if (grandParent) {
      validIncompleteRecipe[grandParent][parent][child] = await fixer.fixData(
        param,
        validIncompleteRecipe
      );
    } else if (parent) {
      validIncompleteRecipe[parent][child] = await fixer.fixData(
        param,
        validIncompleteRecipe
      );
    } else {
      validIncompleteRecipe[child] = await fixer.fixData(
        param,
        validIncompleteRecipe
      );
    }

    missingParams = missingParams.splice(missingParams.indexOf(child), 1);
  }

  return validIncompleteRecipe;
};*/

//Completar
const buildNewRecipe = async function (data) {
  console.log("Generating new recipe -- not enough info");
  let newRecipe = null;
  if (!config.mockData) {
    const promptGuidance =
      " You are a helpful assistant designed to output JSON" +
      " In any recepie you may freely include any basic spice" +
      " Be extremely shot and precise on each section of the answer";

    const promptDataSchema =
      " Template = const recepieSchema = mongoose.Schema({recipeName: { type: String, required: true },ingredients: [{name: { type: String, required: true },quantity: { type: String, required: true },},],instructions: [{ instruction: { type: String, required: true } }],description: { type: String, required: true },difficultyLevel: { type: String, required: true },preparationTime: {value: { type: Number, required: true },unit: { type: String, required: true },},cookingTime: {value: { type: Number, required: true },unit: { type: String, required: true },},totalTime: {value: { type: Number, required: true },unit: { type: String, required: true },},servings: { type: Number, required: true },cuisine: { type: String, required: true },dietaryInformation: [{name: { type: String, required: true },info: { type: String, required: true },},],nutritionalInformation: {calories: {value: { type: Number, required: true },unit: { type: String, required: true },},proteins: {value: { type: Number, required: true },unit: { type: String, required: true }},saturatedFats: {value: { type: Number, required: true },unit: { type: String, required: true },},unSaturatedFats: {value: { type: Number, required: true },unit: { type: String, required: true },},cholesterol: {value: { type: Number, required: true },unit: { type: String, required: true },},carbohydrates: {value: { type: Number, required: true },unit: { type: String, required: true },},sugar: {value: { type: Number, required: true },unit: { type: String, required: true },},vitamins: [{ name: { type: String, required: true } }],minerals: [{ name: { type: String, required: true } }],},notes: { type: String, required: false },allergenInformation: [{name: { type: String, required: true },info: { type: String, required: true },},],substitutions: [{name: { type: String, required: true },quantity: { type: String, required: true },},],equipmentNeeded: [{ name: { type: String, required: true } }],mealType: { type: String, required: true },},{ timestamps: true })";

    const promptDataInfo =
      " generate me a recepie:" +
      " ingredients: [potato,carrot, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon]" +
      " You may remove up to two of the previous ingredients then add two more new ingredients." +
      " maximum time 45min" +
      " easy dificulty";

    let response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi",
        /*BEST*/ prompt:
          promptGuidance + ";" + promptDataSchema + ";" + promptDataInfo,
        /*DECENT*/ //prompt: 'You are a helpful assistant designed to output JSON. jsonTemplate = {"recipeName": &RECEPIENAME&, "ingredients": [ &INGREDIENT_ONE&, &INGREDIENT_TWO&, &INGREDIENT_THREE&, (...) ], "instructions": [ &INSTRUCTION_ONE&, &INSTRUCTION_TWO&, &INSTRUCTION_THREE&, (...) ],"description": &DESCRIPTION&, //minimum 200 words "difficultyLevel": &DIFICULTY&, //easy, medium, hard, chef "preparationTime": &PREPARATION_TIME&, "cookingTime": &COOKING_TIME&, "totalTime": &TOTAL_TIME&, //preparation time + cooking time "servings": &NUM_SERVINGS&, //number of servings "cuisine": &CUISINE_TYPE&, //american, mexican, etc "dietaryInformation": [ //keto, vegan, etc &DIETARY_INFO_ONE&, &DIETARY_INFO_TWO&, &DIETARY_INFO_THREE&, (...) ], "nutritionalInformation": { "calories": &CALORIES&, "fat": &FAT_GRAMS&, "carbohydrates": &CARBOHYDRATES_GRAMS&, "protein": &PROTEIN_GRAMS& }, "notes": &NOTES&, "allergenInformation": [ //dairy, nuts, etc   &ALLERGEN_ONE&, &ALLERGEN_TWO&, &ALLERGEN_THREE&, (...) ], "substitutions": [ //ingredient substitution &SUBSTITUTION_ONE&, &SUBSTITUTION_TWO&, &SUBSTITUTION_THREE&, (...) ], "equipmentNeeded": [ //baking dish, foil, etc   &EQUIPMENT_ONE&, &EQUIPMENT_TWO&, &EQUIPMENT_THREE&, (...) ], "mealType": [ //lunch, dinner, breakfast, dessert, snack, appetizer, drink &MEAL_TYPE_ONE&, &MEAL_TYPE_TWO&, &MEAL_TYPE_THREE&, (...) ] }; in any recepie you may freely include any basic spice./n Be extremely shot and precise on each section of the answer; generate me a recepie using these ingredients:/n potato,carrot, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon /n You may remove up to two of the previous ingredients then add two more new ingredients./n maximum 45min, easy dificulty ',
        format: "json",
        stream: false,
        options: {
          num_gpu: 40,
        },
      }),
    });
    const responseData = await response.json(); //mensagem
    newRecipe = JSON.parse(responseData.response);
  } else {
    //MOCK DATA
    console.log("MOCK DATA HERE!!!");
    newRecipe = JSON.parse(
      '{"recipeName": "Easy Beef and Vegetable Stir-Fry","ingredients": [{ "name": "potato", "quantity": "1", "unit": "" },{ "name": "carrot", "quantity": "2", "unit": "" },{ "name": "beef", "quantity": "1/4 pound", "unit": "" },{ "name": "onions", "quantity": "3", "unit": "" },{ "name": "olive oil", "quantity": "2 tablespoons", "unit": "" },{ "name": "cheese", "quantity": "1/4 cup shredded", "unit": "" },{ "name": "broccoli", "quantity": "1 cup chopped", "unit": "" },{ "name": "cinnamon", "quantity": "2 teaspoons ground", "unit": "" },{ "name": "lemon", "quantity": "1/4", "unit": "" }],"instructions": [{ "instruction": "Peel and chop the potato and carrot into small pieces." },{ "instruction": "Heat 1 tablespoon of olive oil in a large skillet over medium-high heat. Add the beef, onions, broccoli, cinnamon, and lemon juice to the skillet and cook until the beef is browned and the vegetables are tender.", "step": 1, "startTime": 1609459200 },{ "instruction": "Add 1/4 cup of water to the skillet and bring to a boil. Reduce the heat to low and simmer for 3-5 minutes, or until all the liquid is absorbed." },{ "instruction": "Season with salt and pepper to taste. Remove from heat.", "step": 2, "startTime": 1609472800 },{ "instruction": "Serve the stir-fry over rice or noodles." }],"description": "A simple and healthy meal made with potatoes, carrots, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon. Perfect for a quick dinner.","difficultyLevel": "easy","preparationTime": { "value": 20, "unit": "" },"cookingTime": { "value": 10, "unit": "" },"totalTime": {"value": 30, "unit": ""},"servings": 4,"cuisine": "Asian","dietaryInformation": [{"name": "Gluten-free", "info": "The ingredients do not contain any gluten."}],"nutritionalInformation": {"calories": { "value": 250, "unit": "" },"proteins": {"value": 12, "unit": ""},"saturatedFats": {"value": 15, "unit": ""},"unSaturatedFats": {"value": 3, "unit": ""},"cholesterol": {"value": 10, "unit": ""},"carbohydrates": {"value": 50, "unit": ""},"sugar": {"value": 5, "unit": ""},"vitamins": [{"name": "Vitamin C", "info": "100% of the recommended daily value."}],"minerals": [{"name": "Iron", "info": "10% of the recommended daily value."}]},"notes": { "type": "string", "required": true }}'
    );
  }

  console.log(isRecepieValid(newRecipe));
  return newRecipe;
};

const newRecipe = async function (data) {
  let recipe = recepieModel.newDefaultRecipe();

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
      'You are a helpful assistant designed to output JSON. jsonTemplate = {"recipeName": &RECEPIENAME&, "ingredients": [ &INGREDIENT_ONE&, &INGREDIENT_TWO&, &INGREDIENT_THREE&, (...) ], description": &DESCRIPTION&, //minimum 200 words "difficultyLevel": &DIFICULTY&, //easy, medium, hard, chef ,"servings": &NUM_SERVINGS&, //number of servings "cuisine": &CUISINE_TYPE&, //american, mexican, etc };',
  };
  const instructionPrompt = {
    role: "system",
    content:
      "in any recepie you may freely include any basic spice. The descriptions must NOT include instruction, minimum of 50 words",
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
  base.instructions = response.instructions;
  base.nutritionalInformation = response.nutritionalInformation;
  base.notes = response.notes;
  base.mealType = response.mealType;

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

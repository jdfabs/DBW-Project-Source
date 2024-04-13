"use strict";
const config = require("../config");
const recepieModel = require("../model/recepieModel");

const generateMissingFields = async function (
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
      validIncompleteRecipe["recipeName"] = await fixData(
        "recipeName",
        baseRecepie
      );
      //Retira nome da receita da lista de problemas
      missingParams = missingParams.filter((item) => item !== "recipeName");
    } else {
      //sem nome nem descrição -- SEM INFO SUFECIENTE - receita nova com base nos dados existentes

      return await buildNewRecepie(baseRecepie);
      //Retorna a nova receita gerada a partir dos dados previamente existentes
    }
  } else if (
    missingParams.includes("description") &&
    !missingParams.includes("recipeName")
  ) {
    //receita já tinha tituto - criar descrição com base nos dados existentes
    //adicionar o descrição nova
    validIncompleteRecipe["description"] = await fixData(
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
      validIncompleteRecipe[grandParent][parent][child] = await fixData(
        param,
        validIncompleteRecipe
      );
    } else if (parent) {
      validIncompleteRecipe[parent][child] = await fixData(
        param,
        validIncompleteRecipe
      );
    } else {
      validIncompleteRecipe[child] = await fixData(
        param,
        validIncompleteRecipe
      );
    }

    missingParams = missingParams.splice(missingParams.indexOf(child), 1);
  }

  return validIncompleteRecipe;
};

const fixData = async function (fieldToFix, recepie) {
  //TODO
  //console.log("TODO - FIX DATA");

  let isFixed = false;
  let result;
  let temp;

  const slitPath = splitJSONPath(fieldToFix);
  let grandParent = slitPath[0];
  let parent = slitPath[1];
  let child = slitPath[2];

  //try to fix manually
  switch (grandParent || parent || child) {
    case "preparationTime":
    case "cookingTime":
    case "totalTime":
      //Parents with child Value-Unit Combo
      console.log("preparationTime cookingTime totalTime");
      temp = tryFixValueUnitCombo(grandParent, parent, child, recepie);
      isFixed = temp[0];
      result = temp[1];
      break;
    case "servings":
      //INT type
      console.log("servings");
      temp = fixInt(grandParent, parent, child, recepie);
      isFixed = temp[0];
      result = temp[1];
      break;
    case "nutritionalInformation":
      //GrandParent with child Value-Unit Combo
      console.log("nutritionalInformation");
      temp = tryFixValueUnitCombo(grandParent, parent, child, recepie);
      isFixed = temp[0];
      result = temp[1];
      break;
    default:
      //Generic string error
      console.log("UNKNOWN ERROR TYPE");
      temp = tryFixGeneric(grandParent, parent, child, recepie);
      isFixed = temp[0];
      result = temp[1];
      break;
  }
  if (isFixed) return result;
  else {
    //IF fail use AI
    temp = buildRecipeData(grandParent, parent, child, recepie);
    isFixed = temp[0];
    result = temp[1];

    if (isFixed) return result;
    else {
      //IF fail force valid value
      return forceDefaultData(grandParent, parent, child);
    }
  }
};

const tryFixValueUnitCombo = function (
  grandParent,
  parent,
  child,
  currentRecipe
) {
  //TODO
  console.log("TODO - FIXVALUEUNITCOMBO");
  return [false, "data"];
};

const fixInt = function (grandParent, parent, child, currentRecipe) {
  let value;
 
  // Function to create nested structure if it doesn't exist
  const createNestedStructure = (obj, keys) => {
    console.log("checking structure");
    for (let key of keys) {
      if (!obj[key]) {
        obj[key] = {};
        console.log("creating key");
      }
      obj = obj[key];
    }
  };

  // Determine which value to retrieve from currentRecipe
  if (
    grandParent &&
    currentRecipe[grandParent] &&
    currentRecipe[grandParent][parent]
  ) {
    value = currentRecipe[grandParent][parent][child];
  } else if (parent && currentRecipe[parent]) {
    value = currentRecipe[parent][child];
  } else if (currentRecipe[child]) {
    value = currentRecipe[child];
  } else {
    console.log("000");
    //structure doesn't exist -create it and applying default value *shrugs*
    const defaultValue = 4;

    if (grandParent) {
      createNestedStructure(currentRecipe, [grandParent, parent, child]);
      currentRecipe[grandParent][parent][child] = defaultValue;
      console.log("001");
    } else if (parent) {
      createNestedStructure(currentRecipe, [parent, child]);
      currentRecipe[parent][child] = defaultValue;
      console.log("002");
    } else {
      currentRecipe[child] = defaultValue;
      console.log("003");
    }
    
    return currentRecipe;
  }
  try {
    // Try to parse the value as an integer
    const intValue = parseInt(value);
    // If parsing failed or value was NaN, apply default value

    if (!isNaN(intValue)) {
      // Value was successfully parsed and is not NaN
      if (grandParent) {
        currentRecipe[grandParent][parent][child] = intValue;
      } else if (parent) {
        currentRecipe[parent][child] = intValue;
      } else {
        currentRecipe[child] = intValue;
      }
    }
  } catch (error) {
    console.error("Error parsing integer:", error);
    console.log("UNHANDLED ERROR CAUGHT - fixInt");
  }  

  return currentRecipe;
};

const tryFixGeneric = function (grandParent, parent, child, currentRecipe) {
  //TODO
  console.log("TODO - FIXGeneic");
  return [false, 0];
};
const forceDefaultData = function (grandParent, parent, child) {
  //TODO
  console.log("TODO - forceDefaultData");
};

const buildRecipeData = async function (grandParent, parent, child, recepie) {
  //TODO
  console.log("TODO - buildRecipeData");
  return [false, 0];
};

const buildNewRecepie = async function (data) {
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

const isRecepieValid = async function (base) {
  console.log("validateRecipe:");

  try {
    await recepieModel.validate(base);
    return true;
  } catch {
    return false;
  }
};
const splitJSONPath = function (string) {
  let grandParent = "";
  let parent = "";

  // Separate the hierarchy
  if (string.indexOf(".") != -1) {
    parent = string.substring(0, string.indexOf("."));
    string = string.substring(string.indexOf(".") + 1); // Use string.length instead of string.Length
    if (string.indexOf(".") != -1) {
      grandParent = parent;
      parent = string.substring(0, string.indexOf("."));
      string = string.substring(string.indexOf(".") + 1);
    }
  }
  // Return an array containing grandParent, parent, and string
  return [grandParent, parent, string];
};
const buildRecipeName = async function (recipe) {
  debug.log(0, "Adding missing recipe Name");

  console.log("Generating new recipe -- not enough info");

  let response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma:2b",

      prompt:
        "description: A classic Italian pasta dish made with eggs, bacon, and cheese. You will create a 'recipieName' for the given recipe",
      format: "json",
      stream: false,
      options: {
        num_gpu: 40,
      },
    }),
  });
  const responseData = await response.json(); //mensagem
  console.log("000");
  console.log(responseData.response);
  console.log("001");
  return JSON.parse(responseData.response);
};

module.exports = { generateMissingFields, tryFixInt: fixInt };

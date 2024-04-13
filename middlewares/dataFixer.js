"use strict";
const generator = require("./recipeGenerator");

const fixData = async function (fieldToFix, recepie) {
  console.log("000");
  console.log(fieldToFix);
  //console.log("TODO - FIX DATA");
  const slitPath = splitJSONPath(fieldToFix);
  let grandParent = slitPath[0];
  let parent = slitPath[1];
  let child = slitPath[2];

  //fix data
  switch (grandParent || parent || child) {
    case "preparationTime":
    case "cookingTime":
    case "totalTime":
      //Parents with child Value-Unit Combo
      console.log("preparationTime cookingTime totalTime");
      return await fixValueUnitCombo(grandParent, parent, child, recepie);
    case "servings":
      //INT type
      console.log("servings");
      return await fixInt(grandParent, parent, child, recepie);
    case "nutritionalInformation":
      //GrandParent with child Value-Unit Combo
      console.log("nutritionalInformation");
      return await fixValueUnitCombo(grandParent, parent, child, recepie);
    default:
      //Generic string error
      console.log("UNKNOWN ERROR TYPE");
      return await fixGeneric(grandParent, parent, child, recepie);
  }
};

const fixValueUnitCombo = function (grandParent, parent, child, currentRecipe) {
  //TODO
  console.log("TODO - FIXVALUEUNITCOMBO");
  return [false, "data"];
};

const fixInt = async function (grandParent, parent, child, currentRecipe) {
  let value;
  console.log("fixInt");
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

const fixGeneric = function (grandParent, parent, child, currentRecipe) {
  //Value should be a single string
  console.log("TODO - FIXGeneic");

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
    console.log("structure doesn't exist");
    //structure doesn't exist -create it and applying default value *shrugs*
    const defaultValue = "";

    if (grandParent) {
      createNestedStructure(currentRecipe, [grandParent, parent, child]);
      currentRecipe[grandParent][parent][child] = defaultValue;
    } else if (parent) {
      createNestedStructure(currentRecipe, [parent, child]);
      currentRecipe[parent][child] = defaultValue;
    } else {
      currentRecipe[child] = defaultValue;
    }
    return currentRecipe;
  }
  

  if (typeof value !== "string") {
    //ver se tem mais estrutura que o experado
    if (Object.keys(value).length > 1) {
      console.log("Should be a single string, has multiple objects");
      for (let grandChild of Object.keys(value)) {
        if (
          grandChild != "type" &&
          grandChild != "required" &&
          typeof grandChild === "string"
        ) {
          //se não é "type" ou "required" e é string copia para o lugar da child
          if (grandParent) {
            currentRecipe[grandParent][parent][child] = grandChild;
          } else if (parent) {
            currentRecipe[parent][child] = grandChild;
          } else {
            currentRecipe[child] = grandChild;
          }
          console.log("one of the grandchildren was a string and valid");
          return currentRecipe;
        }
      }

      //check if one of the keys fit
    }
    //it's a single value or simply failed all steps
    try {
      //try to parse single value to string
      if (grandParent) {
        currentRecipe[grandParent][parent][child] = String(value);
      } else if (parent) {
        currentRecipe[parent][child] = String(value);
      } else {
        currentRecipe[child] = String(value);
      }
    } catch (error) {
      //fail...?
      console.log(error);
      console.log("UNHANDLED ERROR CAUGHT - fixGeneric");
      console.log(
        "It's not a collection and also can't parse to string *thinking*"
      );
    }
  }

  return currentRecipe;
};

//AUX
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

module.exports = { fixData };

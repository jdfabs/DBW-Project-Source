"use strict"
const generator = require("./recipeGenerator");

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
        temp = fixValueUnitCombo(grandParent, parent, child, recepie);
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
        temp = fixValueUnitCombo(grandParent, parent, child, recepie);
        isFixed = temp[0];
        result = temp[1];
        break;
      default:
        //Generic string error
        console.log("UNKNOWN ERROR TYPE");
        temp = fixGeneric(grandParent, parent, child, recepie);
        isFixed = temp[0];
        result = temp[1];
        break;
    }
    if (isFixed) return result;
    else {
      //IF fail use AI
      temp = await generator.buildRecipeData(grandParent, parent, child, recepie);
      isFixed = temp[0];
      result = temp[1];
  
      if (isFixed) return result;
      else {
        //IF fail force valid value
        return recepie;
      }
    }
  };
  
  const fixValueUnitCombo = function (
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
  
  const fixGeneric = function (grandParent, parent, child, currentRecipe) {
    //TODO
    console.log("TODO - FIXGeneic");
    return [false, 0];
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

  module.exports = {fixData};
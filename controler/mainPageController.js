

"use strict";
const recipeModel = require("../model/recipeModel").RecipeModel;
const dataValidation = require("../middlewares/dbValidation");
const debug = require("../debugTools");




const getRecipes = async function () {
  debug.log(1, "Main Page Controller - getRecipes");
  //addMockData(); //-- Só para adicionar receitas á mão!!!!!! deve estar sempre comentado

 



  const recipes = await getTopTenrecipes();

  return recipes;
};

const getTopTenrecipes = async function () {
  debug.log(1, "Main Page Controller - getTopTenrecipes");
  const recipes = await recipeModel.find({}).limit(10);
  //console.log(recipe);

  return recipes;
};

/*
const addMockData = async function () {
  debug.log(0, "@@@@@ Main Page Controller - addMockData");
  try {
    const recipeMock = new recipeModel({
      recipeName: "Mediterranean Grilled Chicken with Lemon Herb Marinade",
      ingredients: [
        { name: "Chicken breasts", quantity: "4" },
        { name: "Lemon juice", quantity: "1/4 cup" },
        { name: "Olive oil", quantity: "1/4 cup" },
        { name: "Garlic cloves", quantity: "4, minced" },
        { name: "Fresh rosemary", quantity: "1 tablespoon, chopped" },
        { name: "Fresh thyme", quantity: "1 tablespoon, chopped" },
        { name: "Salt", quantity: "1 teaspoon" },
        { name: "Black pepper", quantity: "1/2 teaspoon" },
        { name: "Red pepper flakes", quantity: "1/4 teaspoon" },
      ],
      instructions: [
        {
          instruction:
            "In a bowl, whisk together lemon juice, olive oil, minced garlic, chopped rosemary, chopped thyme, salt, black pepper, and red pepper flakes to make the marinade.",
        },
        {
          instruction:
            "Place the chicken breasts in a resealable plastic bag or a shallow dish. Pour the marinade over the chicken, making sure it is evenly coated. Marinate in the refrigerator for at least 1 hour, or overnight for best results.",
        },
        {
          instruction:
            "Preheat the grill to medium-high heat. Remove the chicken from the marinade and discard any excess marinade.",
        },
        {
          instruction:
            "Grill the chicken breasts for 6-8 minutes per side, or until cooked through and no longer pink in the center, with an internal temperature of 165°F (75°C).",
        },
        {
          instruction:
            "Once cooked, remove the chicken from the grill and let it rest for a few minutes before serving.",
        },
        {
          instruction:
            "Serve the grilled chicken hot with your favorite side dishes, such as grilled vegetables, couscous, or a fresh salad.",
        },
      ],
      description:
        "Tender and flavorful grilled chicken marinated in a zesty lemon herb marinade, inspired by Mediterranean cuisine.",
      difficultyLevel: "Medium",
      preparationTime: { value: 10, unit: "minutes" },
      cookingTime: { value: 15, unit: "minutes" },
      totalTime: { value: 1.5, unit: "hours" },
      servings: 4,
      cuisine: "Mediterranean",
      dietaryInformation: [],
      nutritionalInformation: {
        calories: { value: 280, unit: "kcal" },
        proteins: { value: 28, unit: "g" },
        saturatedFats: { value: 2, unit: "g" },
        unSaturatedFats: { value: 15, unit: "g" },
        cholesterol: { value: 80, unit: "mg" },
        carbohydrates: { value: 3, unit: "g" },
        sugar: { value: 1, unit: "g" },
        vitamins: [],
        minerals: [],
      },
      notes:
        "You can customize the marinade by adding your favorite herbs and spices, such as oregano, basil, or parsley.",
      allergenInformation: [],
      substitutions: [],
      equipmentNeeded: [
        { name: "Grill" },
        { name: "Resealable plastic bag or shallow dish for marinating" },
        { name: "Tongs" },
      ],
      mealType: "Main Course",
    });

    await recipeMock.save();
    console.log(recipeMock);
  } catch (error) {
    console.error(error);
  }
  console.log("Mock data added to DB");
};*/

module.exports = { getRecipes };




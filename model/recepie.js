const mongoose = require("mongoose");

const recepieSchema = mongoose.Schema({
  recipeName: String,
  ingredients: [{ name: String, quantity: String }],
  instructions: [{ instruction: String }],
  description: String,
  difficultyLevel: String,
  preparationTime: { value: Number, unit: String },
  cookingTime: { value: Number, unit: String },
  totalTime: { value: Number, unit: String },
  servings: Number,
  cuisine: String,
  dietaryInformation: [{ name: String, info: String }],
  nutritionalInformation: {
    calories: { value: Number, unit: String },
    proteins: { value: Number, unit: String },
    saturatedFats: { value: Number, unit: String },
    unSaturatedFats: { value: Number, unit: String },
    cholesterol: { value: Number, unit: String },
    carbohydrates: { value: Number, unit: String },
    sugar: { value: Number, unit: String },
    vitamins: [{ name: String }],
    minerals: [{ name: String }],
  },
  notes: String,
  allergenInformation: [{ name: String, info: String }],
  substitutions: [{ name: String, quantity: String }],
  equipmentNeeded: [{ name: String }],
  mealType: String,
});

module.exports = mongoose.model("recepie", recepieSchema);

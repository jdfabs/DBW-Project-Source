const mongoose = require("mongoose");

const recepieSchema = mongoose.Schema(
  {    
    
    recipeName: { type: String, required: true },
    
      ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        
      }
    ],
    
    instructions: [{ instruction: { type: String, required: true } }],
    description: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    preparationTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    cookingTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    totalTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    servings: { type: Number, required: true },
    cuisine: { type: String, required: true },
    dietaryInformation: [
      {
        name: { type: String, required: true },
        info: { type: String, required: true },
      },
    ],
    nutritionalInformation: {
      calories: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      proteins: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      saturatedFats: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      unSaturatedFats: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      cholesterol: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      carbohydrates: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      sugar: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      vitamins: [{ name: { type: String, required: true } }],
      minerals: [{ name: { type: String, required: true } }],
    },
    notes: { type: String, required: false },
    allergenInformation: [
      {
        name: { type: String, required: true },
        info: { type: String, required: true },
      },
    ],
    substitutions: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    equipmentNeeded: [{ name: { type: String, required: true } }],
    mealType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("recepie", recepieSchema);

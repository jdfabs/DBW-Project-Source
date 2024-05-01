const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    recipeName: { type: String, default: "Default Name", required: true },
    ingredients: [{ type: String, default: "Default name", required: true }],
    instructions: [
      {
        instruction: {
          type: String,
          default: "Default instruction",
          required: true,
        },
      },
    ],
    description: {
      type: String,
      default: "Default description",
      required: true,
    },

    difficultyLevel: {
      type: String,
      default: "medium",
      enum: ["easy", "medium", "hard", "chef"],
      required: true,
    },
    preparationTime: { type: Number, default: -1, required: true },
    cookingTime: { type: Number, default: -1, required: true },

    servings: { type: Number, default: -1, required: true },
    cuisine: { type: String, default: "TODO ENUM", required: true },

    nutritionalInformation: {
      calories: { type: Number, default: -1, required: true },
      proteins: { type: Number, default: -1, required: true },
      saturated: { type: Number, default: -1, required: true },
      unsaturated: { type: Number, default: -1, required: true },
      cholesterol: { type: Number, default: -1, required: true },
      carbohydrates: { type: Number, default: -1, required: true },
      sugar: { type: Number, default: -1, required: true },
      vitamins: [
        { name: { type: String, default: "Default Vitamin", required: true } },
      ],
      minerals: [
        { name: { type: String, default: "Default Mineral", required: true } },
      ],
    },
    notes: { type: String, default: "Default Notes" },
    allergenInformation: [
      {
        name: { type: String, default: "Default name", required: true },
        info: { type: String, default: "Default info", required: true },
      },
    ],
    substitutions: [
      {
        name: { type: String, default: "Default name", required: true },
        quantity: { type: Number, default: -1, required: true },
        unit: {
          type: String,
          enum: [
            "kg",
            "g",
            "lb",
            "un",
            "tsp",
            "tbsp",
            "tbs",
            "ml",
            "l",
            "L",
            "shot",
            "cup",
            "oz",
            "pt",
            "qt",
            "gal",
            "can",
          ],
          default: "un",
          required: true,
        },
      },
    ],
    equipmentNeeded: [
      { name: { type: String, default: "Default name", required: true } },
    ],
    mealType: {
      type: String,
      default: "Lunch",
      enum: ["Breakfast", "Brunch", "Lunch", "Snack", "Dinner"],
      required: true,
    },
    creator: { type: String, default: "default user" },
    //Params - não diretamente relacionado com cozinhar
    tags: [{ type: String, default: "Default tag" }],
    isFeatured: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    createTime: { type: Date, default: Date.now }, // Creation timestamp
    /*creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, */ // Reference to the user who created the recipe
    isPublic: { type: Boolean, default: true }, // Whether the recipe is public or private

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    }, // Recipe status
    userRatings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, default: -1 },
      },
    ], // Array of user ratings
    likes: { type: Number, default: 0 }, // Number of upvotes
    dislikes: { type: Number, default: 0 }, // Number of downvotes
    comments: [
      {
        user: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ], // Array of comment IDs
  },
  { timestamps: true }
);

const newDefaultRecipe = function () {
  return {
    recipeName: "Default Name",
    ingredients: [],
    instructions: [],
    description: "Default description",
    difficultyLevel: "easy",
    preparationTime: -1,
    cookingTime: -1,
    servings: -1,
    cuisine: "TODO ENUM",
    nutritionalInformation: {
      calories: -1,
      proteins: -1,
      saturated: -1,
      unsaturated: -1,
      cholesterol: -1,
      carbohydrates: -1,
      sugar: -1,
      vitamins: [],
      minerals: [],
    },
    notes: "Default Notes",
    allergenInformation: [],
    substitutions: [],
    equipmentNeeded: [],
    mealType: "Lunch",

    tags: [],
    isFeatured: false,
    visibility: "private",
    createTime: Date.now(), // Creation timestamp
    creator: "Default User", // Reference to the user who created the recipe
    isPublic: false,
    status: "draft", // Recipe status
    userRatings: [], // Array of user ratings
    likes: 0, // Number of upvotes
    dislikes: 0, // Number of downvotes
    comments: [], // Array of comment IDs
  };
};

module.exports = {
  RecipeModel: mongoose.model("recipe", recipeSchema),
  newDefaultRecipe: newDefaultRecipe,
};

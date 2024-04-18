"use strict";
const express = require("express"); //View engine
const OpenAIApi = require("openai"); //Api OpenAi
const debug = require("../../debugTools");
const config = require("../../config");
const recipeModel = require("../../model/recipeModel");
const router = express.Router(); //Instance of the router
const recipeGenerator = require("../../middlewares/recipeGenerator");


/*
const openai = new OpenAIApi({
  api_key: config.openAI_API_Key,
}); //Instance of OpenAI API
*/

if (config.devMode) {
  //only work if in dev mode in config file
  console.log("@@@@@ Development Routes are Open @@@@@");
  /* 
  router.route("/getOpenAIResponse").get(async (req, res) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },

      messages: [
        {
          role: "system",
          content:
            'You are a helpful assistant designed to output JSON. jsonTemplate = {"recipeName": &recipeNAME&, "ingredients": [ &INGREDIENT_ONE&, &INGREDIENT_TWO&, &INGREDIENT_THREE&, (...) ], "instructions": [ &INSTRUCTION_ONE&, &INSTRUCTION_TWO&, &INSTRUCTION_THREE&, (...) ],"description": &DESCRIPTION&, //minimum 200 words "difficultyLevel": &DIFICULTY&, //easy, medium, hard, chef "preparationTime": &PREPARATION_TIME&, "cookingTime": &COOKING_TIME&, "totalTime": &TOTAL_TIME&, //preparation time + cooking time "servings": &NUM_SERVINGS&, //number of servings "cuisine": &CUISINE_TYPE&, //american, mexican, etc "dietaryInformation": [ //keto, vegan, etc &DIETARY_INFO_ONE&, &DIETARY_INFO_TWO&, &DIETARY_INFO_THREE&, (...) ], "nutritionalInformation": { "calories": &CALORIES&, "fat": &FAT_GRAMS&, "carbohydrates": &CARBOHYDRATES_GRAMS&, "protein": &PROTEIN_GRAMS& }, "notes": &NOTES&, "allergenInformation": [ //dairy, nuts, etc   &ALLERGEN_ONE&, &ALLERGEN_TWO&, &ALLERGEN_THREE&, (...) ], "substitutions": [ //ingredient substitution &SUBSTITUTION_ONE&, &SUBSTITUTION_TWO&, &SUBSTITUTION_THREE&, (...) ], "equipmentNeeded": [ //baking dish, foil, etc   &EQUIPMENT_ONE&, &EQUIPMENT_TWO&, &EQUIPMENT_THREE&, (...) ], "mealType": [ //lunch, dinner, breakfast, dessert, snack, appetizer, drink &MEAL_TYPE_ONE&, &MEAL_TYPE_TWO&, &MEAL_TYPE_THREE&, (...) ] };',
        },
        {
          role: "user",
          content:
            "in any recipe you may freely include any basic spice./n Be extremely shot and precise on each section of the answer",
        },
        {
          role: "user",
          content:
            "generate me a recipe using these ingredients:/n potato,carrot, beef, onions, olive oil, cheese, broccoli, cinnamon, lemon /n You may remove up to two of the previous ingredients then add two more new ingredients./n maximum 45min, easy dificulty",
        },
      ],
      max_tokens: 1000,// out of 5 stars 
    });
    console.log(response.choices[0].message.content);

    const json = JSON.parse(response.choices[0].message.content);

    const recipes = [
      {
        title: json.recipeName,
        description: json.description,
        ingredients: json.ingredients,
        tags: json.ingredients,
      },
    ];

    res.render("recipeGenerator", { title: "recipe Generator", recipes });
  });
}

router.get("/test001", (req, res) => {
  console.log("hello from text endpoint");

  const OpenAIOutput =
    "{\n" +
    '  "RecipeName": "Stuffed Bell Peppers",\n' +
    '  "Ingredients": ["Colored bell peppers", "Chicken", "Cream cheese", "Cheddar cheese", "Bacon", "Garlic powder", "Onion powder"],\n' +
    '  "Instructions": ["Preheat oven to 375°F.", "Cook chicken and bacon, then chop into small pieces.", "Mix chicken, bacon, cream cheese, cheddar cheese, garlic powder, and onion powder in a bowl.", "Cut off the tops of the bell peppers and remove seeds.", "Stuff bell peppers with mixture.", "Bake in the oven for 30 minutes.", "Optional: top with extra cheese and bake for another 10 minutes until bubbly and golden."],\n' +
    '  "Difficulty Level": "easy",\n' +
    '  "Preparation Time": "20 minutes",\n' +
    '  "Cooking Time": "40 minutes",\n' +
    '  "Total Time": "1 hour",\n' +
    '  "Servings": 4,\n' +
    '  "Cuisine": "American",\n' +
    '  "Dietary Information": [],\n' +
    '  "Nutritional Information": {\n' +
    '    "Calories": 350,\n' +
    '    "Fat": 20,\n' +
    '    "Carbohydrates": 10,\n' +
    '    "Protein": 30\n' +
    "  },\n" +
    '  "Notes": "You can adjust the seasoning to your taste preferences.",\n' +
    '  "Rating/Reviews": "4.5 stars",\n' +
    '  "Allergen Information": ["Dairy"],\n' +
    '  "Substitutions": [],\n' +
    '  "Equipment Needed": ["Baking dish", "Knife", "Cutting board"],\n' +
    '  "Meal Type": ["Dinner"]\n' +
    "}";

  const jsonParsed = JSON.parse(OpenAIOutput);

  const json = {
    RecipeName: "Stuffed Bell Peppers",
    Ingredients: [
      "Colored bell peppers",
      "Chicken",
      "Cream cheese",
      "Cheddar cheese",
      "Bacon",
      "Garlic powder",
      "Onion powder",
    ],
    Instructions: [
      "Preheat oven to 375°F.",
      "Cook chicken and bacon, then chop into small pieces.",
      "Mix chicken, bacon, cream cheese, cheddar cheese, garlic powder, and onion powder in a bowl.",
      "Cut off the tops of the bell peppers and remove seeds.",
      "Stuff bell peppers with mixture.",
      "Bake in the oven for 30 minutes.",
      "Optional: top with extra cheese and bake for another 10 minutes until bubbly and golden.",
    ],
    Description:
      "Stuffed Bell Peppers is a delicious and easy dinner recipe that is perfect for a weeknight meal. The combination of chicken, bacon, and cheese makes for a flavorful and satisfying dish. The bell peppers are stuffed with a creamy mixture of chicken, bacon, cream cheese, and cheddar cheese, then baked until tender. This recipe is easy to prepare and can be customized to your taste preferences. You can adjust the seasoning to your liking and add extra cheese for a gooey and indulgent finish. Stuffed Bell Peppers are a great way to enjoy a comforting and hearty meal that the whole family will love.",
    "Difficulty Level": "easy",
    "Preparation Time": "20 minutes",
    "Cooking Time": "40 minutes",
    "Total Time": "1 hour",
    Servings: 4,
    Cuisine: "American",
    "Dietary Information": [],
    "Nutritional Information": {
      Calories: 350,
      Fat: 20,
      Carbohydrates: 10,
      Protein: 30,
    },
    Notes: "You can adjust the seasoning to your taste preferences.",
    "Rating/Reviews": "4.5 stars",
    "Allergen Information": ["Dairy"],
    Substitutions: [],
    "Equipment Needed": ["Baking dish", "Knife", "Cutting board"],
    "Meal Type": ["Dinner"],
  };
  //console.log(json);

  const recipes = [
    {
      title: json.RecipeName,
      description: json.Description,
      ingredients: json.Ingredients,
      tags: json.Ingredients,
    },
  ];

  res.render("recipeGenerator", { title: "recipe Generator", recipes });
*/

  router.get("/test001", async (req, res) => {
    const mockData = {
      ingredients: [
        "potato",
        "carrot",
        "beef",
        "onions",
        "olive oil",
        "cheese",
        "broccoli",
        "cinnamon",
        "lemon",
      ],
      methods: ["Oven"],
      restrictions: [],
      type: [],
      minNumIng: 6,
      maxNumNewIng: 3,
      maxCookTime: 120,
      dificultyLevel: "easy",
      spice: "1",
    };
    /*Data deve incluir:
     *Ingredients
     *Methods
     *Restrictions
     *Dish Types
     *Minimum num of ing
     *Maximum number of new ingredients
     *Maximum cooking time
     *Dificulty
     *Spice
     */
    recipeGenerator.buildBase(mockData, recipeModel.newDefaultRecipe());
  });

  router.get("/test002", async (req, res) => {
    const mockBase = {
      recipeName: "Hearty Beef and Vegetable Bake",
      ingredients: [
        "potato",
        "carrot",
        "beef",
        "onions",
        "olive oil",
        "cheese",
        "broccoli",
        "cinnamon",
        "lemon",
        "basil",
      ],
      instructions: [],
      description:
        "Create a delicious and nutritious meal with this Hearty Beef and Vegetable Bake recipe. This dish combines tender beef with a variety of colorful vegetables including potatoes, carrots, broccoli, and onions. The addition of cheese adds a rich and creamy texture, while a hint of cinnamon and a squeeze of lemon lift the flavors to new heights. To add an extra layer of aroma and taste, basil can be included as a basic spice. Perfect for a cozy meal with family or friends, this easy recipe is sure to become a favorite in your kitchen.",
      difficultyLevel: "easy",
      preparationTime: -1,
      cookingTime: -1,
      servings: 4,
      cuisine: "american",
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
      createTime: 1713459376118,
      creator: "Default User",
      isPublic: false,
      status: "draft",
      userRatings: [],
      likes: 0,
      dislikes: 0,
      comments: [],
    };
    const mockData = {
      ingredients: [
        "potato",
        "carrot",
        "beef",
        "onions",
        "olive oil",
        "cheese",
        "broccoli",
        "cinnamon",
        "lemon",
      ],
      methods: ["Oven"],
      restrictions: [],
      type: [],
      minNumIng: 6,
      maxNumNewIng: 3,
      maxCookTime: 120,
      dificultyLevel: "easy",
      spice: "1",
      description:
        "Create a delicious and nutritious meal with this Hearty Beef and Vegetable Bake recipe. This dish combines tender beef with a variety of colorful vegetables including potatoes, carrots, broccoli, and onions. The addition of cheese adds a rich and creamy texture, while a hint of cinnamon and a squeeze of lemon lift the flavors to new heights. To add an extra layer of aroma and taste, basil can be included as a basic spice. Perfect for a cozy meal with family or friends, this easy recipe is sure to become a favorite in your kitchen.",
      recipeName: "Hearty Beef and Vegetable Bake",
    };
    recipeGenerator.buildMainInfo(mockData, mockBase);
  });
}

router.get("/test003", async (req, res) => {
  const mockBase = {
    recipeName: "Hearty Beef and Vegetable Bake",
    ingredients: [
      "potato",
      "carrot",
      "beef",
      "onions",
      "olive oil",
      "cheese",
      "broccoli",
      "cinnamon",
      "lemon",
      "basil",
    ],
    instructions: [
      { instruction: "Preheat the oven to 375°F (190°C)." },
      {
        instruction:
          "Peel and chop the potatoes, carrots, and onions into bite-sized pieces.",
      },
      {
        instruction:
          "Cut the beef into cubes and season with salt, pepper, and a pinch of cinnamon.",
      },
      {
        instruction: "Heat olive oil in a pan and brown the beef cubes.",
      },
      {
        instruction:
          "In a baking dish, layer the chopped vegetables and beef cubes.",
      },
      {
        instruction:
          "Top the mixture with grated cheese and drizzle with lemon juice.",
      },
      {
        instruction:
          "Cover the dish with foil and bake in the preheated oven for 45 minutes.",
      },
      {
        instruction:
          "Remove the foil and bake for an additional 15 minutes until the cheese is golden and bubbly.",
      },
      { instruction: "Serve hot and enjoy!" },
    ],
    description:
      "Create a delicious and nutritious meal with this Hearty Beef and Vegetable Bake recipe. This dish combines tender beef with a variety of colorful vegetables including potatoes, carrots, broccoli, and onions. The addition of cheese adds a rich and creamy texture, while a hint of cinnamon and a squeeze of lemon lift the flavors to new heights. To add an extra layer of aroma and taste, basil can be included as a basic spice. Perfect for a cozy meal with family or friends, this easy recipe is sure to become a favorite in your kitchen.",
    difficultyLevel: "easy",
    preparationTime: -1,
    cookingTime: -1,
    servings: 4,
    cuisine: "american",
    nutritionalInformation: {
      calories: 450,
      proteins: 25,
      saturated: 8,
      unsaturated: 12,
      cholesterol: 80,
      carbohydrates: 30,
      sugar: 8,
      vitamins: [[Object], [Object]],
      minerals: [[Object], [Object]],
    },
    notes:
      "This hearty beef and vegetable bake is a comforting and satisfying meal that is perfect for cozy evenings. The addition of lemon and cinnamon adds a delightful twist to the traditional flavors.",
    allergenInformation: [],
    substitutions: [],
    equipmentNeeded: [],
    mealType: "Dinner",
    tags: [],
    isFeatured: false,
    visibility: "private",
    createTime: 1713459376118,
    creator: "Default User",
    isPublic: false,
    status: "draft",
    userRatings: [],
    likes: 0,
    dislikes: 0,
    comments: [],
  };

  const mockData = {
    ingredients: [
      "potato",
      "carrot",
      "beef",
      "onions",
      "olive oil",
      "cheese",
      "broccoli",
      "cinnamon",
      "lemon",
    ],
    methods: ["Oven"],
    restrictions: [],
    type: [],
    minNumIng: 6,
    maxNumNewIng: 3,
    maxCookTime: 120,
    dificultyLevel: "easy",
    spice: "1",
    description:
      "Create a delicious and nutritious meal with this Hearty Beef and Vegetable Bake recipe. This dish combines tender beef with a variety of colorful vegetables including potatoes, carrots, broccoli, and onions. The addition of cheese adds a rich and creamy texture, while a hint of cinnamon and a squeeze of lemon lift the flavors to new heights. To add an extra layer of aroma and taste, basil can be included as a basic spice. Perfect for a cozy meal with family or friends, this easy recipe is sure to become a favorite in your kitchen.",
    recipeName: "Hearty Beef and Vegetable Bake",
    instructions: [
      { instruction: "Preheat the oven to 375°F (190°C)." },
      {
        instruction:
          "Peel and chop the potatoes, carrots, and onions into bite-sized pieces.",
      },
      {
        instruction:
          "Cut the beef into cubes and season with salt, pepper, and a pinch of cinnamon.",
      },
      {
        instruction: "Heat olive oil in a pan and brown the beef cubes.",
      },
      {
        instruction:
          "In a baking dish, layer the chopped vegetables and beef cubes.",
      },
      {
        instruction:
          "Top the mixture with grated cheese and drizzle with lemon juice.",
      },
      {
        instruction:
          "Cover the dish with foil and bake in the preheated oven for 45 minutes.",
      },
      {
        instruction:
          "Remove the foil and bake for an additional 15 minutes until the cheese is golden and bubbly.",
      },
      { instruction: "Serve hot and enjoy!" },
    ],
  };
  recipeGenerator.buildSecondaryInfo(mockData, mockBase);
});

router.get("/test004", async (req, res) => {
  const mockBase = {
    recipeName: "Hearty Beef and Vegetable Bake",
    ingredients: [
      "potato",
      "carrot",
      "beef",
      "onions",
      "olive oil",
      "cheese",
      "broccoli",
      "cinnamon",
      "lemon",
      "basil",
    ],
    instructions: [
      { instruction: "Preheat the oven to 375°F (190°C)." },
      {
        instruction:
          "Peel and chop the potatoes, carrots, and onions into bite-sized pieces.",
      },
      {
        instruction:
          "Cut the beef into cubes and season with salt, pepper, and a pinch of cinnamon.",
      },
      {
        instruction: "Heat olive oil in a pan and brown the beef cubes.",
      },
      {
        instruction:
          "In a baking dish, layer the chopped vegetables and beef cubes.",
      },
      {
        instruction:
          "Top the mixture with grated cheese and drizzle with lemon juice.",
      },
      {
        instruction:
          "Cover the dish with foil and bake in the preheated oven for 45 minutes.",
      },
      {
        instruction:
          "Remove the foil and bake for an additional 15 minutes until the cheese is golden and bubbly.",
      },
      { instruction: "Serve hot and enjoy!" },
    ],
    description:
      "Create a delicious and nutritious meal with this Hearty Beef and Vegetable Bake recipe. This dish combines tender beef with a variety of colorful vegetables including potatoes, carrots, broccoli, and onions. The addition of cheese adds a rich and creamy texture, while a hint of cinnamon and a squeeze of lemon lift the flavors to new heights. To add an extra layer of aroma and taste, basil can be included as a basic spice. Perfect for a cozy meal with family or friends, this easy recipe is sure to become a favorite in your kitchen.",
    difficultyLevel: "easy",
    preparationTime: 20,
    cookingTime: 60,
    servings: 4,
    cuisine: "american",
    nutritionalInformation: {
      calories: 450,
      proteins: 25,
      saturated: 8,
      unsaturated: 12,
      cholesterol: 80,
      carbohydrates: 30,
      sugar: 8,
      vitamins: [[Array], [Array]],
      minerals: [[Array], [Array]],
    },
    notes:
      "This hearty beef and vegetable bake is a comforting and satisfying meal that is perfect for cozy evenings. The addition of lemon and cinnamon adds a delightful twist to the traditional flavors.",
    allergenInformation: [],
    substitutions: [
      { name: "cheese", quantity: 100, unit: "g" },
      { name: "olive oil", quantity: 2, unit: "tbsp" },
    ],
    equipmentNeeded: [
      { name: "Oven" },
      { name: "Baking dish" },
      { name: "Pan" },
    ],
    mealType: "Dinner",
    tags: [],
    isFeatured: false,
    visibility: "private",
    createTime: 1713459376118,
    creator: "Default User",
    isPublic: false,
    status: "draft",
    userRatings: [],
    likes: 0,
    dislikes: 0,
    comments: [],
  };

  recipeGenerator.buildTags(mockBase);
});


router.get("/test005", async (req, res) => {
  const mockData = {
    ingredients: [
      "potato",
      "carrot",
      "beef",
      "onions",
      "olive oil",
      "cheese",
      "broccoli",
      "cinnamon",
      "lemon",
    ],
    methods: ["Oven"],
    restrictions: [],
    type: [],
    minNumIng: 6,
    maxNumNewIng: 3,
    maxCookTime: 120,
    dificultyLevel: "easy",
    spice: "1",
  };

  recipeGenerator.newRecipe(mockData);
});

module.exports = router;

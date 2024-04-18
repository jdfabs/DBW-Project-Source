"use strict";

module.exports = (req, res) => {
    const recipe = 
    {
        "recipeName": "Mediterranean Cod with Vegetable Medley",
        "creator": "Skipper",
        "creationDate" : "01-01-2024",
        "ingredients": [
          {"name": "Broccoli", "quantity": "300g"},
          {"name": "Potatoes", "quantity": "400g"},
          {"name": "Carrot", "quantity": "200g"},
          {"name": "Olive Oil", "quantity": "3 tbsp"},
          {"name": "Salt", "quantity": "to taste"},
          {"name": "Garlic", "quantity": "3 cloves"},
          {"name": "Cod Fish", "quantity": "500g"},
          {"name": "Tomatoes", "quantity": "2 large"},
          {"name": "Red Bell Pepper", "quantity": "1"},
          {"name": "Zucchini", "quantity": "1"},
          {"name": "Onion", "quantity": "1"},
          {"name": "Lemon", "quantity": "1"}
        ],
        "instructions": [
          "Preheat oven to 200°C.",
          "Chop potatoes, carrots, broccoli, tomatoes, bell pepper, zucchini, and onion.",
          "Crush garlic cloves and slice lemon.",
          "In a baking dish, arrange chopped vegetables evenly.",
          "Drizzle olive oil over the vegetables, season with salt, and toss to coat.",
          "Place cod fish fillets on top of the vegetables.",
          "Season fish with salt, crushed garlic, and a squeeze of lemon juice.",
          "Cover the dish with foil and bake for 25-30 minutes.",
          "Remove foil and bake for an additional 10-15 minutes until fish is cooked through and vegetables are tender.",
          "Serve hot, garnished with fresh herbs if desired."
        ],
        "description": "Indulge in a tantalizing Mediterranean experience with this Chef's special cod dish. Succulent cod fish perfectly complemented by a vibrant medley of roasted vegetables. It's a symphony of flavors bound to delight your palate.",
        "difficultyLevel": "Chef",
        "preparationTime": "20 minutes",
        "cookingTime": "35-45 minutes",
        "totalTime": "55-65 minutes",
        "servings": "4",
        "cuisine": "Mediterranean",
        "dietaryInformation": ["Healthy", "Gluten-free"],
        "nutritionalInformation": {
          "calories": "320",
          "proteins": "28g",
          "saturatedFats": "2g",
          "unsaturatedFats": "10g",
          "cholesterol": "60mg",
          "carbohydrates": "25g",
          "sugar": "6g",
          "vitamins": "A, C",
          "minerals": "Iron, Calcium"
        },
        "notes": "Ensure the fish is fresh for the best taste. You can customize the vegetable selection according to your preference.",
        "allergenInformation": ["None"],
        "substitutions": [
          {"name": "Salmon", "substituteFor": "Cod Fish"},
          {"name": "Green Beans", "substituteFor": "Broccoli"},
          {"name": "Sweet Potato", "substituteFor": "Potatoes"}
        ],
        "equipmentNeeded": ["Baking dish", "Aluminum foil", "Knife", "Chopping board", "Oven"],
        "mealType": ["Dinner"]
      }
      
      
      
    res.render("recipe", { title: "recipe", recipe });
};

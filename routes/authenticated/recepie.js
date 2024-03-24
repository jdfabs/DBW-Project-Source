"use strict";

module.exports = (req, res) => {
    const recepie = 
    {
        "recipeName": "Chef's Special Seafood Paella",
        "ingredients": [
          {"name": "Shrimp", "quantity": "500g"},
          {"name": "Olive oil", "quantity": "3 tablespoons"},
          {"name": "Laurel", "quantity": "2 leaves"},
          {"name": "Onion", "quantity": "1 large, chopped"},
          {"name": "Garlic", "quantity": "4 cloves, minced"},
          {"name": "Red pepper", "quantity": "1 large, diced"},
          {"name": "Tomato", "quantity": "2 medium, chopped"},
          {"name": "Tomato pulp", "quantity": "1 cup"},
          {"name": "Bacon", "quantity": "100g, diced"},
          {"name": "Sausage", "quantity": "200g, sliced"},
          {"name": "White wine", "quantity": "1/2 cup"},
          {"name": "Bell pepper", "quantity": "1 large, sliced"},
          {"name": "Peas", "quantity": "1 cup"},
          {"name": "Chicken broth", "quantity": "2 cups"},
          {"name": "Saffron threads", "quantity": "1 pinch"},
          {"name": "Lemon", "quantity": "1, sliced for garnish"}
        ],
        "instructions": [
          "In a large paella pan, heat olive oil over medium heat.",
          "Add bacon and sausage, cook until browned.",
          "Add onion, garlic, red pepper, and bell pepper. Sauté until vegetables are tender.",
          "Stir in tomato and tomato pulp. Cook until tomatoes start to break down.",
          "Pour in white wine, let it simmer for 2-3 minutes.",
          "Add rice, stirring to coat it with the mixture.",
          "Sprinkle saffron threads and pour in chicken broth. Bring to a simmer.",
          "Arrange shrimp and peas over the rice mixture.",
          "Place laurel leaves on top, cover, and let it cook for about 20-25 minutes or until rice is tender and liquid is absorbed.",
          "Once done, remove from heat and let it rest for 5 minutes.",
          "Garnish with lemon slices before serving."
        ],
        "description": "Indulge in the rich flavors of this Chef's Special Seafood Paella. This iconic Spanish dish combines succulent shrimp, savory sausage, and crispy bacon with the sweetness of tomatoes and bell peppers. Saffron-infused rice absorbs all the delicious flavors, creating a mouthwatering medley of tastes and textures. Perfect for a special occasion or a delightful family dinner, this paella is a true culinary masterpiece.",
        "difficultyLevel": "chef",
        "preparationTime": "30 minutes",
        "cookingTime": "45 minutes",
        "totalTime": "1 hour 15 minutes",
        "servings": "4",
        "cuisine": "Spanish",
        "dietaryInformation": [],
        "nutritionalInformation": {
          "calories": "480",
          "proteins": "24g",
          "saturatedFats": "6g",
          "unSaturatedFats": "8g",
          "cholesterol": "130mg",
          "carbohydrates": "40g",
          "sugar": "4g",
          "vitamins": "A, C",
          "minerals": "Iron, Calcium"
        },
        "notes": "For a vegetarian option, omit the bacon and sausage and add more vegetables like artichokes and mushrooms. Adjust seasoning according to taste preferences.",
        "allergenInformation": ["None"],
        "substitutions": [],
        "equipmentNeeded": ["Paella pan", "Lid or foil"],
        "mealType": ["Dinner"]
      }
      
      ;
      
    res.render("recepie", { title: "Recepie", recepie });
};

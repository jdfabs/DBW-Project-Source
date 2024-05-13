//For comments check mainPage.js - function is basically the same but with diferent html
"use strict";

let nextRecipe = 3;
let fetchingData = false;

document.addEventListener("scroll", async () => {
  console.log("scroll event trigger");
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    !fetchingData
  ) {
    console.log("fetching data");
    fetchingData = true;
    try {
      const response = await fetch("/personalGalery/" + nextRecipe, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const recipeContainer = document.getElementById("recipes");

      data.forEach((recipe) => {
        console.log(recipe.recipeName);

        let newRecipe = document.createElement("div");
        newRecipe.classList.add("col-xl-4");
        newRecipe.classList.add("col-lg-6");

        let ingredientHTML ="" ;

        recipe.ingredients.forEach(ingridient => {
          ingredientHTML += ingridient + ", ";

        });
        ingredientHTML = ingredientHTML.substring(0, ingredientHTML.length - 2);


        let tagsHTML="";

        recipe.tags.forEach(tag => {
          tagsHTML += tag + ", ";

        });
        tagsHTML = tagsHTML.substring(0, tagsHTML.length - 2);


        newRecipe.innerHTML = `<section class="recipeContainer">
            <img class="recipeImage d-none d-lg-block" src="/images/PlaceholderImage.png" alt="Alternate Text" />
            <div class="p-2">
              <div class="d-flex ">
                <img class="rating " src="/images/Rating.png" alt="rating" />
                <p class="d-none d-sm-block"> ${recipe.userRatings.length} -Ratings</p>
              </div>
              <div class="d-block d-sm-flex  align-items-end">
                <a href="/recipe/${recipe._id}">
                  <h3 class="text-center">${recipe.recipeName}</h3>
                </a>
              </div>
              <h5> ${recipe.creator}</h5>
              <p class="d-sm-none"></p>
              <div class="d-block  ">
                <h5> Description :</h5>
                <p class="d-none d-sm-block">  ${recipe.description} </p>
                <p class="d-sm-none">SHORT VERSION ${recipe.description}</p>
              </div>
              <div class="d-block ">
                <h5> Ingredients :</h5>
                <p>${ingredientHTML}
                </p>
              </div>
              <div class="d-none d-sm-block ">
                <h5> tags :</h5>
                <p>
                ${tagsHTML}
                </p>
               
                  <a href="/recipe/${recipe._id}" class="btn btn-primary">Ver Receita</a>
                  <a href="/recipe/${recipe._id}/editar-receita/" class="btn btn-secondary">Editar Receita</a>
                
              </div>
            </div>
          </section>`

          recipeContainer.append(newRecipe);
          nextRecipe++;

      });
      fetchingData = false;
    } catch (error) {
      console.log(error);
      console.error('Error fetching data:', error);
    }
  }
});

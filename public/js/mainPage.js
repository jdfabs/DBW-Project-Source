"use strict";
const filterWindow = document.getElementById("filterWindow");
const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

let nextRecipe = 3; //start at index 3
let filters = {
  //empty filter object
  searchBar: "",
  ingredients: [],
  methods: [],
};

//setup event listeners for remove buttons
Array.from(document.getElementsByClassName("removeBtn")).forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.parentElement.remove();
  });
});

//setup event listeners for add buttons
document.getElementById("filterButton").addEventListener("click", (event) => {
  console.log("filterButton clicked");
  event.preventDefault();
  if (filterWindow.classList.contains("d-none"))
    filterWindow.classList.remove("d-none");
  else filterWindow.classList.add("d-none");
});

const searchFuntion = async function (event) {
  //get recipes with X filters
  event.preventDefault();
  fetchingData = true; //already fetching data - so there aren't multiple reequst at the same time

  filters = {
    //fill in filters
    searchBar: document.getElementById("searchBox").value,
    ingredients: Array.from(document.getElementsByName("Ingredient")).map(
      (ingredient) => ingredient.value
    ),
    methods: Array.from(document.getElementsByName("cookingMethods")).map(
      (method) => method.value
    ),
  };

  const recipes = document.getElementsByClassName("recipeContainer");

  for (let i = recipes.length - 1; i >= 0; i--) {
    //remove all recipes rendered on screen
    recipes[i].remove();
  }
  nextRecipe = 0; //reset index
  await fetch("/mainPage/" + nextRecipe, {
    //get next recipe
    method: "POST",
    body: JSON.stringify(filters),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      generatedRecipe = data;

      let newRecipe = document.createElement("section"); //render new recipe return into window
      newRecipe.classList.add("recipeContainer");
      newRecipe.classList.add("d-flex");
      newRecipe.id = "recipeContainer";

      newRecipe.innerHTML = `<img class="recipeImage d-none d-lg-block" src="/images/PlaceholderImage.png" alt="Alternate Text" />
                        <div class="p-2">
                        <div class="d-flex justify-content-between">
                          <div class="d-block d-sm-flex  align-items-end">
                            <a href="/recipe/${generatedRecipe.id}"><h3>${
        generatedRecipe.recipeName
      }</h3></a>
                            <h5>${generatedRecipe.creator}</h5>
                          </div>
                          
                        </div>                                
                          <div class="d-flex ">
                            <img class="rating " src="/images/Rating.png" alt="rating" />
                            <p class="d-none d-sm-block"> - 500 ratings</p>
                          </div>
                          <p class="d-sm-none"></p>
                          <div class="d-block  ">
                            <h5> Description -</h5>
                            <p class="d-none d-sm-block">${
                              generatedRecipe.description
                            }</p>
                            <p class="d-sm-none">SHORT VERSION - ${generatedRecipe.description.substring(
                              0,
                              generatedRecipe.description.lastIndexOf(".", 200)
                            )}  </p>
                          </div>
                          <div class="d-block ">
                            <h5> Ingredients -</h5>
                            <p> ${generatedRecipe.ingredients.join(", ")}</p>
                          </div>
                          <div class="d-none d-sm-block ">
                            <h5> tags -</h5>
                            <p> ${generatedRecipe.tags.join(", ")}</p>
                          </div>
                        </div>`;

      document.getElementById("recipes").append(newRecipe); //add it to window
      nextRecipe++;
      fetchingData = false; //not fetching anything now
    });
};

document
  .getElementById("search-filter") //on filter button
  .addEventListener("click", searchFuntion);

document
  .getElementById("searchBox") //on search bar change
  .addEventListener("change", searchFuntion);

addIngredientButton.addEventListener("click", (event) => {
  //add new ingredient field
  event.preventDefault();
  const newIngredient = document.createElement("div");
  newIngredient.classList.add("row");
  newIngredient.innerHTML = `<input class="col-10" name="Ingredient" type="text" placeholder="Ingredient" />
  <button class="removeBtn col-2">-</button>`;
  ingredientList.append(newIngredient);

  addEventListener(newIngredient.querySelector(".removeBtn"));
});

const addEventListener = function addEventListenerToButtons(button) {
  //add new event listener to the buttons
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.parentElement.remove();
  });
};

document.addEventListener("scroll", async () => {
  if (
    //if bottom of screen is near
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    !fetchingData
  ) {
    console.log("fetching data");
    fetchingData = true; //Similar to function above ^^^
    try {
      const response = await fetch("/mainPage/" + nextRecipe, {
        method: "POST",
        body: JSON.stringify(filters),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      generatedRecipe = data;

      let newRecipe = document.createElement("section");
      newRecipe.classList.add("recipeContainer");
      newRecipe.classList.add("d-flex");
      newRecipe.id = "recipeContainer";

      newRecipe.innerHTML = `<img class="recipeImage d-none d-lg-block" src="/images/PlaceholderImage.png" alt="Alternate Text" />
                            <div class="p-2">
                            <div class="d-flex justify-content-between">
                              <div class="d-block d-sm-flex  align-items-end">
                              <a href="/recipe/${generatedRecipe._id}"><h3>${
        generatedRecipe.recipeName
      }</h3></a>
                                </div>
                              </div>                                
                              
                              <p class="d-sm-none"></p>
                              <div class="d-block  ">
                                <h5> Description -</h5>
                                <p class="d-none d-sm-block">${
                                  generatedRecipe.description
                                }</p>
                                <p class="d-sm-none">SHORT VERSION - ${generatedRecipe.description.substring(
                                  0,
                                  generatedRecipe.description.lastIndexOf(
                                    ".",
                                    200
                                  )
                                )}  </p>
                              </div>
                              <div class="d-block ">
                                <h5> Ingredients -</h5>
                                <p> ${generatedRecipe.ingredients.join(
                                  ", "
                                )}</p>
                              </div>
                              <div class="d-none d-sm-block ">
                                <h5> tags -</h5>
                                <p> ${generatedRecipe.tags.join(", ")}</p>
                              </div>
                            </div>`;

      document.getElementById("recipes").append(newRecipe);
      nextRecipe++;
      fetchingData = false;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});

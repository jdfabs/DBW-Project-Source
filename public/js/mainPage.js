const filterWindow = document.getElementById("filterWindow");
const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

let nextRecipe = 3;

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

document.getElementById("search-filter").addEventListener("click", (event) => {
  console.log("search-filter clicked");
  event.preventDefault();
});

//setup event listeners for add buttons
addMethodButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newMethod = document.createElement("div");
  newMethod.classList.add("row");
  newMethod.innerHTML = `<select itemid="methods" class="col-10" name="cookingMethods" id="cookingMethods">
  <option value="Method 1">Method 1</option>
  <option value="Method 2">Method 2</option>
  <option value="Method 3">Method 3</option>
  <option value="Method 4">Method 4</option>

</select>
<button class="removeBtn">-</button>`;
  methodList.append(newMethod);
  addEventListener(newMethod.querySelector(".removeBtn"));
});

addIngredientButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newIngredient = document.createElement("div");
  newIngredient.classList.add("row");
  newIngredient.innerHTML = `<input class="col-10" name="Ingredient" type="text" placeholder="Ingredient" />
  <button class="removeBtn col-2">-</button>`;
  ingredientList.append(newIngredient);

  addEventListener(newIngredient.querySelector(".removeBtn"));
});

const addEventListener = function addEventListenerToButtons(button) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.parentElement.remove();
  });
};

let fetchingData = false;

document.addEventListener("scroll", async () => {
  
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight && !fetchingData) {
    console.log("fetching data");
    fetchingData = true;
    await fetch("/mainPage/" + nextRecipe, {
      method: "GET",
      
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        generatedRecipe = data;

    

      let newRecipe = document.createElement("section");
      newRecipe.classList.add("recipeContainer");
      newRecipe.classList.add("d-flex");
      newRecipe.id = "recipeContainer";

      newRecipe.innerHTML = `<img class="recipeImage d-none d-lg-block" src="/images/PlaceholderImage.png" alt="Alternate Text" />
                              <div class="p-2">
                              <div class="d-flex justify-content-between">
                                <div class="d-block d-sm-flex  align-items-end">
                                  <h3>${generatedRecipe.recipeName}</h3>
                                  <h5> - creator name</h5>
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
      });
  }
});

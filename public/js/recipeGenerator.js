const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

const form = document.getElementById("recipeForm");

Array.from(document.getElementsByClassName("removeBtn")).forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.parentElement.remove();
  });
});

addMethodButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newMethod = document.createElement("div");
  newMethod.classList.add("row");
  newMethod.innerHTML = `<div class="d-flex "><select itemid="methods" class="input-sm col-10" name="cookingMethods" id="cookingMethods">
    <option value="Boiling">Boiling</option>
    <option value="Steaming">Steaming</option>
    <option value="Grilling">Grilling</option>
    <option value="Roasting">Roasting</option>
    <option value="Baking">Baking</option>
    <option value="Frying">Frying</option>
    <option value="Sautéing">Sautéing</option>
    <option value="Braising">Braising</option>
    <option value="Poaching">Poaching</option>
    <option value="Simmering">Simmering</option>
    <option value="Blanching">Blanching</option>
    <option value="Slow cooking">Slow cooking</option>
  
  </select>
  <button class="removeBtn">-</button></div>`;
  methodList.append(newMethod);
  addEventListener(newMethod.querySelector(".removeBtn"));
});

addIngredientButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newIngredient = document.createElement("div");
  newIngredient.classList.add("row");
  newIngredient.innerHTML =
    `<div class="d-flex">  <input class="col-10 input-sm" name="Ingredient` +
    Math.random(0, 1000) +
    `" type="text" placeholder="Ingredient" />
    <button class="removeBtn col-2">-</button> </div>`;
  ingredientList.append(newIngredient);

  addEventListener(newIngredient.querySelector(".removeBtn"));
});

const addEventListener = function addEventListenerToButtons(button) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.parentElement.remove();
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Serialize the form data
  const formData = new FormData(form);
  // Convert formData to a plain object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  const recipeData = formDataObject;

  let ingredients = [];
  let cookingMethods = [];
  for (const key of formData.keys()) {
    if (key.startsWith("Ingredient")) {
      ingredients.push(formData.get(key));

      delete formDataObject[key];
    } else if (key === "cookingMethod") {
      formData;
      cookingMethods.push(formData.get(key));
      delete formDataObject[key];
    }
  }

  recipeData.ingredients = ingredients;
  recipeData.cookingMethods = cookingMethods;

  if (!recipeData.minNumIng) {
    recipeData.minNumIng = Math.ceil((recipeData.ingredients.length * 3) / 4);
  }
  if (!recipeData.maxNumNewIng) {
    recipeData.maxNumNewIng = 2;
  }
  if (!recipeData.numReciToGen) {
    recipeData.numReciToGen = 1;
  }
  if (!recipeData.maxTime) {
    recipeData.maxTime = 90;
  }

  // Convert JSON object to string
  const jsonString = JSON.stringify(recipeData);

  // Send JSON data to server
  fetch("/recipeGenerator", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);


      for (let i = 0; i < Object.keys(data).length; i++) {
        console.log(i);
        console.log(data)
        let newRecipe = document.createElement("section");
        newRecipe.classList.add("recipeContainer");
        newRecipe.classList.add("d-flex");

        newRecipe.innerHTML = `<img class="recipeImage d-none d-lg-block" src="/images/PlaceholderImage.png" alt="Alternate Text" />
                              <div class="p-2">
                                <div class="d-block d-sm-flex  align-items-end">
                                  <h3>${data[i].recipeName}</h3>
                                  <h5> - creator name</h5>
                                </div>
                                <div class="d-flex ">
                                  <img class="rating " src="/images/Rating.png" alt="rating" />
                                  <p class="d-none d-sm-block"> - 500 ratings</p>
                                </div>
                                <p class="d-sm-none"></p>
                                <div class="d-block  ">
                                  <h5> Description -</h5>
                                  <p class="d-none d-sm-block">${
                                    data[i].description
                                  }</p>
                                  <p class="d-sm-none"> SHORT VERSION Assurance advantage belonging happiness departure so of. Now improving and one sincerity intention allowance commanded not.</p>
                                </div>
                                <div class="d-block ">
                                  <h5> Ingredients -</h5>
                                  <p> ${data[i].ingredients.join(", ")}</p>
                                </div>
                                <div class="d-none d-sm-block ">
                                  <h5> tags -</h5>
                                  <p> ${data[i].tags.join(", ")}</p>
                                </div>
                              </div>`;
        document.getElementById("Recipes").append(newRecipe);
      }
    });
});

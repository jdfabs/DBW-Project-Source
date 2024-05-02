const filterWindow = document.getElementById("filterWindow");
const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

let nextRecipe = 3;
let filters = {
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
  event.preventDefault();
  console.log("search-filter");
  fetchingData = true;

  filters = {
    searchBar: document.getElementById("searchBox").value,
    ingredients: Array.from(document.getElementsByName("Ingredient")).map(
      (ingredient) => ingredient.value
    ),
    methods: Array.from(document.getElementsByName("cookingMethods")).map(
      (method) => method.value
    ),
  };
  console.log(filters);

  const recipes = document.getElementsByClassName("recipeContainer");

  for (let i = recipes.length - 1; i >= 0; i--) {
    recipes[i].remove();
  }
  nextRecipe = 0;
  await fetch("/mainPage/" + nextRecipe, {
    method: "POST",
    body: JSON.stringify(filters),
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

      document.getElementById("recipes").append(newRecipe);
      nextRecipe++;
      fetchingData = false;
    });
};

document
  .getElementById("search-filter")
  .addEventListener("click", searchFuntion);

  document
  .getElementById("searchBox")
  .addEventListener("change", searchFuntion);

//setup event listeners for add buttons
addMethodButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newMethod = document.createElement("div");
  newMethod.classList.add("row");
  newMethod.innerHTML = `<select itemid="methods" class="col-10" name="cookingMethods" id="cookingMethods">
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

/*i*/
let fetchingData = false;

document.addEventListener("scroll", async () => {
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight &&
    !fetchingData
  ) {
    console.log("fetching data");
    fetchingData = true;
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
      //console.error('Error fetching data:', error);
      // Handle error as needed, e.g., show an error message to the user
    }
  }
});

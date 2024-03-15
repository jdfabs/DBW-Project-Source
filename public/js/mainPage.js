const filterButton = document.getElementById("filterButton");
const filterWindow = document.getElementById("filterWindow");
const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

filterButton.addEventListener("click", (event) => {
  console.log("filterButton clicked");
  event.preventDefault();
  if (filterWindow.classList.contains("d-none"))
    filterWindow.classList.remove("d-none");
  else filterWindow.classList.add("d-none");
});

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

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

});

addIngredientButton.addEventListener("click", (event) => {
  event.preventDefault();
  const newIngredient = document.createElement("div");
  newIngredient.classList.add("row");
  newIngredient.innerHTML = `<input class="col-10" name="Ingredient" type="text" placeholder="Ingredient" />
  <button class="removeBtn col-2">-</button>`;
  ingredientList.append(newIngredient);
});
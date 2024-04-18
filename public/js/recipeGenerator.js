const methodList = document.getElementById("methodList");
const ingredientList = document.getElementById("ingredientList");

const addMethodButton = document.getElementById("moreMethod");
const addIngredientButton = document.getElementById("moreIng");

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
    <option value="Method 1">Method 1</option>
    <option value="Method 2">Method 2</option>
    <option value="Method 3">Method 3</option>
    <option value="Method 4">Method 4</option>
  
  </select>
  <button class="removeBtn">-</button></div>`;
      methodList.append(newMethod);
      addEventListener(newMethod.querySelector(".removeBtn"));
  
  });
  
  addIngredientButton.addEventListener("click", (event) => {
    event.preventDefault();
    const newIngredient = document.createElement("div");
    newIngredient.classList.add("row");
    newIngredient.innerHTML = `<div class="d-flex">  <input class="col-10 input-sm" name="Ingredient" type="text" placeholder="Ingredient" />
    <button class="removeBtn col-2">-</button> </div>`;
    ingredientList.append(newIngredient);
  
    addEventListener(newIngredient.querySelector(".removeBtn"));
  
  });
  
  const addEventListener = function addEventListenerToButtons(button) {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.parentElement.remove();
    });
  }
  

  document.getElementById("generate-btn").addEventListener("click", (event) => {
    console.log("search-filter clicked");
    event.preventDefault();
    
  });
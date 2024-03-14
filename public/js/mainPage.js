const filterButton = document.getElementById("filterButton");
const filterWindow = document.getElementById("filterWindow");

filterButton.addEventListener("click", (event) => {
    console.log("filterButton clicked");
    event.preventDefault();
    if(filterWindow.classList.contains("d-none")) filterWindow.classList.remove("d-none");
    else filterWindow.classList.add("d-none");
  });

  const addMethodButton = document.getElementById("moreMethod");   
  const addIngredientButton = document.getElementById("moreIng");



    addMethodButton.addEventListener("click", (event) => {
        console.log("addMethodButton clicked");
      event.preventDefault();
      const methodList = document.getElementById("methodList");
      const newMethod = document.createElement("option");
      newMethod.innerHTML = `<select itemid="methodList" class="input-sm" name="cookingMethods" id="cookingMethods">
      <option value="Method 1">Method 1</option>
      <option value="Method 2">Method 2</option>
      <option value="Method 3">Method 3</option>
      <option value="Method 4">Method 4</option>

    </select>`;
      methodList.appendChild(newMethod);
    });
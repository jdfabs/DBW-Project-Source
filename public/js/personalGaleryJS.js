
let fetchingData = false;

document.addEventListener("scroll", async () => {
    console.log("scrooljgv");
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

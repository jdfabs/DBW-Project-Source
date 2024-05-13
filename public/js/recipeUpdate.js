"use strict";

document.getElementById("updateForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("recipeName").value;
  const description = document.getElementById("description").value;

  const receitaUpdated = { recipeName: title, description: description };

  const id = window.location.pathname.split("/")[2];
  fetch("/recipe/update/" + id, {
    method: "PATCH",
    body: JSON.stringify(receitaUpdated),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao atualizar a receita: " + response.statusText);
      }
      window.location.href = "/recipe/" + id;
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
});

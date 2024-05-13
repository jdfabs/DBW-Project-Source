"use strict";

const recipeModel = require("../../model/recipeModel").RecipeModel;

const personalGaleryGet = async function (req, res) {
  //render and send page
  console.log("Personal Galery Controller - personalGaleryGet");
  const recipes = await getTopThreeRecipes(req, res);

  res.render("personalGalery", {
    title: "Personal Galery",
    recipes,
    isAuthenticated: req.body.isAuthenticated,
  });
};

const getTopThreeRecipes = async function (req) {
  console.log("Personal Galery Controller - getTopThreeRecipes");
  const recipes = await recipeModel //get 3 first recipes that the client is owner of
    .find({ creator: req.user.username })
    .limit(3);
  return recipes;
};

const personalGaleryIDGet = async function (req, res) {
  //get 3 first recipes that the client is owner of + an off-set
  console.log("Personal Galery Controller - personalGaleryIDGet");
  const recipes = await recipeModel
    .find({ creator: req.user.username })
    .skip(index) //off-set
    .limit(3);
  res.json(recipes);
};

const editarReceita = async (req, res) => {
  //recipe edit page request
  console.log("Personal Galery Controller - editarReceita");
  try {
    const { id } = req.params; // ID recipe to edit
    const queryResult = await recipeModel.findById(id); //get recipe from DB

    if (queryResult) {
      //found
      res.render("editarReceita", {
        //render and load editarReceita
        receita: queryResult,
        title: "Editar Receita",
        isAuthenticated: req.isAuthenticated(),
      });
    } else {
      //not Found
      console.log("Receita não encontrada - editarReceita");
      res.status(404).send("Receita não encontrada"); //load 404 page -- this should never hit, because you're requesting a recipe that was just given.
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao editar receita");
  }
};

module.exports = {
  editarReceita,
  personalGaleryGet,
  personalGaleryIDGet,
};

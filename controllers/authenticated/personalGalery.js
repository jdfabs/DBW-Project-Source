"use strict";

const recipeModel = require("../../model/recipeModel").RecipeModel;
const dataValidation = require("../../middlewares/dbValidation");
const debug = require("../../debugTools");

const getTopThreeRecipes = async function (req, res ) {
    debug.log(1, "Personal Galery Controller - getTopThreeRecipes");
    // Alterar para _id & Ver o caso de devolver as mesmas 3 receitas.
    const recipes = await recipeModel.find({creator:req.user.username}).limit(3);
    console.log(recipes);
    console.log(req.user.username);
    return recipes;
};


const getRecipeByIndex = async function (filters, index, req) {
  debug.log(1, "Personal Galery Controller - getRecipeByIndex");

  const filterQuery = {};

  if (req.user && req.user.username && filters.searchBar) {
      filterQuery.$text = { $search: filters.searchBar };
  }

  if (req.user && req.user.username && filters.ingredients.length > 0) {
      const ingredientRegexArray = filters.ingredients.map(ingredient => new RegExp(ingredient, 'i'));
      filterQuery.ingredients = { $in: ingredientRegexArray };
  }

  if (req.user && req.user.username && filters.methods.length > 0) {
      filterQuery.methods = { $all: filters.methods };
  }

  return await recipeModel.find(filterQuery);
};



const personalGaleryGet = async function (req, res) {
  const recipes= await getTopThreeRecipes (req, res );
  console.log(recipes);
    res.render("personalGalery", { title: "Personal Galery", recipes, isAuthenticated: req.body.isAuthenticated });


};

const personalGaleryIDGet = async function (req, res) {
    const recipe = await getRecipeByIndex(
        req.body,
        req.params.index
    );
    res.json(recipe);
};


const editarReceita = async (req, res) => {
    try {
        // ID receita 
        const { id } = req.params;
        // busco modelo de receita para obter os detalhes da receita com base no ID
        const queryResult = await recipeModel.findById(id);        
        if (queryResult) {
            // Se for encontrada
            res.render("editarReceita", { receita: queryResult, title: "Editar Receita", isAuthenticated: req.isAuthenticated() });
        } else {
            // Se não for encontrada mostra erro
            console.log("Receita não encontrada - editarReceita");
            res.status(404).send("Receita não encontrada");
        }
    } catch (error) {
        // isto aqui vai para uma pagina de erro
        console.error(error);
        res.status(500).send("Erro ao editar receita");
    }
};



const atlreceita = async (req, res) => {
    console.log("TESTE!!!!")
    try {
        //  ID para ver se atualizou
        const { id } = req.params;
        console.log(req.body);
        //  findByIdAndUpdate para atualizar a receita daquele ID
        const queryResult = await recipeModel.findByIdAndUpdate(id, req.body, { new: true });

        console.log(queryResult);
        if (queryResult) {
            

            res.redirect(`/receita/${id}`);
        } else {
            // Se a receita não for encontrada da erro
            console.log("Receita não encontrada - atualizarReceita");
            res.status(404).send("Receita não encontrada");
        }
    } catch (error) {
        //redirecionar o  usuário para uma página de erro
        console.error(error);
        res.status(500).send("Erro ao atualizar receita");
    }
};


module.exports = { personalGaleryGet, getTopThreeRecipes, getRecipeByIndex, personalGaleryIDGet, editarReceita, atlreceita };



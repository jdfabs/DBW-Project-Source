"use strict";

// Defina a função do controlador
const renderRecepieGenerator = (req, res) => {
    // Array de receitas
    const recepies = [
        {
          title: "Recepie 1",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "Recepie 2",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "Recepie 3",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "Recepie 4",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
    ];

    // Renderize a página do gerador de receitas
    res.render("recepieGenerator", { title: "Recepie Generator", recepies });
};

// Exporte a função do controlador
module.exports = renderRecepieGenerator;


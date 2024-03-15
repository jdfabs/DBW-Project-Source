"use strict";

module.exports = (req, res) => {
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
    res.render("recepieGenerator", { title: "Recepie Generator", recepies });
};

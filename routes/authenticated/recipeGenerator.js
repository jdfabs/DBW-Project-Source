"use strict";

module.exports = (req, res) => {
    const recipes = [
        {
          title: "recipe 1",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "recipe 2",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "recipe 3",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
        {
          title: "recipe 4",
          description: "Lorem ipsum dolor sit amet consectetur",
        },
      ];
    res.render("recipeGenerator", { title: "recipe Generator", recipes });
};

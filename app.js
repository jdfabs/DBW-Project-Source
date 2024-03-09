const express = require("express");
const morgan = require("morgan");
const  OpenAIApi  = require('openai');
const app = express(); //Instance of the app


const openai = new OpenAIApi({
  api_key: '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'
});



//register view engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3001);

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

// middleware & static files




app.get("/getResponse", async (req, res) =>{

const response = await openai.chat.completions.create({
  model:"gpt-3.5-turbo",
  messages:[{"role":"user","content":"in any recepie you may freely include any basic spice./n Be extremely shot and precise on each section of the answer, respond only the the following template, without any excuses, '--' means a comment for you:/n/n Name: [RECEPIE NAME]/n/n Description Short: -- maximum 25 words/n/n Ingredients: [INGREDIENT 1], [INGREDIENT  2], .../n Preparation time: [TIME]/n Cooking time: [TIME]/n Difficulty: [DIFFICULTY] -- out of 10/n Portions: [NUMBER + UNIT]/n/n PREPARATION: -- create these steps for begginners, minimum 20 steps/n 1 - [STEP 1] /n 2 - [STEP 2] /n ..."},
{"role":"user","content":"generate me a recepie using these ingredients:/n colored bell peppers, chicken, cream cheese, dry ranch dressing,  cheddar cheese, bacon /n You may remove up to two of the previous ingredients then add two more new ingredients./n Using an oven, maximum 1h30m, easy dificulty"}],
  max_tokens:400
})  
console.log(response.choices[0]);

})



/* 
app.use((req, res, next) =>{
    console.log("new request made");
    console.log("host: ", req.hostname);
    console.log("path: ",req.path);
    console.log("method: ", req.method);
    next();
});

app.use((req, res, next) =>{
    console.log("in the next middleware");
    next();
});*/

//#region
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contactUs", (req, res) => {
  res.render("contactUs", { title: "Contact Us" });
});
//Redirect example
app.get("/about-us", (req, res) => {
  res.status(301).redirect("about");
});

app.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQ" });
});

app.get("/sitemap", (req, res) => {
  res.render("siteMap", { title: "Site Map" });
});

app.get("/mainPage", (req, res) => {
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
  res.status(404).render("mainPage", { title: "Main Page", recepies });
});

app.get("/metrics", (req, res) => {
  res.render("metrics", { title: "Metrics" });
});

app.get("/personalGalery", (req, res) => {
  res.render("personalGalery", { title: "Personal Galery" });
});
app.get("/recepie", (req, res) => {
  res.render("recepie", { title: "Recepie" });
});
app.get("/recepieGenerator", (req, res) => {
  const recepies = [
 
  ];
  res.render("recepieGenerator", { title: "Recepie Generator", recepies });
});
app.get("/settings", (req, res) => {
  res.render("settings", { title: "Settings" });
});

//#endregion

//If unknown route
app.use((req, res) => {
  res.render("404", { title: "404" });
});

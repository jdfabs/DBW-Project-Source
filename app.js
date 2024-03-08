const express = require("express");
const morgan = require("morgan");

const app = express(); //Instance of the app

//register view engine
app.set("view engine", "ejs");

//listen for requests
app.listen(3000);

// middleware & static files

app.use(express.static("public"));

app.use(morgan("dev"));

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
    res.render("index", {title: "Home"});
});

app.get("/about", (req, res) => {
    res.render("about" , {title: "About"});
});

app.get("/contactUs", (req, res) => {
    res.render("contactUs" , {title: "Contact Us"});
});
//Redirect example
app.get("/about-us", (req, res) => {
    res.status(301).redirect("about");
});

app.get("/faq", (req, res) => {
    res.render("faq", {title: "FAQ"});
});

app.get("/sitemap", (req, res) => {
    res.render("siteMap", {title: "Site Map"});
});

app.get("/mainPage", (req, res) => {
    const recepies =  [
        {title: "Recepie 1", description: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Recepie 2", description: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Recepie 3", description: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Recepie 4", description: "Lorem ipsum dolor sit amet consectetur"}
    ]
    res.status(404).render("mainPage", {title: "Main Page", recepies});
});

app.get("/metrics", (req, res) => {
    res.render("metrics", {title: "Metrics"});
});

app.get("/personalGalery", (req, res) => {
    res.render("personalGalery", {title: "Personal Galery"});
});
app.get("/recepie", (req, res) => {
    res.render("recepie", {title: "Recepie"});
});
app.get("/recepieGenerator", (req, res) => {
    res.render("recepieGenerator", {title: "Recepie Generator"});
});
app.get("/settings", (req, res) => {
    res.render("settings", {title: "Settings"});
});

//#endregion

//If unknown route
app.use((req, res) => {
    res.render("404", {title: "404"});
});

const express = require('express');
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync("server.log", log + "\n");
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear()


});

app.get('/', (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Homepage",
    welcomeMessage: "Welcome to my page"
  });
});

app.get("/bad", (req,res) => {
  res.send({
    errorMessage: "Bad Request"
    
  });

});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Us"
  });

});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects",
    welcomeMessage: "Feel free to look at my portfolio"
  });

});

app.listen(port, ()=> {
  console.log(`Server is listining on port ${port}`)
});
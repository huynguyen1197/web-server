const express = require("express"); // return a function
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//get the port number from heroku (or local)
const port = process.env.PORT || 3000


// Define paths for Express configuration
const publicPath = path.join(__dirname, "../public"); // load static asssets such as html css js
const viewsPath = path.join(__dirname, "../templates/views"); // default is views, changed to templates
const partialsPath = path.join(__dirname, "../templates/partials"); // path to partials

// set up handlebars engine and views, partials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicPath)); // path.join

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Huy Nguyen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Huy Nguyen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    help_mes: "Help page",
    name: "Huy Nguyen",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error, //shorthand
        });
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error, //shorthand
          });
        }
        res.send({
          forecast: forecastData,
          location, //shorthand
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  // search term field is required
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Huy Nguyen",
    errorMes: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Huy Nguyen",
    errorMes: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

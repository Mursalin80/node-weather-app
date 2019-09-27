const expres = require("express");
const path = require("path");
const { geoRequest } = require("./util/geocode");
const { foreCast } = require("./util/forecast");
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const app = expres();

// paths for public and view template directory
const publicDir = path.join(__dirname, "public");
const viewDir = path.join(__dirname, "views", "main");
const partialsPath = path.join(__dirname, "views", "partials");

// set views
app.set("views", viewDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//set statics folder
app.use(expres.static(publicDir));

app.get("/", (req, res) => {
  res.render("index", {
    user: "Mursaleen",
    title: "Home Page",
    name: "M Mursaleen"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "M Mursaleen"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    name: "M Mursaleen",
    title: "help"
  });
});

// weather
app.get("/weather", (req, res) => {
  const address = req.query.address ? req.query.address : "islamabad";
  geoRequest(address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }
    foreCast(latitude, longitude, (error, result) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        Address: address,
        Location: location,
        Currently: result.currently
        // daily: result.daily
      });
    });
  });
});

// help 404
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "No help found !",
    name: "M Mursaleen"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "No Page found !",
    name: "M Mursaleen"
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

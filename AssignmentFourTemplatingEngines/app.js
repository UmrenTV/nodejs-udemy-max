const express = require("express");
const app = express();
const path = require("path");

const routes = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes.router);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000);

const path = require("path");

const rootDir = require("./utils/path");

const express = require("express");
const app = express();

app.set("view engine", "ejs"); // set templating engine for dynamic content (pug, hbs, ejs)
app.set("views", "views"); // set where the dynamic html files will be stored

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser"); // This is added so we can render the req.body as {title: req.body.title} as shown in admin.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // this line exposes the public content to the public

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((_, res) => {
  //res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);

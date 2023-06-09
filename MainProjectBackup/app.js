const path = require("path");

const rootDir = require("./utils/path");
const errorController = require("./controllers/error");

const express = require("express");
const app = express();

app.set("view engine", "ejs"); // set templating engine for dynamic content (pug, hbs, ejs)
app.set("views", "views"); // set where the dynamic html files will be stored

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser"); // This is added so we can render the req.body as {title: req.body.title} as shown in admin.js
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // this line exposes the public content to the public

app.use("/admin", adminRoutes.router); // the /admin is the prefix for the admin routes so you don't have to write /admin/products, /admin/whatever like in the admin.js file in the routes folder
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

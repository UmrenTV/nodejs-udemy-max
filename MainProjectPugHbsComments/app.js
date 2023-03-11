const path = require("path");

const rootDir = require("./utils/path");

const express = require("express");
const app = express();
const expressHbs = require("express-handlebars");

app.engine(
  "hbs", // This is ONLY for the hbs files / views. it doesn't affect the layout files. by default layout files are .handlebars
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs", // this is extension name ONLY for the layouts files and NOT for the other hbs files.
  })
  // The extra info is where the layouts are stored, and default layout.
  // if you want to avoid using default layout you can pass layout: false in the app.render function whenever you set which .hbs file will render at what route.
); // hbs is how you naming the engine for handlebars. It is important because the file extensions need to be whatever u write here. hbs is example, you can use whatever, this is just shorter.
app.set("view engine", "hbs"); // set templating engine for dynamic content (pug, hbs)
app.set("views", "views"); // set where the dynamic html files will be stored

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // this line exposes the public content to the public, and it allows us to access the files in the html so we can save other things like images, assets, css, etc and use them in our code.

app.use("/admin", adminData.router);
app.use(shopRoutes);

// Note: if you change the templating engine, it doesn't change how you pass data to the html documents so res.render('file-name', {data1: value1, key2: value2}) is the same for pug, as well as for hbs, etc.

app.use((_, res) => {
  //res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(3000);

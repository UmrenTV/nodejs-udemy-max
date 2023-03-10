const path = require("path");

const rootDir = require("./utils/path");

const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // this line exposes the public content to the public, and it allows us to access the files in the html so we can save other things like images, assets, css, etc and use them in our code.

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((_, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);

const express = require("express");
const app = express();
const routesConfig = require("./routes/routes");
const path = require("path");

const rootDir = require("./utils/path");

app.use(routesConfig);
app.use(express.static(path.join(rootDir, "public")));
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);

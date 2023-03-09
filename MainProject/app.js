const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser"); // third-party package

app.use(bodyParser.urlencoded({ extended: false })); // to use the body-parser we have to include it as middleware before we want to use it. Good idea is to add it first. What it does is basically parses the body, and then calling next(), so it doesn't affect our request. extended we pass as false, if we don't want to parse other type of body types.

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);

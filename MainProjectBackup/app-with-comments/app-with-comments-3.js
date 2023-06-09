const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const bodyParser = require("body-parser"); // third-party package

app.use(bodyParser.urlencoded({ extended: false })); // to use the body-parser we have to include it as middleware before we want to use it. Good idea is to add it first. What it does is basically parses the body, and then calling next(), so it doesn't affect our request. extended we pass as false, if we don't want to parse other type of body types.

app.use("/admin", adminRoutes); // this is a filter that is explained in admin-with-comments.js
app.use(shopRoutes);

// if none of the above middlewares catch a route that is not covered, the request ends up not handled. Here is how we can handle 404 and also change the status to 404.

app.use((_, res) => {
  // you can ommit argument with _ and also you can omit next, if you don't plan on using it (which we don't here)
  res.status(404).send("<h1>Page Not Found</h1>");
}); // We can chain as many methods as we want on res object, as long as .send is the last one. You can't use anything after .send, so make sure you chain them properly.

app.listen(3000);

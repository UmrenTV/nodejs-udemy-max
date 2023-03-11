const express = require("express");

const router = express.Router();

router.get("/admin/add-product", (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add User</button></form>'
  );
});

router.post("/admin/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
}); // difference between .use and .post is that .use executes for ANY request, this only gets executed for POST requests
// another difference is that .get and .post use exact matching on the path argument. so if '/' is done with .get, it will only trigger the middleware if the path is EXACTLY '/', and not partial match as before

// another thing is we can use same paths for the middlewares, as long as methods are different (.get / .post) because of the exact matching on the filter

// lastly instead of using /admin/add-product and /admin/whatever, we can remove /admin completely and use it as filter in the app.js file, where we define the admin routes. That way we don't duplicate the word, and also express handles all that in the background anyway.

module.exports = router;

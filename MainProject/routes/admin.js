const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add User</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
}); // difference between .use and .post is that .use executes for ANY request, this only gets executed for POST requests

module.exports = router;

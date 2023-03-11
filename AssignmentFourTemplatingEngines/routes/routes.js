const express = require("express");

const router = express.Router();

const usernames = [];

router.post("/users", (req, res) => {
  console.log(req.body.username);
  usernames.push({ user: req.body.username });
  // console.log(usernames[0].user);
  res.redirect("/users");
});

router.get("/users", (req, res) => {
  res.render("users", {
    pageTitle: "Users",
    usernames: usernames,
    path: "/users",
  });
  console.log(usernames);
});

router.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home", path: "/" });
});

module.exports.router = router;

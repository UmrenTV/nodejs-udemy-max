const path = require("path");
const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();
const products = adminData.products;

router.get("/", (req, res) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
});

module.exports = router;

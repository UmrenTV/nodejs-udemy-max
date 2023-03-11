const path = require("path");
const express = require("express");

const rootDir = require("../utils/path");
const adminData = require("./admin");

const router = express.Router();
const products = adminData.products;

router.get("/", (req, res) => {
  // __dirname is global variable that holds the absolute path on our PC to where the project is
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // we are using path.join here so this constructs the path in correct forrmat for both Windows and Linux. They have different rules for building paths
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    formsCSS: true,
    productCSS: true,
    activeShop: true,
    // layout: false, you can set this key in render function if you want to use different layout and not the default one.
  });
  // since we've specified in app.js to use pug as templating engine, we get this special method called .render for app that takes that in consideration and we've also configured where our dynamic views are, so we don't even have to build the path to it.
  // We just use it as above and no need for extension since we've said pug is our templating engine, so just the file.
  // The second argument is the data that we want to send to that file, like props. It has to be wrapped in object braces as above. We can't pass just "products". In the same object we can pass as much data as we want, as shown above.

  console.log(adminData.products);
});

module.exports = router;

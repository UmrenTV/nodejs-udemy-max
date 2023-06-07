const Product = require("../models/product"); // we use capital for import on class because it's convention.

exports.getProducts = (req, res) => {
  // because fetchAll is defined to receive a callback function as argument, we are passing anonymous function using arrow syntax, to be executed whenever the fetchAll is done. This is done so that we can access the products array that the fetchAll function returns whenever it's done.
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    path: "/",
  });
};

exports.getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

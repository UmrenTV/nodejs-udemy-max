const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// router.get(/products/delete) - this is how you define it instead. Read more below.

router.get("/products/:productId", shopController.getProduct);

// router.get('/products/delete', shopController.getProduct); - it is important where you define the routes here. If you put /products/delete, it will not work because it's below /products/:productId and it will not work because the code is executed top to bottom, which means /product/delete belongs to the /product/:whatever, whatever being delete as well. So the delete will be handled by the /product/:productId route and be considered as dynamic parameter instead of actual route.

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;

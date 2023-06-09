const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      console.log(err);
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  // below we use static method, and the difference between save and fetchAll is that in order to access save, you have to create a new object
  // and in order to access fetchAll, you don't
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // we add static here because we need to access the products array but we don't want to create new object just so we can access the fetchAll, so we add static
  // to be able to call the fetchAll method without creating a new object
  // we are passing callback here, which is function that is passed as argument whenever fetchAll is called. This is done to prevent the error where the return statements don't return anything, since readFile is asynchronous, so whenever fetchAll is done, the return will never happen since readFile won't be done. This way instead of using return [] we use callback([]) so whenever readFile is done, the callback will be executed.
  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};

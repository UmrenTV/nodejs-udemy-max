const path = require("path");
const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/", (req, res) => {
  // __dirname is global variable that holds the absolute path on our PC to where the project is
  res.sendFile(path.join(rootDir, "views", "shop.html"));
  // we are using path.join here so this constructs the path in correct forrmat for both Windows and Linux. They have different rules for building paths
});

module.exports = router;

const express = require("express");
const path = require("path");

const rootDir = require("../utils/path");
const router = express.Router();

router.get("/users", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "users.html"));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

module.exports = router;

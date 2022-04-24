var express = require("express");
var router = express.Router();

// GET anrop till http://localhost:3000/categories/rea
router.get("/:urlSlug", function (req, res) {
  res.render("categories/details", {
    title: "Hello categories",
  });
});

module.exports = router;

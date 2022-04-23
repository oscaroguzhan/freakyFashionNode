var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/", function (req, res) {
  // get the product data from app.js (because we define in app.js so it is global and we can reach by using locals)
  const products = req.app.locals.products;
  // respond has a render method that define the view and send data such as title and products into view motor
  res.render("search", {
    title: "sök resultat",
    popularProducts: products,
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/", async function (req, res) {
  // get the product data from app.js (because we define in app.js so it is global and we can reach by using locals)
  const searchTerm = req.query.q;

  const db = req.app.locals.db;

  const sql = `
    SELECT id,
      name,
      description,
      brand,
      image_url,
      price,
      likes,
      url_slug
    FROM product
    WHERE name ILIKE '%' || $1 || '%'
  `;
  // '%' || $1 || '%' => %$1%
  //TODO: SÖK EFTER PRODUCT SOM HAR TITEL SOM INNEHÅLLER VÄRDET AV

  const result = await db.query(sql, [searchTerm]);
  // respond has a render method that define the view and send data such as title and products into view motor
  res.render("search", {
    title: "sök resultat",
    products: result.rows,
    productsCount: result.rowCount,
  });
});

module.exports = router;

var express = require("express");
var router = express.Router();

// GET anrop till http://localhost:3000/products/vit-tshirt (URI-segment)
router.get("/:urlSlug", async function (req, res) {
  // plocka ut sista delen av URI-segmentet, t.ex. om URI
  // ser ut så här "/products/vit-tshirt", så plockar vi ut sista
  // delen, dvs. "vit-tshirt"
  const urlSlug = req.params.urlSlug;

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
    WHERE url_slug = $1
  `;
  
  const result = await db.query(sql, [urlSlug]);

  const product = result.rows[0];
  res.render("products/details", {
    title: product.name,
    product,
  });
});

module.exports = router;

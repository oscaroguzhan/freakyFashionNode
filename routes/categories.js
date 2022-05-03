var express = require("express");
var router = express.Router();

// GET anrop till http://localhost:3000/categories/urlSlug
router.get("/:urlSlug", async function (req, res) {
  const urlSlug = req.params.urlSlug;

  // reference till db
  const db = req.app.locals.db;

  const sql = `
  SELECT c.name as category_name,
p.name as product_name,
p.brand as product_brand,
p.image_url as product_image_url,
p.price as product_price,
p.likes as product_likes,
p.url_slug as product_url_slug
FROM category c
INNER JOIN category_product cp
ON cp.category_id = c.id
INNER JOIN product p
ON p.id = cp.product_id
WHERE c.url_slug = $1;
  `;
  const result = await db.query(sql, [urlSlug]);

  const category = {
    name: result.rows[0].category_name,
    products: result.rows.map((x) => ({
      name: x.product_name,
      brand: x.product_brand,
      image_url: x.product_image_url,
      likes: x.product_likes,
      price: x.product_price,
      url_slug: x.product_url_slug,
    })),
  };
 
  res.render("categories/details", {
    title: category.name,
    category,
  });
});

module.exports = router;

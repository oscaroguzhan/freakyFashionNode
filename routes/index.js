var express = require("express");
var router = express.Router();
// index.js hanterar till anropet till startsidan
// GET http://localhost:3000/
router.get("/", async function (req, res) {
  // HARDKODAD -get the product data from app.js (because we define in app.js so it is global and we can reach by using locals)

  //########## hardkodad database innan vi skapade database i docker
  //const products = req.app.locals.products;
  // respond has a render method that define the view and send data such as title and products into view motor

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
  `;
  // får vi svar från database och sparar vi det in i result.rows
  const result = await db.query(sql);
  res.render("index", {
    title: "Freaky Fashion AB",
    popularProducts: result.rows,
  });
});

module.exports = router;

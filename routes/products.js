var express = require('express');
var router = express.Router();

// GET http://localhost:3000/products/vit-tshirt (URI-segment)
router.get('/:urlSlug', function(req, res) {
 
  // plocka ut sista delen av URI-segmentet, t.ex. om URI 
  // ser ut så här "/products/vit-tshirt", så plockar vi ut sista 
  // delen, dvs. "vit-tshirt"
  const urlSlug = req.params.urlSlug;

  const products = req.app.locals.products;

  const product = products.find(product => product.urlSlug == urlSlug);

  res.render('products/details', { 
    title: product.name,
    product
  });
});

module.exports = router;
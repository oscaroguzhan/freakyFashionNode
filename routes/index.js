var express = require('express');
var router = express.Router();

// GET http://localhost:3000/
router.get('/', function(req, res) {
 
  const products = req.app.locals.products;

  res.render('index', { 
    title: 'Freaky Fashion AB',
    popularProducts: products
  });
});

module.exports = router;

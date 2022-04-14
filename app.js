var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var app = express();

app.locals.products = [
  { 
    id: 1, 
    name: "Svart T-Shirt", 
    description: "Lorem ipsum dolor",
    imageUrl: "https://via.placeholder.com/280x420.png",
    brand: "Levis",
    price: 199,
    likes: 219,
    urlSlug: "svart-tshirt"
  },
  { 
    id: 2, 
    name: "Vit T-Shirt", 
    description: "Lorem ipsum dolor",
    imageUrl: "https://via.placeholder.com/280x420.png",
    brand: "Levis",
    price: 149,
    likes: 190,
    urlSlug: "vit-tshirt"
  },
  { 
    id: 3, 
    name: "Grön T-Shirt", 
    description: "Lorem ipsum dolor",
    imageUrl: "https://via.placeholder.com/280x420.png",
    brand: "Levis",
    price: 169,
    likes: 49,
    urlSlug: "gron-tshirt"
  }
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'shared/layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// GET | POST | DELETE | PUT /products
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

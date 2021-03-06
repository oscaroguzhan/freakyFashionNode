var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// definera layout ejs biblioteket
var expressLayouts = require("express-ejs-layouts");
// skapa en kopia av Pool objekt
const { Pool } = require("pg");
var indexRouter = require("./routes/index");
var productsRouter = require("./routes/products");
var searchRouter = require("./routes/search");
// TODO: SKAPA EN NY ROUTER SOM HANTERAR TILL NY ANROP TILL CATEGORIES
// DENNA KUNNA SKA HANTERA BÅDA
//GET localhost://3000/categories
//GET localhost://3000/categories/tshirts (där tshirts är en urlSlug)
var categoriesRouter = require("./routes/categories");
var app = express();

// inställningar för att kunna till database som ligger in i container i docker
// vi har mappat localhost 5432 porten in till en container i docker
app.locals.db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "secretpassword",
  database: "freakyfashion",
});

// view engine setup
// kommande ANROPET GÅR GENOM MIDDLEWARES tills får en hit och sen mappas vidare till
//ens router. vilken trigger funktionen i routern (get request) och sen response renderar
// vi och skickar vi till vy sidan där ejs tillsammans med statiska html display i webläsaren
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//setup expresslayout
app.use(expressLayouts);
app.set("layout", "shared/layout");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
//setup products router
// vi mappar /products till productsRouter
// GET | POST | DELETE | PUT /products
app.use("/products", productsRouter);

//setup search router
app.use("/search", searchRouter);

app.use("/categories", categoriesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

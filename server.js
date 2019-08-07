

// DEPENDDENCIES
require('dotenv').config()
var express = require("express");
// var logger = require("morgan");
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/headlines", { useNewUrlParser: true });

// INTIALIZE EXPRESS
var app = express();

// STATIC FOLDER
app.use(express.static("public"));

// app.use(logger("dev"));
//MIDDELWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// / --- HANDLEBARS ----/ /
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTES
var routes = require('./controllers/Newsdepot');
app.use(routes)



// LISTENER
app.listen(4000, function () {
    console.log("App running on port 4000!");
});
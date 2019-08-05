

// DEPENDDENCIES
require('dotenv').config()
var express = require("express");
// var mongojs = require("mongojs");
// Require axios and cheerio. makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");

// INTIALIZE EXPRESS
var app = express();

// mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });
var db = process.env.MONGO_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function (error) {
    if (error) {
        console.log('error');
    } else {
        console.log('connection successful')
    }
});
// MAIN ROUTE
app.get("/", function (req, res) {
    res.render("index");
});





// LISTENER
app.listen(3050, function () {
    console.log("App running on port 3050!");
});
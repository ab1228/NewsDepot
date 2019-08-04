

// Dependencies
require('dotenv').config()
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "";
var collections = [""];

// Hook mongojs configuration to the db variable
var db = process.env.mongo_db;
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.send("Hello world");
});



// Route 1
// =======
// This route will retrieve all of the data from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get("/all", function (req, res) {

    db.scrapeData.find({}, function (error, found) {
        // Log any errors if the server encounters one
        if (error) {
            console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
            res.json(found);
        }
    });
});
// Route 2
// =======
// server will scrape data from the site and save it to MongoDB.
app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com").then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $("article").each(function (i, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");
            results.push({
                title: title,
                link: link
            });
        });
        db.scrapedData.insert(results);
        res.json(results);
    });
});

app.listen(3050, function () {
    console.log("App running on port 3050!");
});
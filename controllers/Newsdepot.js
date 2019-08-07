
var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");


// REQUIRING MODELS
var db = require('../models');

// MAIN ROUTE
router.get("/", function (req, res) {
  res.render("index");
});



// A GET rROUTE FOR SCRAPING ECHOJS
router.get("/scrape", function (req, res) {
  axios.get("http://www.echojs.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    // GRAB EVERY ARTICLE WITH h2 TAG
    $("article h2").each(function (i, element) {
      // SAVE EMPTY RESULTS IN OBJECT
      var result = {};


      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");


      db.Article.create(result)
        .then(function (dbArticle) {

          console.log(dbArticle);
        })
        .catch(function (err) {

          return res.json(err);
        });
    });

    // SENDS MESSAGE TO CLIENT
    res.send("Scrape Complete");
  });
});

// ROUTE FOR ARTICLES TO DISPLAY IN ARTCILES.HANDLEBARS
router.get("/articles", function (req, res) {

  db.Article.find({})
    .then(function (dbArticle) {

      res.render('articles', { articles: dbArticle });
    })
    .catch(function (err) {

      res.json(err);
    });
});

// ROUTE FOR SAVED ARTCILES TO DISPLAY IN SAVED.HBS FROM DB
router.get('/saved', function (req, res) {
  db.Article.find({ saved: true })
    .populate('notes')
    .exec(function (err, articles) {
      res.render('saved', { articles: articles });
    });
});
// DROPPING COLLECTION
router.get('/clear', function (req, res) {
  db.Article.remove({})
    .then(function () {
      console.log('Removed');
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
// DELETING AN ARTICLE BY ID
router.post('/articles/delete/:id', function (req, res) {
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { saved: false, notes: [] }
  ).then(function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

// GRABBING ARTICLE BY ID AND POPULATE NOTE
router.get("/articles/:id", function (req, res) {

  db.Article.findOne({ _id: req.params.id })

    .populate("note")
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});
// CHANGING BOOLEAN TO TRUE
router.post('/articles/save/:id', function (req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }).exec(
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
      }
    }
  );
});


// SAVING NOTE
router.post("/articles/:id", function (req, res) {

  db.Note.create(req.body)
    .then(function (dbNote) {

      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

module.exports = router;
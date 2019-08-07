var mongoose = require("mongoose");

// SAVE REFERERNCE TO SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;


var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        default: false
    }
});

// MAKES MODEL FOR MONGOOSE
var Article = mongoose.model("Article", ArticleSchema);

// EXPORTS MODEL
module.exports = Article;
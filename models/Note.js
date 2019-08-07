var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var NoteSchema = new Schema({

    title: String,

    body: String
});

// THIS CREATES OUR MODEL
var Note = mongoose.model("Note", NoteSchema);

// EXPORT THE NOTE MODEL
module.exports = Note;
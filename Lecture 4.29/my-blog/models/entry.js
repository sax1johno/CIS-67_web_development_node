var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 2) Create the Schema
var EntrySchema = new Schema({
    "title": String,
    "slug": String,
    "date": Date,
    "text": String
});

// 3) Create a model from the schema
module.exports = mongoose.model("Entry", EntrySchema);
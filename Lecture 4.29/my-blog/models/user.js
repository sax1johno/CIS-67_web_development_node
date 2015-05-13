var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    "firstName": String,
    "lastName": String,
    "password": String,
    "email": String,
    "birthday": Date,
    "ccnumber": String
});

module.exports = mongoose.model("User", UserSchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var UserSchema = Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);
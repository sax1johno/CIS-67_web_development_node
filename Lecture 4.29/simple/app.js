var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    config = require('./config'),
    Schema = mongoose.Schema;
    
// 1) Connect to mongo database
mongoose.connect(config.database.url);

// 2) Define our schema
var UserSchema = new Schema({
    "firstName": String,
    "lastName": String
});

// 3) Create a data model from the schema
var UserModel = mongoose.model("User", UserSchema);

// From now on, we're using the data model

// Create an instance of the UserModel
// var User = new UserModel();

// Modify that object.
// User.firstName = "John";
// User.lastName = "O'Connor";

// // It now has a "save" method to save it to the database.
// User.save();

app.get('/', function(req, res) {
    UserModel.find(
        {}, // What properties does the result have?
        function(err, Users) { // executed after the find is complete
            if (err) {
                res.send(err);
            } else {
                res.render('index.ejs', {
                    Users: Users
                });
            }
        }
    );
});

app.get('/createUserForm', function(req, res) {
    res.render("createUser.ejs", {});
});

app.get('/createUser', function(req, res) {
    var firstName = req.param('firstName'),
        lastName = req.param('lastName');
        
        if (firstName && lastName) {
            var newUser = new UserModel();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.save(
                function(err) {
                    if (!err) {
                        res.redirect('/');
                    } else {
                        console.error("Wasn't able to save: ", err);
                        res.redirect('/');
                    }
                }
            );
        }
});
//console.log("User should be saved now");

app.listen(process.env.PORT);
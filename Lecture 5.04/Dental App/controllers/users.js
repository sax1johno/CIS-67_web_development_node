var express = require('express'),
    app = express(),
    User = require('./models/User'),
    Appointment = require('./models/Appointments');

// All application logic goes here.
app.get('/users', function(req, res) {
    // Retrieve for Users data model 
    Appointment.find({
        User: '5a384df324'
    }, function(err, appointments) {
       if (!err) {
           console.log("These are my appointments");
           console.log(appointments);
       } 
    });
    
    User.find(
        {
            firstName: "John",
            lastName: "O'Connor"
        }, function(err, users) {
        if (!err) {
            res.render('users/showAll.ejs', {
                users: users
            });
        } else {
            console.log(err);
            res.send(404);
        }
    });
});

app.post('/users', function(req, res) {
    // Update users
});

app.post('/users/create', function(req, res) {
   // Create new users 
});

app.post('/users/delete/:id', function(req, res) {
   // delete users 
});

module.exports = app;
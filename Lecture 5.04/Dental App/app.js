/**
 * Entry point into my application.
 * This is what listens to people sending requests.
 **/
 
 var express = require('express'),
    mongoose = require('mongoose'),
    appointmentController = require('./controllers/appointments'),
    userController = require('./controllers/users');
    
var app = express();


app.use(appointmentController);
app.use(userController);


app.listen(process.env.PORT);
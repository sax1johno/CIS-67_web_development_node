var express = require('express'),
    app = express(),
    User = require('./models/User'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    bodyparser = require('body-parser');
    
app.get('/login', function(req, res) {
    res.render('login.ejs', {});
});

app.post('/login', function(req, res) {
    var username = req.param('username'),
        password = req.param('password');
    
    User.findOne({username: username}, function(err, user) {
        if (err) {
            res.render('login.ejs', {
                message: "err encountered " + err
            });
        } else if (!user) {
            res.render('login.ejs', {
                message: "No user with that username"
            });
        } else {
            if (user.password == password) {
                req.session.user = user;
                res.redirect('/restricted');
            } else {
                res.render('login.ejs', {
                    message: "Password was not right"
                });
            }
        }
    });
});

app.get('/restricted', function(req, res, next) {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            next();
        }
    }, 
    function(req, res) {
        res.render('restricted.ejs', {});
    }
);

app.listen(process.env.PORT);